import 'react-native-gesture-handler';
import React, { Component } from 'react'
import firebase from './firebaseconfig'
import AsyncStorage from '@react-native-community/async-storage'
import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity } from 'react-native'
const { width: WIDTH } = Dimensions.get('window')

class JoinRoom extends Component {
    // static navigationOptions = {
    //     title: 'Chào các con giời',
    // };
    constructor(props) {
        super(props)
        this.toJoinRoom = this.toJoinRoom.bind(this)
        this.state = {
            name: '',
        }
    }
    async componentDidMount() {
        const username = await AsyncStorage.getItem('name');
        if (username != null) {
            this.props.navigation.navigate('Chat')
        }
        console.log(username)
    }
    handleInputName = (e) => {
        this.setState({
            name: e
        })
        console.log(e)
    }
    async toJoinRoom() {
        await firebase
            .auth()
            .signInAnonymously()
            .then((user) => {
                console.log("Set name: " + this.state.name)
                AsyncStorage.setItem('name', this.state.name);
                this.props.navigation.navigate('Chat', {
                    name: this.state.name
                })
                console.log(this.state.name)
            })
            .catch((err) => alert(err));
        this.props.navigation.navigate('Chat')
        console.log('Clicked')
    }
    onClikTest = (e) => {
        console.log(this.state.name)
    }
    render() {
        return (
            <View style={styles.contanier}>
                <Text>
                    Nhập tên cúng cơm vào :
                </Text>
                <TextInput placeholder="đây nè"
                    style={{
                        borderColor: '#A5A5A5',
                        borderWidth: 0.5, padding: 8, width: '100%',
                        marginTop: 15, marginBottom: 15,
                    }}
                    onChangeText={this.handleInputName} />
                <TouchableOpacity style={styles.btn} onPress={this.toJoinRoom}>
                    <Text style={{ fontWeight: 'bold' }}>
                        Triển liền
                    </Text>
                </TouchableOpacity>
            </View>
            // <View>
            //     <Text>JoinRoom</Text>
            // </View>
        )
    }
}
const styles = StyleSheet.create({
    contanier: {
        flex: 1,
        justifyContent: 'center',
    },
    btn: {
        width: WIDTH - 55,
        backgroundColor: '#ff0000',
        height: 100
    }
})

export default JoinRoom