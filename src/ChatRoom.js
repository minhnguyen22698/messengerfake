import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {
    ImageBackground,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    Image,
    StyleSheet
} from 'react-native'
import background from './assets/bg.jpg'
import AsyncStorage from '@react-native-community/async-storage'
import Firebase from 'firebase'
import { ChatLineHolder } from './chatLineHolder';
import Icon from 'react-native-vector-icons/Ionicons'
import sendicon from './assets/iconsend.png'

export default class ChatRoom extends Component {
    constructor(props) {
        super(props)
        this.state = {
            chatData: [],
            chatInputContent: '',
            username: '',
        }
    }

    // static navigationOptions = {
    //     title: 'Phòng !noChat',
    // };

    async componentDidMount() {
        let username = await AsyncStorage.getItem('name');
        console.log("Ten user: " + username)
        console.log("This props: " + JSON.stringify(this.state.username))
        this.setState({
            username
        })
        Firebase.database().ref('/chatRoom').on("value", snapshot => {
            if (snapshot.val() !== undefined && snapshot.val() !== null) {
                this.setState({
                    chatData: Object.values(snapshot.val())
                });
            }

        });
    }

    _sendMessage = () => {
        var date = new Date()
        var today = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + "-" + date.getMinutes() + ":" + date.getHours()
        console.log(this.state.username + '-' + this.state.chatInputContent)
        Firebase.database().ref('/chatRoom').push({
            userName: this.state.username,
            chatContent: this.state.chatInputContent,
            sendTime: today,
        });
        this.setState({
            chatInputContent: ''
        });
    }
    _onChangeChatInput = (text) => {
        this.setState({
            chatInputContent: text
        });
    }
    _renderChatLine = (item) => {

        if (item.userName === this.state.username) {
            return (
                <View style={{ alignItems: 'flex-end',marginBottom:5 }} >
                    <ChatLineHolder sender={item.userName} chatContent={item.chatContent} sendTime={item.sendTime} />
                    <Text style={s.chatLineYour} >{item.sendTime}</Text>
                </View>
            );
        }
        return (
            <View style={{ alignItems: 'flex-start',marginBottom:5 }}>
                <ChatLineHolder sender={item.userName} chatContent={item.chatContent} />
                <Text style={s.chatLineGuest} >{item.sendTime}</Text>
            </View>
        );

    };
    render() {

        return (
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end' }}>
                <ImageBackground imageStyle={{ opacity: 0.4 }} source={background}
                    style={{ flex: 9 / 10, backgroundColor: '#A5A5A5', flexDirection: 'column', justifyContent: 'flex-end' }} >
                    <FlatList
                        ref="flatList"
                        onContentSizeChange={() => this.refs.flatList.scrollToEnd()}
                        data={this.state.chatData}
                        renderItem={({ item }, index) => this._renderChatLine(item)} /
                    >

                </ImageBackground>
                <View style={{ flex: 1 / 10 }} >
                    <View style={{
                        flexDirection: 'row', backgroundColor: '#FFF',
                        width: '100%', height: '100%', justifyContent: 'space-around', alignItems: 'center', marginLeft: 2
                    }}  >
                        <View style={{ flex: 8 / 10 }} >
                            <TextInput placeholder="Nhập nội dung chat" value={this.state.chatInputContent}
                                onChangeText={(text) => this._onChangeChatInput(text)} style={{ height: 100, fontSize: 18 }} />
                        </View>
                        <View style={{ flex: 2 / 10 }} >
                            <TouchableOpacity onPress={() => this._sendMessage()} >
                                <Image source={sendicon} style={{ marginLeft: 20 }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
            // <View>
            //     <Text>ChatRoom</Text>
            // </View>
        )
    }
}
const s = StyleSheet.create({
    chatLineYour: {
        marginRight: 10
    },
    chatLineGuest: {
        marginLeft: 5
    }
})
