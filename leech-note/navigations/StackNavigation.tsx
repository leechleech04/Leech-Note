import { createStackNavigator } from '@react-navigation/stack';
import List from '../components/List';
import Note from '../components/Note';

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="List"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="List" component={List} />
      <Stack.Screen name="Note" component={Note} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
