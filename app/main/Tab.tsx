import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { Main, Community, Volunteer, Setting } from './TabScreen.tsx';

const Tab = createBottomTabNavigator();

const TabNavigation = ({id}) => {
    const navigation = useNavigation();
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Main'){
                        iconName = 'home-outline';
                    } else if (route.name === 'Community'){
                        iconName = 'chatbubbles-outline';
                    } else if (route.name === 'Volunteer'){
                        iconName = 'heart-circle-outline';
                    } else if (route.name === 'Setting'){
                        iconName = 'cog-outline';
                    }

                    return <Icon name={iconName} size={size} color={color}/>;
                    },
                    contentContainerStyle:{
                        backgroundColor : '#ffffff',
                    },
                })}
            tabBarOptions={{
                activeTintColor: 'blue',
                inactiveTintColor: 'black',
            }}
        >
            <Tab.Screen name='Main' options={{headerTitleAlign: 'center', title: 'CliMaid', headerStyle: { backgroundColor: '#F2F8FF'}, headerTitleStyle:{ fontWeight: 'bold' }}}>
                {props => <Main {...props} id={id} />}
            </Tab.Screen>
            <Tab.Screen name='Community' component={Community} options={{headerTitleAlign: 'center', title: '커뮤니티', headerStyle: { backgroundColor: '#F2F8FF'}, headerTitleStyle:{ fontWeight: 'bold' }}} />
            <Tab.Screen name='Volunteer' component={Volunteer} options={{headerTitleAlign: 'center', title: '자원봉사', headerStyle: { backgroundColor: '#F2F8FF'}, headerTitleStyle:{ fontWeight: 'bold' }}} />
            <Tab.Screen name='Setting' options={{headerTitleAlign: 'center', title: '마이페이지', headerStyle: { backgroundColor: '#F2F8FF'}, headerTitleStyle:{ fontWeight: 'bold' }}}>
                {props => <Setting {...props} id={id} />}
            </Tab.Screen>
        </Tab.Navigator>
    );
};

export default TabNavigation;