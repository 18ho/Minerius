import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './pages/Main';
import Register from './pages/Register';
import Registerss from './pages/Registerss';
import Registertest from './pages/Registertest';

const Stack = createStackNavigator();
const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Registertest">
                <Stack.Screen name="Main" component={Main} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="Registerss" component={Registerss} />
                <Stack.Screen name="Registertest" component={Registertest} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
