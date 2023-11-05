import React, { useEffect, useRef, useState } from 'react';
import {
  Text,
  Center,
  Heading,
  VStack,
  Box,
  Button,
  Input,
  useToast,
} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { Keyboard, TouchableWithoutFeedback, Animated } from 'react-native';
import { useRecoilState } from 'recoil';
import { id } from '../atom/atom';
import axios from 'axios';

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

export default function Main() {
  const navigation = useNavigation();
  const [userId, setUserId] = useRecoilState(id);
  const [password, setPassword] = useState('');
  const toast = useToast();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Center>
        <FadeInView>
          <VStack space={12} alignItems="center">
            <Heading size="xl" textAlign="center">
              Welcome to KHUPang
            </Heading>
            <Input
              textAlign="center"
              variant="filled"
              type="text"
              placeholder="아이디"
              w="70%"
              h="48px"
              bgColor="gray.200"
              color="black"
              value={userId}
              onChangeText={(newId) => {
                setUserId(newId);
              }}
            />
            <Input
              textAlign="center"
              variant="filled"
              type="password"
              placeholder="비밀번호"
              w="70%"
              h="48px"
              bgColor="gray.200"
              color="black"
              value={password}
              onChangeText={(newpw) => {
                setPassword(newpw);
              }}
            />

            <Button
              colorScheme="pink"
              w="40%"
              onPress={async () => {
                if (userId === '' || password === '') {
                  toast.show({
                    render: () => {
                      return (
                        <Box bg="red.400" px="3" py="2" rounded="sm">
                          <Text color="gray.100" fontWeight="bold">
                            모든 정보를 입력해주세요!
                          </Text>
                        </Box>
                      );
                    },
                  });
                } else {
                  // DB에 저장
                  //set(ref(firebase_db, `${testType}/${age}/`), {
                  //  hand,
                  //  size,
                  //  age,
                  //});

                  navigation.navigate('Test');
                }
              }}
            >
              입장
            </Button>
            <Button
              onPress={() => {
                const result = fetch('http://127.0.0.1:8000', {
                  method: 'GET',
                }).then((res) => console.log(res));
              }}
            >
              ss
            </Button>
          </VStack>
        </FadeInView>
      </Center>
    </TouchableWithoutFeedback>
  );
}
