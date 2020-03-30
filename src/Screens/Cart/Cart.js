import React, { Component } from 'react'
import { Text, View, FlatList, TouchableOpacity, Image, ScrollView, Alert } from 'react-native'
import { Card } from 'react-native-elements'
import { connect } from 'react-redux'

import { getCart, deleteCart, checkOut } from '../../Redux/Actions/Cart'
import { getMyProfile } from '../../Redux/Actions/Profile'

import { BASE_API_URL } from 'react-native-dotenv'
import Icon from 'react-native-vector-icons/FontAwesome5'


class CartScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalDelete: false,
            modalCheckOut: false,
        }
    }


    componentDidMount() {
        this.props.getCart(this.props.token)
    }

    async toogleDeleteCart() {
        this.setState({ modalDelete: !this.state.modalDelete })
        console.log('modal', this.state.modalDelete)
    }

    async handleDeleteCart(id) {
        console.log(id)
        this.props.checkOut(id, this.props.token)
        this.toogleDeleteCart()
        this.props.getCart(this.props.token)
    }

    async toogleCheckOut() {
        this.setState({ modalCheckOut: !this.state.modalCheckOut })

    }

    async handleCheckOut(id) {
        await this.props.checkOut(id, this.props.token)
        if (this.props.checkout.success == false) {
            Alert.alert('Tidak Berhasil', `${this.props.checkout.message} `, [
                {},
                {},
                { text: 'Oke', },
            ])
            this.toogleCheckOut()
            this.props.getCart(this.props.token)

        } else {
            Alert.alert('Berhasil', `${this.props.checkout.message} `, [
                {},
                {},
                { text: 'Oke', },
            ])

            this.toogleCheckOut()
            this.props.getCart(this.props.token)
            const verify = {
                headers: { Authorization: "Bearer " + this.props.token }
            }
            this.props.getMyProfile(verify)
        }

    }


    render() {

        return (
            <ScrollView style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1, alignItems: 'center' }}>

                        <View style={{ flex: 1, marginBottom: 30, height: 50, width: 275, marginTop: 20 }}>
                            <View style={{
                                flex: 1, backgroundColor: 'grey', borderRadius: 10, justifyContent: 'center'
                                , marginHorizontal: 10
                            }}>
                                <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 18 }}>Saldo : Rp.{this.props.topUp},-</Text>
                            </View>
                        </View>
                    </View>


                    {this.props.cart &&
                        <ScrollView style={{ flex: 4, marginTop: -10 }}>
                            <FlatList
                                data={this.props.cart.data}
                                numColumns={1}
                                renderItem={({ item, index }) =>
                                    <View>
                                        <Card>
                                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                                <View style={{ flex: 1 }}>
                                                    <Image source={{ uri: `${BASE_API_URL}${item.image_items}` }}
                                                        style={{ height: 70, width: 70, borderRadius: 30 }}
                                                    ></Image>
                                                </View>
                                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                                    < Text > {item.buy_quantity} </Text>
                                                </View>
                                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                                    <Text>{item.name_items} </Text>
                                                </View>
                                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                                    <Text>{item.result} </Text>
                                                </View>
                                            </View>
                                        </Card>

                                        <View style={{ flex: 1, flexDirection: 'row', height: 40, marginHorizontal: 16 }}>
                                            <View style={{ flex: 1, backgroundColor: '#c81912', alignItems: 'center', justifyContent: 'center' }}>
                                                <View style={{ marginLeft: 55 }}>
                                                    <Icon name="trash" size={18} style={{ position: 'absolute', color: 'white', marginTop: 3 }}></Icon>
                                                </View>
                                                <TouchableOpacity onPress={() => this.toogleDeleteCart()}>
                                                    <Text style={{ fontSize: 18, color: 'white', marginLeft: -18 }}>DELETE</Text>
                                                </TouchableOpacity>



                                            </View>
                                            {this.state.modalDelete == true &&
                                                Alert.alert('Yakin ingin menghapus item ini di Keranjang?', `Hapus Item Ini `, [
                                                    {},
                                                    { text: 'Cancel', onPress: () => this.toogleDeleteCart() },
                                                    { text: 'Delete', onPress: () => this.handleDeleteCart(item.id) },
                                                ])}


                                            {this.state.modalCheckOut == true &&
                                                Alert.alert('CheckOut', `Check Out Item Ini? `, [
                                                    {},
                                                    { text: 'Cancel', onPress: () => this.toogleCheckOut() },
                                                    { text: 'CheckOut', onPress: () => this.handleCheckOut(item.id) },
                                                ])}

                                            <View style={{ flex: 1, backgroundColor: 'green', alignItems: 'center', justifyContent: 'center' }}>

                                                <View style={{ marginLeft: 60 }}>
                                                    <Icon name="shopping-cart" size={18} style={{ position: 'absolute', color: 'white', marginTop: 3 }}></Icon>
                                                </View>

                                                <TouchableOpacity onPress={() => this.toogleCheckOut()}>
                                                    <Text style={{ fontSize: 18, color: 'white', marginLeft: -20 }}>CheckOut</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>

                                }
                            ></FlatList>
                        </ScrollView>
                    }
                </View>
            </ScrollView >

        )
    }
}

const mapStateToProps = state => ({
    cart: state.cart.getCarts,
    token: state.auth.token,
    topUp: state.profile.dataMyProfile.topup,
    checkout: state.cart.dataCheckOut

})
const mapDistachToProps = { getCart, deleteCart, checkOut, getMyProfile }

export default connect(mapStateToProps, mapDistachToProps)(CartScreen)
