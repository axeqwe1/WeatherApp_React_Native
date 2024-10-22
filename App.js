import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen'
import LogScreen from './screens/LogScreen';
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Log" component={LogScreen} options={{
        headerStyle:{backgroundColor:'#006699'},
        headerTitleStyle: {
          color: 'white'
        }
      }}/>
      </Stack.Navigator>
    </NavigationContainer>

  );
}

export default App;