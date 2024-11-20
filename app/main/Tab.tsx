import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { Main, Community, Volunteer, Setting } from './TabScreen.tsx';

const Tab = createBottomTabNavigator();

const TabNavigation = ({id}) => {
    const navigation = useNavigation();
    return (
        <Tab.Navigator>
            <Tab.Screen name='Main' component={Main} />
            <Tab.Screen name='Community' component={Community} />
            <Tab.Screen name='Volunteer' component={Volunteer} />
            <Tab.Screen name='Setting'>
                {props => <Setting {...props} id={id} />}
            </Tab.Screen>
        </Tab.Navigator>
    );
};

export default TabNavigation;