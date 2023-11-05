import React, { useState, useEffect } from 'react';
import { HStack, VStack, Button } from 'native-base';
import { useSetRecoilState } from 'recoil';
import { count } from '../atom/atom';
import { Gyroscope, Accelerometer } from 'expo-sensors';

const BoxArr = Array.from({ length: 3 }, () =>
  Array.from({ length: 3 }, () => ({
    bgColor: 'gray.300',
    isRed: false,
  }))
);

export default function Board() {
  const [{ x: g_x, y: g_y, z: g_z }, setGData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  const [{ x: a_x, y: a_y, z: a_z }, setAData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  const [subscription, setSubscription] = useState(null);
  const setNum = useSetRecoilState(count);
  const [boxes, setBoxes] = useState(BoxArr);
  const [buttonOrder, setButtonOrder] = useState([]);
  const [iteration, setIteration] = useState(0);
  const maxIterations = 50;

  // 한 번의 순회 동안 데이터를 모을 상태
  const [accumulatedData, setAccumulatedData] = useState([]);

  // 파일 저장 경로

  const _subscribe = () => {
    setSubscription(
      Gyroscope.addListener((gyroscopeData) => {
        setGData(gyroscopeData);
      }),
      Accelerometer.addListener(setAData)
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  useEffect(() => {
    let intervalId;
    async function fetchData() {
      intervalId = setInterval(async () => {
        const newBoxes = [...boxes];
        const nextButtonIndex = buttonOrder.pop();

        if (nextButtonIndex !== undefined) {
          newBoxes[Math.floor(nextButtonIndex / 3)][
            nextButtonIndex % 3
          ].bgColor = 'red.400';
          newBoxes[Math.floor(nextButtonIndex / 3)][
            nextButtonIndex % 3
          ].isRed = true;
          setBoxes(newBoxes);

          setTimeout(() => {
            newBoxes[Math.floor(nextButtonIndex / 3)][
              nextButtonIndex % 3
            ].bgColor = 'gray.300';
            newBoxes[Math.floor(nextButtonIndex / 3)][
              nextButtonIndex % 3
            ].isRed = false;
            setBoxes(newBoxes);
          }, 600);
        } else {
          console.log('순회한번끝');
          if (iteration <= maxIterations - 1) {
            console.log('파악');
            setIteration((prevIteration) => prevIteration + 1);
            const allButtonIndices = Array.from({ length: 9 }, (_, i) => i);
            const shuffledButtonIndices = shuffleArray(allButtonIndices);
            setButtonOrder(shuffledButtonIndices);
            //await set(ref(firebase_db, `${un}/${iteration}`), accumulatedData);
            setAccumulatedData([]);
          } else {
            clearInterval(intervalId);

            //// 순회가 끝났을 때 데이터를 JSON 파일에 저장
            //saveDataToFile(accumulatedData);

            //// accumulatedData 초기화
            //setAccumulatedData([]);

            //setNum((prev) => prev + 1);
          }
        }
      }, 1200);
    }

    fetchData();
    return () => clearInterval(intervalId);
  }, [boxes, buttonOrder, iteration, maxIterations, setNum, accumulatedData]);

  useEffect(() => {
    const allButtonIndices = Array.from({ length: 9 }, (_, i) => i);
    const shuffledButtonIndices = shuffleArray(allButtonIndices);
    setButtonOrder(shuffledButtonIndices);
  }, []);

  function shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  }

  // 데이터를 JSON 파일에 저장

  return (
    <VStack
      space={32}
      m="72px"
      onTouchStart={async (e) => {
        e.persist();
        setNum((prev) => prev + 1);

        const { row, col } = findRedBoxPosition(boxes);
        const dataToStore = {
          x좌표: e.nativeEvent.pageX,
          y좌표: e.nativeEvent.pageY,
          acc_x: a_x,
          acc_y: a_y,
          acc_z: a_z,
          gyro_x: g_x,
          gyro_y: g_y,
          gyro_z: g_z,
          redBoxRow: row,
          redBoxCol: col,
        };
        console.log(dataToStore);
        // 한 번의 순회 동안 데이터를 모음
        setAccumulatedData((prevData) => [...prevData, dataToStore]);
      }}
    >
      {boxes.map((hitem, idx) => (
        <HStack
          space={6}
          key={`row-${idx}`}
          justifyContent="center"
          alignItems="center"
        >
          {hitem.map((box, jdx) => (
            <Button
              bgColor={box.bgColor}
              //w={box.bgColor === 'red.400' ? '124px' : '72px'}
              //h={box.bgColor === 'red.400' ? '112px' : '84px'}
              //w={jdx === 2 ? '124px' : '72px'}
              //h={jdx === 2 ? '112px' : '84px'}
              w="72px"
              h="84px"
              key={`${idx}-${jdx}`}
            />
          ))}
        </HStack>
      ))}
    </VStack>
  );
}

function findRedBoxPosition(boxes) {
  for (let i = 0; i < boxes.length; i++) {
    for (let j = 0; j < boxes[i].length; j++) {
      if (boxes[i][j].isRed) {
        return { row: i, col: j };
      }
    }
  }
  return { row: -1, col: -1 };
}
