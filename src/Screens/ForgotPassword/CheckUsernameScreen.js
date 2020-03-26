import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image, Alert } from 'react-native'
import { checkUsername } from '../../Redux/Actions/Auth'
import { getRestaurant } from '../../Redux/Actions/Restaurant'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome5'

class CheckUsernameScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            images: [],
            message: null,
            code: null
        }
    }


    handleMessage() {
        if (this.props.auth.success == false) {
            this.setState({ message: this.props.auth.message })
        } else {
            this.setState({ code: this.props.auth.code })
            Alert.alert(this.props.auth.message, 'Copy Code Ini=> ' + this.props.auth.code, [
                { text: 'OK', onPress: () => this.props.navigation.navigate("ForgotPassword") },
            ])
        }
    }

    async handleCheckUsername() {
        const data = {
            username: this.state.username,
        }
        console.log(data)
        try {
            const response = await this.props.checkUsername(data)
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
                            </View>



                            <TouchableOpacity style={{ marginHorizontal: 30, marginBottom: 10, backgroundColor: '#229504', borderRadius: 10, height: 50, alignItems: 'center', justifyContent: 'center' }}
                                onPress={() => this.handleCheckUsername()}
                            >
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>CheckUsername</Text>
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
    inputEmail: { borderBottomColor: '#8A8F9E', borderBottomWidth: 1, height: 50, fontSize: 15, color: '#161F3D', borderWidth: 1, borderRadius: 10, paddingLeft: 45 }
})


const mapStateToProps = state => ({
    auth: state.auth,

})

const mapDispatchToProps = { getRestaurant, checkUsername }

export default connect(mapStateToProps, mapDispatchToProps)(CheckUsernameScreen)