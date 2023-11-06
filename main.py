from fastapi import FastAPI, Request, WebSocket, WebSocketDisconnect
from starlette.middleware.cors import CORSMiddleware
from typing import List
from datetime import datetime
import json
import random

app = FastAPI()

origins = [ "*" ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ConnectionManager:
  def __init__(self):
    self.active_connections: List[WebSocket] = []

  async def connect(self, websocket: WebSocket): # 웹소켓 연결 대기
    await websocket.accept()
    self.active_connections.append(websocket)

  def disconnect(self, websocket:WebSocket): # 특정 웹소켓 해제
    self.active_connections.remove(websocket)

  async def send_message(self, message:str, websocket: WebSocket): # 특정 웹소켓에 메시지 전달
    await websocket.send_text(message)

manager = ConnectionManager()

@app.get('/')
async def main():
  return 'Hello World!'

@app.post('/pred')
async def pred(data: Request):
  data = await data.json()
  print(data)
  return 'good'

@app.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: int):
  await manager.connect(websocket)
  print(websocket)
  now = datetime.now()
  cur_time = now.strftime("%H:%M")
  try:
    while True:
      data = await websocket.receive_text()
      if data == 'randomNumber':
        random_integer = random.randint(0, 2)
        print(random_integer)
        message = {"rannum": random_integer}
        await manager.send_message(json.dumps(message), websocket)
      else:
        message = {"time": cur_time, "clientId": client_id, "message": data}
        print(data)
        await manager.send_message(json.dumps(message), websocket)

  except WebSocketDisconnect:
    await manager.send_message(json.dumps(message), websocket)
    message = {"time": cur_time, "clientId": client_id, "message": "Offline"}
    manager.disconnect(websocket)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port = 8000)  