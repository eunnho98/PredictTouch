import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import Router from './src/nav/Router';
import { RecoilRoot } from 'recoil';

export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <RecoilRoot>
          <Router />
        </RecoilRoot>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
