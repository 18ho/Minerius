import React from 'react';
import { View, Button } from 'react-native';
import notifee from '@notifee/react-native';

export const Notifee = () => {
    async function onDisplayNotification(){
        await notifee.requestPermission()

        const channelId = await notifee.createChannel({
            id: 'default',
            name: 'Default channel',
        });

        await notifee.displayNotification({
            title: 'Notification Title',
            body: 'Main body content of the notification',
            android:{
                channelId,
                pressAction:{
                    id: 'default',
                },
            },
        });
    }

    return (
        <View>
            <Button title="Display Notification" onPress={() => onDisplayNotification()} />
        </View>
    );
}

export default Notifee;