import React, { Component } from 'react'
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, FlatList, Alert } from 'react-native'
import { Card } from 'react-native-elements'
import { connect } from 'react-redux'
import { getItemsByIdItems } from '../../Redux/Actions/Items'
import { getReview } from '../../Redux/Actions/Review'
import { addCart } from '../../Redux/Actions/Cart'
import { BASE_API_URL } from 'react-native-dotenv'
import Icon from 'react-native-vector-icons/FontAwesome5'


class DetailItemsScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalAddCart: false,
            modalReview: false,
            quantity: null,
        }
    }

    componentDidMount() {
        const token = this.props.token
        const id = this.props.navigation.state.params.idItems
        this.props.getItemsByIdItems(id)
        this.props.getReview(id, token)

    }

    toogleAddCart() {
        this.setState({ modalAddCart: !this.state.modalAddCart })
    }

    toogleReview() {
        this.setState({ modalReview: !this.state.modalReview })
    }

    async addCart() {
        const data = {
            quantity: this.state.quantity
        }
        const token = this.props.token
        const id = this.props.navigation.state.params.idItems
        this.props.addCart(id, data, token)
    }


    render() {
        console.log('props review', this.props.allReview)
        return (
            <ScrollView style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <Image source={{ uri: `${BASE_API_URL}${this.props.itemsByIdItems.image_items}` }}
                        style={{ height: 250, width: '100%' }} >
                    </Image>
                </View>

                <View style={{ flex: 1, marginTop: 10, flexDirection: 'row', marginHorizontal: 10 }}>

                    <View style={{ flex: 1, marginLeft: -1, marginTop: -4 }}>

                        <Text style={{ fontSize: 16, color: 'grey', marginBottom: 8 }}>{this.props.itemsByIdItems.category_detail}</Text>

                        <Text style={{ fontSize: 20, marginBottom: 10 }}>{this.props.itemsByIdItems.name}</Text>

                        <Text style={{ fontSize: 20, color: 'green' }}>Rp. {this.props.itemsByIdItems.price},-</Text>

                    </View >

                    <View style={{ flex: 1, marginTop: -20, marginBottom: 20 }}>

                        <View style={{ flex: 1, flexDirection: 'row', borderRadius: 20, marginTop: 15, height: 60 }}>
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <Text style={{ textAlign: 'center' }}>Quantity :</Text>
                            </View>
                            <View style={{ flex: 1, borderRadius: 10, justifyContent: 'center' }}>
                                <TextInput on placeholder='Quantity ' style={{ borderRadius: 10, borderColor: 'gray', borderWidth: 1 }}

                                    onChangeText={quantity => this.setState({ quantity })}
                                />
                            </View>
                        </View>


                        <View style={{ flex: 2, marginTop: 20, backgroundColor: 'green', alignItems: 'center', justifyContent: 'center', borderRadius: 25, height: 60 }}>

                            <TouchableOpacity onPress={() => this.toogleAddCart()}>
                                <View style={{ marginLeft: 70 }}>
                                    <Icon name="cart-plus" size={18} style={{ position: 'absolute', color: 'white', marginTop: 3 }}></Icon>
                                </View>
                                <Text style={{ fontSize: 18, color: 'white', marginLeft: -30 }}>Add To Cart</Text>
                            </TouchableOpacity>

                        </View>
                    </View>

                    {this.state.modalAddCart == true &&
                        Alert.alert('Yakin ingin tambah ke Keranjang?', `Quantity : ${this.state.quantity} `, [
                            {},
                            { text: 'Cancel', onPress: () => this.toogleAddCart() },
                            { text: 'Tambah ke Keranjang', onPress: () => this.addCart() },
                        ])}


                </View>

                <View style={{ flex: 1, marginLeft: -1, marginTop: 20, height: 40 }}>

                    <View style={{ flex: 1, backgroundColor: 'grey', width: 140, marginLeft: 20, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                        <TouchableOpacity onPress={() => this.toogleReview()}>
                            <Text style={{ color: 'white', alignContent: 'center', textAlign: 'center' }}>Lihat Komentar</Text>
                        </TouchableOpacity>
                    </View>
                </View>


                {this.state.modalReview == true &&
                    <ScrollView >
                        <FlatList
                            data={this.props.allReview}
                            renderItem={({ item, index }) =>

                                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                    <View style={{ flex: 1, marginLeft: 10, marginVertical: 10, }}>

                                        {item.image == '' &&
                                            <Image source={require('../../Asset/default_foto.png')}
                                                style={{ height: 50, width: 50, borderRadius: 50 }}>
                                            </Image>
                                        }

                                        {item.image !== '' &&
                                            <Image source={{ uri: `${BASE_API_URL}${item.image}` }}
                                                style={{ height: 50, width: 50, borderRadius: 50 }}>
                                            </Image>
                                        }

                                    </View>

                                    <View style={{ flex: 4, marginTop: 6, marginRight: 10, borderRadius: 15, backgroundColor: '#F0EAE8' }}>
                                        <View style={{ marginLeft: 14, marginTop: 5, marginBottom: 10 }}>
                                            <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>{item.nama}</Text>

                                            <Text>{item.comment}</Text>

                                        </View>
                                    </View>

                                </View>

                            } />
                    </ScrollView>


                }

            </ScrollView >
        )
    }

}

const mapStateToProps = state => ({
    itemsByIdItems: state.items.dataItemsByItems,
    allReview: state.review.reviewAll,
    token: state.auth.token
})

const mapDispatchToProps = {
    getItemsByIdItems, getReview, addCart
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailItemsScreen) 
