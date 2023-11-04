from fastapi import FastAPI, Request
from starlette.middleware.cors import CORSMiddleware
import logging

app = FastAPI()

origins = [ "*" ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware

@app.get('/')
async def main():
  return 'Hello World!'

@app.post('/pred')
async def pred(data: Request):
  data = await data.json()
  print(data)
  return 'good'