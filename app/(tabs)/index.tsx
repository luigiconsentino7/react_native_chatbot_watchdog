import { createStackNavigator } from '@react-navigation/stack';
import ChatScreen from '../../screens/ChatScreen';

const Stack = createStackNavigator();

export default function HomeScreen() {
  return (
      <Stack.Navigator>
        <Stack.Screen 
          name="ChatBot" 
          component={ChatScreen} 
          options={{ title: 'WatchDog Chat' }} 
        />
      </Stack.Navigator>
  );
}