import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image, Alert } from 'react-native'
import { forgotPassword } from '../../Redux/Actions/Auth'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome5'

class ForgotPasswordScreens extends Component {
    constructor(props) {
        super(props)
        this.state = {
            verify: null,
            username: '',
            newPassword: '',
            confirmPassword: '',
            message: null

        }
    }


    // handleMessage() {
    //     if (this.props.auth.success == false) {
    //         this.setState({ message: this.props.auth.message })
    //     } else {
    //         this.setState({ code: this.props.auth.code })
    //         Alert.alert(this.props.auth.message, 'Copy Code Ini=> ' + this.props.auth.code, [
    //             { text: 'OK', onPress: () => this.props.navigation.navigate("ForgotPassword") },
    //         ])
    //     }
    // }

    componentDidMount() {
        this.setState({ verify: this.props.auth.code })
    }

    handleCode(event) {
        this.setState({ verify: event.target.value })
    }



    handleMessage() {
        if (this.props.auth.success == false) {
            this.setState({ message: this.props.auth.message })
        } else {
            console.log('auth', this.props.auth.message)
            Alert.alert('Success', this.props.auth.message, [
                { text: 'OK', onPress: () => this.props.navigation.navigate("Login") },
            ])
        }
    }
    async handleForgotPassword() {
        const data = {
            verify: this.state.verify,
            username: this.state.username,
            newPassword: this.state.newPassword,
            confirmPassword: this.state.confirmPassword

        }
        console.log(data)
        try {
            const response = await this.props.forgotPassword(data)
            this.handleMessage()
        } catch (error) {
            console.log('front', error.response.data.message)
            this.setState({ message: error.response.data.message })

        }
    }

    render() {
        console.log('props auth', this.props.auth)
        return (
            <View style={{ flex: 1 }}>
                <ImageBackground source={{ uri: "http://10.10.10.13:3333/uploads/1584781094299.jpeg" }} style={{
                    width: "100%",
                    height: "100%"
                }}>

                    <View style={{ flex: 5, justifyContent: 'center' }}>
                        <View style={{ backgroundColor: 'white', justifyContent: 'center', marginHorizontal: 15, borderRadius: 20, height: 500 }}>

                            <View style={{ alignItems: 'center' }}>
                                <Image source={require('../../Asset/logo_Kevman.png')} style={{ height: 30, width: 99, }}></Image>
                            </View>

                            <View style={style.wrapFrom}>
                                {this.state.message &&
                                    <View>
                                        <Text style={{ backgroundColor: '#F8D7DA', height: 40, color: 'red', textAlignVertical: 'center', borderWidth: 0, borderRadius: 10, marginBottom: 10 }}> {this.state.message} </Text>
                                    </View>
                                }

                                <View style={{ marginTop: 15, position: 'relative' }}>
                                    <Icon name='code' color='#000' size={22} style={{ position: 'absolute', left: 10, top: 13 }} />
                                    <TextInput on placeholder='Username ' style={style.inputEmail}
                                        underlineColorAndroid="transparent"
                                        value={this.props.auth.code}
                                        onChangeText={(event) => this.handleCode(event)}
                                    />
                                </View>

                                <View style={{ marginTop: 15, position: 'relative' }}>
                                    <Icon name='user' color='#000' size={22} style={{ position: 'absolute', left: 10, top: 13 }} />
                                    <TextInput on placeholder='Username..... ' style={style.inputEmail}
                                        underlineColorAndroid="transparent" onChangeText={username => this.setState({ username })}
                                    />
                                </View>

                                <View style={{ marginTop: 15, position: 'relative' }}>
                                    <Icon name='key' color='#000' size={22} style={{ position: 'absolute', left: 10, top: 13 }} />
                                    <TextInput on placeholder='New Password..... ' style={style.inputEmail}
                                        underlineColorAndroid="transparent" onChangeText={newPassword => this.setState({ newPassword })}
                                    />
                                </View>

                                <View style={{ marginTop: 15, position: 'relative' }}>
                                    <Icon name='key' color='#000' size={22} style={{ position: 'absolute', left: 10, top: 13 }} />
                                    <TextInput on placeholder='Confirm Password..... ' style={style.inputEmail}
                                        underlineColorAndroid="transparent" onChangeText={confirmPassword => this.setState({ confirmPassword })}
                                    />
                                </View>
                            </View>



                            <TouchableOpacity style={{ marginHorizontal: 30, marginBottom: 10, backgroundColor: '#229504', borderRadius: 10, height: 50, alignItems: 'center', justifyContent: 'center' }}
                                onPress={() => this.handleForgotPassword()}
                            >
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>Forgot Password</Text>
                            </TouchableOpacity>


                            <TouchableOpacity style={{ alignSelf: 'center' }}
                                onPress={() => this.props.navigation.navigate("Login")}>
                                <Text style={{ fontSize: 13, color: 'blue' }}>Login</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ alignSelf: 'center' }}
                                onPress={() => this.props.navigation.navigate("Register")}>
                                <Text style={{ fontSize: 13, color: 'blue' }}> Create Account</Text>
                            </TouchableOpacity>



                        </View>
                    </View>
                </ImageBackground>

            </View >


        )
    }
}


const style = StyleSheet.create({
    container: {
        flex: 1
    },

    textTitle: {
        textAlign: "center", marginTop: 10, marginBottom: 20
    },
    wrapFrom: {
        marginHorizontal: 30, marginTop: 20, marginBottom: 30,
    },
    inputEmail: { borderBottomColor: '#8A8F9E', borderBottomWidth: 1, height: 50, fontSize: 15, color: '#161F3D', borderWidth: 1, borderRadius: 10, paddingLeft: 45, paddingRight: 20 }
})


const mapStateToProps = state => ({
    auth: state.auth
})

const mapDispatchToProps = { forgotPassword }

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordScreens)