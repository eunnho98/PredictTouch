import React, { useRef, useEffect, useState } from 'react';
import {
  Center,
  Heading,
  VStack,
  Button,
  Box,
  Text,
  useDisclose,
  Stagger,
  IconButton,
  HStack,
} from 'native-base';
import { Animated } from 'react-native';
import {
  MaterialCommunityIcons,
  Ionicons,
  Entypo,
  MaterialIcons,
} from '@expo/vector-icons';
import * as Location from 'expo-location';
import { Gyroscope, Accelerometer } from 'expo-sensors';

const FadeInView = ({ children }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000, // 애니메이션 지속 시간 (1초)
      useNativeDriver: true, // 네이티브 드라이버 사용
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
      }}
    >
      {children}
    </Animated.View>
  );
};

export default function Test() {
  const { isOpen, onToggle } = useDisclose();
  const [subscription, setSubscription] = useState(null);
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

  const _subscribe = () => {
    setSubscription(
      Gyroscope.addListener((gyroscopeData) => {
        setGData(gyroscopeData);
      }),
      Accelerometer.addListener(setAData)
    );
    Accelerometer.setUpdateInterval(700);
    Gyroscope.setUpdateInterval(700);
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  /*
  useEffect(() => {
    _subscribe();
    Gyroscope.setUpdateInterval(16);
    Accelerometer.setUpdateInterval(16);
    return () => _unsubscribe();
  }, []);
*/
  return (
    <Center>
      <FadeInView>
        <HStack mt="16px">
          <Stagger
            visible={isOpen}
            initial={{
              opacity: 0,
              scale: 0,
              translateY: 34,
            }}
            animate={{
              translateY: 0,
              scale: 1,
              opacity: 1,
              transition: {
                type: 'spring',
                mass: 0.8,
                stagger: {
                  offset: 30,
                  reverse: true,
                },
              },
            }}
            exit={{
              translateY: 34,
              scale: 0.5,
              opacity: 0,
              transition: {
                duration: 100,
                stagger: {
                  offset: 30,
                  reverse: true,
                },
              },
            }}
          >
            <IconButton
              variant="solid"
              bg="red.500"
              colorScheme="red"
              borderRadius="full"
              mr="2"
              icon={
                <MaterialCommunityIcons
                  name="food-apple-outline"
                  size={24}
                  color="white"
                />
              }
            />
            <IconButton
              variant="solid"
              bg="purple.500"
              colorScheme="purple"
              borderRadius="full"
              mr="2"
              icon={<MaterialIcons name="pets" size={24} color="white" />}
            />
            <IconButton
              variant="solid"
              bg="blue.500"
              colorScheme="blue"
              borderRadius="full"
              mr="2"
              icon={
                <Ionicons name="ios-shirt-outline" size={24} color="white" />
              }
            />
            <IconButton
              variant="solid"
              bg="green.500"
              colorScheme="green"
              borderRadius="full"
              mr="2"
              icon={
                <MaterialIcons name="sports-baseball" size={24} color="white" />
              }
            />
            <IconButton
              variant="solid"
              bg="amber.500"
              colorScheme="amber"
              borderRadius="full"
              mr="2"
              icon={<Ionicons name="book-outline" size={24} color="white" />}
            />
            <IconButton
              variant="solid"
              bg="pink.500"
              colorScheme="pink"
              borderRadius="full"
              mr="2"
              icon={
                <MaterialCommunityIcons
                  name="lipstick"
                  size={24}
                  color="white"
                />
              }
            />
          </Stagger>
          <IconButton
            variant="solid"
            bg="cyan.400"
            colorScheme="cyan"
            borderRadius="full"
            onPress={onToggle}
            icon={
              <Entypo name="dots-three-horizontal" size={24} color="white" />
            }
          />
        </HStack>

        <VStack space={24} mt="32px">
          <HStack space={6} justifyContent="center" alignItems="center">
            <Button w="90px" h="100px" />
            <Button w="90px" h="100px" />
            <Button w="90px" h="100px" />
          </HStack>
          <HStack space={6} justifyContent="center" alignItems="center">
            <Button w="90px" h="100px" />
            <Button w="90px" h="100px" />
            <Button w="90px" h="100px" />
          </HStack>
          <HStack space={6} justifyContent="center" alignItems="center">
            <Button w="90px" h="100px" />
            <Button w="90px" h="100px" />
            <Button w="90px" h="100px" />
          </HStack>
        </VStack>
        <Text>{subscription === null ? 'null' : a_x}</Text>
        <Button
          onPress={subscription === null ? _subscribe : _unsubscribe}
          mt="32px"
          w="50%"
          h="52px"
          mx="auto"
          textAlign="center"
        >
          {subscription ? 'On' : 'Off'}
        </Button>
      </FadeInView>
    </Center>
  );
}
