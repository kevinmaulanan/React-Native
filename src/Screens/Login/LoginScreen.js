import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native'
import { loginUser } from '../../Redux/Actions/Auth'
import { getRestaurant } from '../../Redux/Actions/Restaurant'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { BASE_API_URL } from 'react-native-dotenv'

class LoginScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            images: [],
            message: null,
        }
    }

    componentDidMount() {
        this.props.getRestaurant()
        console.log('hmm', process.env.REACT_APP_API_URL)
    }

    async handleSignIn() {
        const data = {
            username: this.state.username,
            password: this.state.password
        }
        console.log(data)

        try {
            const response = await this.props.loginUser(data)
        } catch (error) {
            console.log('front', error.response.data.message)
            this.setState({ message: error.response.data.message })

        }
    }

    render() {

        return (

            <View style={{ flex: 1 }}>

                <ImageBackground source={{ uri: `${BASE_API_URL}/uploads/1584781094299.jpeg` }} style={{
                    width: "100%",
                    height: "100%"
                }}>

                    <View style={{ flex: 5, justifyContent: 'center' }}>
                        <View style={{ backgroundColor: 'white', justifyContent: 'center', marginHorizontal: 15, borderRadius: 20, height: 350 }}>
                            <View style={{ alignItems: 'center' }}>
                                <Image source={require('../../Asset/logo_Kevman.png')} style={{ height: 30, width: 99, }}></Image>
                            </View>

                            <View style={style.wrapFrom}>
                                {this.state.message &&
                                    <View>
                                        <Text style={{ backgroundColor: '#F8D7DA', height: 40, color: 'red', textAlignVertical: 'center', borderWidth: 0, borderRadius: 10, marginBottom: 10 }}> {this.state.message} </Text>
                                    </View>
                                }

                                <View style={{ position: 'relative' }}>
                                    <Icon name='user' color='#000' size={22} style={{ position: 'absolute', left: 10, top: 13 }} />
                                    <TextInput on placeholder='Username ' style={style.inputEmail}
                                        underlineColorAndroid="transparent" onChangeText={username => this.setState({ username })}
                                    />

                                </View>
                                <View style={{ marginTop: 15 }}>
                                    <Icon name='lock' color='#000' size={22} style={{ position: 'absolute', left: 10, top: 13 }} />
                                    <TextInput on placeholder='Password ' style={style.inputEmail} secureTextEntry={true}
                                        underlineColorAndroid="transparent" onChangeText={password => this.setState({ password })}
                                    />
                                </View>
                            </View>



                            <TouchableOpacity style={{ marginHorizontal: 30, marginBottom: 10, backgroundColor: '#229504', borderRadius: 10, height: 50, alignItems: 'center', justifyContent: 'center' }}
                                onPress={() => this.handleSignIn()}
                            >
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>Sign In</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ alignSelf: 'center' }}
                                onPress={() => this.props.navigation.navigate("Register")}>
                                <Text style={{ fontSize: 13, color: 'blue' }}> Create Account</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ alignSelf: 'center' }}
                                onPress={() => this.props.navigation.navigate("CheckUsername")}>
                                <Text style={{ fontSize: 13, color: 'blue' }}> Forgot Password</Text>
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
    inputEmail: { borderBottomColor: '#8A8F9E', borderBottomWidth: 1, height: 50, fontSize: 15, color: '#161F3D', borderWidth: 1, borderRadius: 10, paddingLeft: 45 }
})


const mapStateToProps = state => ({
    dataRestaurant: state.restaurant.dataRestaurant,

})

const mapDispatchToProps = { getRestaurant, loginUser }

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)