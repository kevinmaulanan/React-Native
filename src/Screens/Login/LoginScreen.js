import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { loginUser } from '../../Redux/Actions/Auth'

import { connect } from 'react-redux'

class LoginScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
    }

    handleSignIn() {
        const data = {
            username: this.state.username,
            password: this.state.password
        }
        console.log(data)

        try {
            const response = this.props.dispatch(loginUser(data))
        } catch (error) {
            console.log('error')
            console.log(error.response)

        }
    }

    render() {
        return (
            <View style={style.container}>
                <Text style={style.textTitle} >Welcome To Master KEVMAN</Text>

                <View style={style.wrapFrom}>

                    <View>
                        <Text> Username </Text>
                        <TextInput on placeholder='Username ' style={style.inputEmail}
                            onChangeText={username => this.setState({ username })}
                        ></TextInput>
                    </View>

                    <View>
                        <Text> Password </Text>
                        <TextInput secureTextEntry placeholder='Password Address' style={{ borderBottomColor: '#FAFAFA', borderBottomWidth: 1, height: 40, fontSize: 14, color: '#161F3D' }}
                            onChangeText={password => this.setState({ password })} value={this.state.password}
                        ></TextInput>
                    </View>
                </View>


                <TouchableOpacity style={{ marginHorizontal: 30, marginBottom: 10, backgroundColor: '#229504', borderRadius: 10, height: 50, alignItems: 'center', justifyContent: 'center' }}
                    onPress={() => this.handleSignIn()}
                >
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Sign In</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ alignSelf: 'center' }}
                    onPress={() => this.props.navigation.navigate("Register")}>
                    <Text style={{ fontSize: 13 }}> New to App? Sign in!</Text>
                </TouchableOpacity>

            </View>

        )
    }
}


const style = StyleSheet.create({
    container: {
        flex: 1
    },

    textTitle: {
        textAlign: "center", marginTop: 50, marginBottom: 20
    },
    wrapFrom: {
        marginHorizontal: 30, marginTop: 20, marginBottom: 30
    },
    inputEmail: { borderBottomColor: '#8A8F9E', borderBottomWidth: 1, height: 40, fontSize: 14, color: '#161F3D' }
})

mapDispatchToProps = (dispatch) => ({
    dispatch
})

export default connect(null, mapDispatchToProps)(LoginScreen)