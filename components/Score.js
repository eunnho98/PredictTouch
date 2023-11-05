import { HStack, Text, VStack } from 'native-base';
import { useRecoilValue } from 'recoil';
import { count } from '../atom/atom';

export default function Score() {
  const num = useRecoilValue(count);

  return (
    <HStack space={6} justifyContent="center" mt="6px">
      <VStack bgColor="green.400" w="40%" h="48px" justifyContent="center">
        <Text color="white" fontWeight="bold" fontSize="xl" textAlign="center">
          {num}
        </Text>
      </VStack>
    </HStack>
  );
}
