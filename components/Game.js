import { Box, Center, HStack, Text } from 'native-base';
import { useState, useEffect } from 'react';
import Board from './Board';
import Score from './Score';

export default function Game() {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => {
        setCount(count - 1);
      }, 1000);

      // 컴포넌트 언마운트 시 타이머 정리
      return () => clearTimeout(timer);
    }
  }, [count]);

  return (
    <Box _dark={{ bg: 'blueGray.900' }} _light={{ bg: 'blueGray.50' }} px={2}>
      {count ? (
        <Text fontSize="9xl" fontWeight="bold" textAlign="center" mt="84px">
          {count}
        </Text>
      ) : (
        <>
          <Score />
          <Board />
        </>
      )}
    </Box>
  );
}
