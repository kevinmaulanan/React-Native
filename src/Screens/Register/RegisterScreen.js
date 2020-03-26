import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image, Alert } from 'react-native'
import { registerUser } from '../../Redux/Actions/Auth'
import { getRestaurant } from '../../Redux/Actions/Restaurant'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome5'

class LoginScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            username: '',
            password: '',
            email: '',
            images: [],
            message: null,
        }
    }

    componentDidMount() {
        this.props.getRestaurant()
    }


    async handleRegister() {
        const data = {
            name: this.state.name,
            username: this.state.username,
            password: this.state.password,
            email: this.state.email
        }
        try {
            const response = await this.props.registerUser(data)
            this.handleMessage()
        } catch (error) {
            this.setState({ message: error.response.data.message })

        }
    }

    handleMessage() {
        if (this.props.auth.success == false) {
            this.setState({ message: this.props.auth.message })
        } else {
            this.setState({ message: this.props.auth.message })
            Alert.alert('Success ', this.state.message, [
                { text: 'OK', onPress: () => this.props.navigation.navigate("Login") },
            ])
        }

    }


    render() {

        return (

            <View style={{ flex: 1 }}>

                <ImageBackground source={{ uri: "http://10.10.10.13:3333/uploads/1584781094299.jpeg" }} style={{
                    width: "100%",
                    height: "100%"
                }}>

                    <View style={{ flex: 5, justifyContent: 'center' }}>
                        <View style={{ backgroundColor: 'white', justifyContent: 'center', marginHorizontal: 15, borderRadius: 20, height: 450 }}>
                            <View style={{ alignItems: 'center' }}>
                                <Image source={require('../../Asset/logo_Kevman.png')} style={{ height: 30, width: 99, }}></Image>
                            </View>

                            <View style={style.wrapFrom}>

                                {this.state.message &&
                                    <View style={{ borderWidth: 1, borderRadius: 10, marginBottom: 10 }}>
                                        <Text style={{ backgroundColor: '#F8D7DA', height: 40, color: 'red', textAlignVertical: 'center' }}> {this.state.message} </Text>
                                    </View>
                                }

                                <View >
                                    <Icon name='user' color='#000' size={14} />
                                    <TextInput on placeholder='Input Your Name..... ' style={style.inputText}
                                        underlineColorAndroid="transparent" onChangeText={name => this.setState({ name })}
                                    />

                                </View>
                                <View style={{ marginTop: 15 }}>
                                    <TextInput on placeholder='Input Your Username ' style={style.inputText}
                                        underlineColorAndroid="transparent" onChangeText={username => this.setState({ username })}
                                    />
                                </View>
                                <View style={{ marginTop: 15 }}>
                                    <TextInput on placeholder='Input Your Password ' style={style.inputText} secureTextEntry={true}
                                        underlineColorAndroid="transparent" onChangeText={password => this.setState({ password })}
                                    />
                                </View>
                                <View style={{ marginTop: 15 }}>
                                    <TextInput on placeholder='Input Your Email ' style={style.inputText}
                                        underlineColorAndroid="transparent" onChangeText={email => this.setState({ email })}
                                    />
                                </View>
                            </View>



                            <TouchableOpacity style={{ marginHorizontal: 30, marginBottom: 10, backgroundColor: '#229504', borderRadius: 10, height: 50, alignItems: 'center', justifyContent: 'center' }}
                                onPress={() => this.handleRegister()}
                            >
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>Register</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ alignSelf: 'center' }}
                                onPress={() => this.props.navigation.navigate("Login")}>
                                <Text style={{ fontSize: 13, color: 'blue' }}> Login</Text>
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
    inputText: { borderBottomColor: '#8A8F9E', borderBottomWidth: 1, height: 50, fontSize: 14, color: '#161F3D', borderWidth: 1, borderRadius: 10, }
})


const mapStateToProps = state => ({
    dataRestaurant: state.restaurant.dataRestaurant,
    auth: state.auth
})

const mapDispatchToProps = { getRestaurant, registerUser }

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)