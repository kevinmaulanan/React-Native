import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, ScrollView, ImageBackground } from 'react-native'
import { Button } from 'native-base'
import { connect } from 'react-redux'
import { logoutUser } from '../../Redux/Actions/Auth'
import { getMyProfile, topUp } from '../../Redux/Actions/Profile'
import { getCart } from '../../Redux/Actions/Cart'
import { BASE_API_URL } from 'react-native-dotenv'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { Badge } from 'react-native-elements'

class ProfileScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            topup: null,
        }
    }



    componentDidMount() {
        const token = this.props.token
        const verify = { headers: { Authorization: "Bearer " + token } }
        const data = this.props.getMyProfile(verify)
        this.props.getCart(token)

    }

    async logout() {
        this.props.logoutUser()
    }
    async handleTopUp() {
        const data = {
            topup: this.state.topup
        }
        const token = this.props.token
        const verify = { headers: { Authorization: "Bearer " + token } }
        const response = await this.props.topUp(data, verify)
        this.props.getMyProfile(verify)
    }

    render() {

        return (
            <ScrollView style={{ flex: 1 }}>


                <View style={{ flex: 13 }}>

                    <View style={{ flex: 3, marginBottom: 60 }}>
                        <ImageBackground source={require('../../Asset/Background.jpg')} style={{ height: 180 }}></ImageBackground>

                        <Image source={{ uri: `${BASE_API_URL}${this.props.profile.image}` }}
                            style={{ height: 150, width: 150, borderRadius: 100, borderWidth: 4, borderColor: 'white', position: 'absolute', marginLeft: 100, marginTop: 90 }}>

                        </Image>
                    </View>


                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                        <Text style={style.textName}>{this.props.profile.nama}</Text>
                    </View>

                    <View style={{ flex: 1, alignItems: 'center' }}>

                        <View style={{ flex: 1, marginBottom: 30, height: 50, width: 275, }}>
                            <View style={{
                                flex: 1, backgroundColor: 'green', borderRadius: 10, justifyContent: 'center'
                                , marginHorizontal: 10
                            }}>
                                <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 18 }}>Saldo : Rp.{this.props.profile.topup},-</Text>
                            </View>
                        </View>
                    </View>


                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ flex: 1, marginRight: 20, marginLeft: 10, backgroundColor: '#DCDCDC' }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ textAlign: 'center', color: 'black', fontSize: 20, marginBottom: 7 }}>Tambah Saldo</Text>
                            </View>

                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <TextInput on placeholder='TopUp ' style={style.inputEmail}
                                    onChangeText={topup => this.setState({ topup })}
                                />
                                <TouchableOpacity style={{ marginHorizontal: 30, marginBottom: 10, backgroundColor: 'grey', borderRadius: 10, height: 40, width: 70, alignItems: 'center', justifyContent: 'center' }}
                                    onPress={() => this.handleTopUp()}
                                >
                                    <Text style={{ color: 'white', fontWeight: 'bold' }}>TopUp+</Text>
                                </TouchableOpacity>
                            </View>

                        </View>

                        <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#DCDCDC' }}>
                            <Text style={{ textAlign: 'center', color: 'black', fontSize: 20, marginBottom: 7 }}>Lihat Cart</Text>

                            <TouchableOpacity onPress={() => this.props.navigation.navigate('MyCart')}>
                                <Icon name='shopping-cart' size={30} color='green' ></Icon>
                                {this.props.cart &&
                                    <Badge status="error"
                                        width={22}
                                        size={20}
                                        value={<Text style={{ color: 'white', fontSize: 18 }}> {this.props.cart.total}</Text>}
                                        containerStyle={{ position: 'absolute', top: -5, right: -10 }}>
                                    </Badge>
                                }

                            </TouchableOpacity>

                        </View>

                    </View>



                </View>

                <View style={{ flex: 3, marginTop: 30, marginBottom: 30, backgroundColor: 'grey' }}>
                    <Button onPress={() => this.logout()}>
                        <Text>LOGOUT</Text>
                    </Button>
                </View>



            </ScrollView >
        )
    }
}

var style = StyleSheet.create({
    textName: {
        fontFamily: 'sans-serif',
        fontSize: 24,
        fontWeight: 'bold',

    }
})

const mapStateToProps = state => ({
    profile: state.profile.dataMyProfile,
    token: state.auth.token,
    topUp: state.profile.topUp,
    cart: state.cart.getCarts
})

const mapDispatchToProps = { getMyProfile, topUp, logoutUser, getCart }

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)
