import React, { useState, useEffect } from 'react';
import { Gyroscope, Accelerometer } from 'expo-sensors';
import { Button, Center, HStack, Heading, Text, VStack } from 'native-base';
import { ref, set } from 'firebase/database';
import { firebase_db } from '../firebaseConfig';

export default function Temp() {
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
  const [count, setCount] = useState(0);
  const [buttonColor, setButtonColor] = useState('red.400');
  const [idxCount, setIdxCount] = useState(1);
  const [data, setdata] = useState([]);

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

  const toggleButtonColor = () => {
    setButtonColor((prev) => (prev === 'red.400' ? 'green.400' : 'red.400'));
  };

  useEffect(() => {
    const intervalId = setInterval(toggleButtonColor, 500);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Center
      px={4}
      flex={1}
      onTouchStart={(e) => {
        setCount((prev) => prev + 1);
        e.persist();
        console.log('x', e.nativeEvent.pageX);
        console.log('y', e.nativeEvent.pageY);
        console.log('gyro_x', g_x);
        console.log('gyro_y', g_y);
        console.log('gyro_z', g_z);
        console.log('acc_x', a_x);
        console.log('acc_y', a_y);
        console.log('acc_z', a_z);
        console.log('mul_x', (Math.abs(g_x) * a_x).toFixed(10));
        console.log('mul_y', (Math.abs(g_y) * a_y).toFixed(10));
        console.log('mul_z', (Math.abs(g_z) * a_z).toFixed(10));
        console.log('------------------------------------------------');
        d = {
          x: e.nativeEvent.pageX,
          y: e.nativeEvent.pageY,
          gyro_x: g_x,
          gyro_y: g_y,
          gyro_z: g_z,
          acc_x: a_x,
          acc_y: a_y,
          acc_z: a_z,
          mul_x: (Math.abs(g_x) * a_x).toFixed(10),
          mul_y: (Math.abs(g_y) * a_y).toFixed(10),
          mul_z: (Math.abs(g_z) * a_z).toFixed(10),
        };

        setdata((prev) => [...prev, d]);
      }}
    >
      <Text>{count}</Text>

      <Center px={4} flex={1}>
        <VStack space={24}>
          <HStack space={20} px={4}>
            <Button w="44px" h="44px" bgColor={buttonColor}>
              1
            </Button>
            <Button w="44px" h="44px">
              2
            </Button>
            <Button w="44px" h="44px">
              3
            </Button>
          </HStack>
          <HStack space={20} px={4}>
            <Button w="44px" h="44px">
              4
            </Button>
            <Button w="44px" h="44px">
              5
            </Button>
            <Button w="44px" h="44px">
              6
            </Button>
          </HStack>
          <HStack space={20} px={4}>
            <Button w="44px" h="44px">
              7
            </Button>
            <Button w="44px" h="44px">
              8
            </Button>
            <Button w="44px" h="44px">
              9
            </Button>
          </HStack>
        </VStack>
      </Center>
      <HStack space={5}>
        <Button
          onTouchStart={async () => {
            await set(ref(firebase_db, `${idxCount}/`), data);
            setdata([]);
            setIdxCount((prev) => prev + 1);
          }}
        >
          50번 터치하면 클릭
        </Button>
      </HStack>
    </Center>
  );
}
