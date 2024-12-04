import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, Alert, PermissionsAndroid, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigation from './Tab.tsx';
import Login from './login.jsx';
import Register from './register.jsx';
import PostView from './PostView.jsx';
import PostWrite from './PostWrite.jsx';

const Stack = createStackNavigator();

const Capstone = () => {
    const [id, setSessionId] = useState(null);
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Main">
                <Stack.Screen name="Main" options={{ headerShown: false }}>
                    {props => <TabNavigation {...props} id={id} />}
                </Stack.Screen>
                <Stack.Screen name="Register" component={Register} options={{headerTitleAlign: 'center', title: '회원가입', headerStyle: { backgroundColor: '#F2F8FF'}, headerTitleStyle:{ fontWeight: 'bold' }}}/>
                <Stack.Screen name="Login">
                    {props => <Login {...props} setSessionId={setSessionId} options={{headerTitleAlign: 'center', title: '로그인', headerStyle: { backgroundColor: '#F2F8FF'}, headerTitleStyle:{ fontWeight: 'bold' }}}/>}
                </Stack.Screen>
                <Stack.Screen name="PostWrite" component={PostWrite} options={{headerTitleAlign: 'center', title: '글 작성', headerStyle: { backgroundColor: '#F2F8FF'}, headerTitleStyle:{ fontWeight: 'bold' }}}/>
                <Stack.Screen name="PostView" component={PostView} options={{headerTitleAlign: 'center', title: '게시판', headerStyle: { backgroundColor: '#F2F8FF'}, headerTitleStyle:{ fontWeight: 'bold' }}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Capstone;
