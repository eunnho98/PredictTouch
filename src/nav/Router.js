import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from '../../components/Main';
import Test from '../../components/Test';

const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name=" " component={Main} />
      <Stack.Screen name="Test" component={Test} />
    </Stack.Navigator>
  );
};

export default Router;
