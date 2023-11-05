import { HStack, Text } from 'native-base';
import React from 'react';

export default function UnorderList(props) {
  return (
    <HStack>
      <Text>{props.icon}</Text>
      <Text>{props.children}</Text>
    </HStack>
  );
}
