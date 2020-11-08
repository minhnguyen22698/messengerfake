import 'react-native-gesture-handler';
import React, { Component } from 'react'
import { View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import JoinRoom from './JoinScreen'
import ChatRoom from './ChatRoom'

const Stack = createStackNavigator();

class Nav extends Component {
    constructor() {
        super()
    }
    render() {
        return (
            <Stack.Navigator mode="modal" headerMode='screen'>
                <Stack.Screen name="Join"
                   options={{
                       headerShown: false
                   }}
                    component={JoinRoom} />
                <Stack.Screen name="Chat"
                options={{
                    headerStyle: { 
                        backgroundColor: '#20ACF9'
                    }
                }}
                 component={ChatRoom}/>
            </Stack.Navigator>
        )
    }
}
export default Nav