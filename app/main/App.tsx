import React, { useState } from 'react';
import { Text, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigation from './Tab.tsx';
import Login from './login.jsx';
import Register from './register.jsx';

const Stack = createStackNavigator();

const Capstone = () => {
    const [id, setSessionId] = useState("1");
    return (
        <>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Main">
                    <Stack.Screen name="Main" options={{ headerShown: false}}>
                        {props => <TabNavigation {...props} id={id} />}
                    </Stack.Screen>
                    <Stack.Screen name="Register" component={Register} />
                    <Stack.Screen name="Login">
                        {props => <Login {...props} setSessionId={setSessionId} />}
                    </Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
        </>
    )
}

export default Capstone;