import React, { Component } from 'react'
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, FlatList, Alert } from 'react-native'
import { Card } from 'react-native-elements'
import { connect } from 'react-redux'
import { getRestaurantById } from '../../Redux/Actions/Restaurant'
import { getItemsByIdRestaurant } from '../../Redux/Actions/Items'
import { getReview } from '../../Redux/Actions/Review'
import { addCart } from '../../Redux/Actions/Cart'
import { BASE_API_URL } from 'react-native-dotenv'
import Icon from 'react-native-vector-icons/FontAwesome5'


class DetailRestaurantScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalAddCart: false,
            modalReview: false,
            quantity: null,
        }
    }

    componentDidMount() {
        this.props.getRestaurantById(this.props.navigation.state.params.idRestaurant)
        this.props.getItemsByIdRestaurant(this.props.navigation.state.params.idRestaurant)

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
        console.log(this.props.restaurant)
        return (
            <ScrollView style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    {this.props.restaurant &&
                        <Image source={{ uri: `${BASE_API_URL}${this.props.restaurant.image_restaurant}` }}
                            style={{ height: 250, width: '100%' }} >
                        </Image>
                    }
                </View>



                <View style={{ flex: 1, marginTop: 30 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Items")}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{ flex: 4, marginLeft: 10 }}>
                                <Text style={{ fontSize: 20 }} >Items By: {this.props.restaurant.restaurant}</Text>
                            </View>

                            <View style={{ flex: 1, marginRight: 10 }}>
                                <Text style={{ fontSize: 20, textAlign: 'right' }}>></Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                <ScrollView>
                    <FlatList
                        data={this.props.ItemsByRestaurant}
                        numColumns={2}
                        renderItem={({ item, index }) =>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailItems', { idItems: item.id })
                            }>
                                <Card
                                    image={{ uri: `${BASE_API_URL}${item.image_items}` }}
                                    containerStyle={{ width: 165, marginLeft: 4 }}
                                >

                                    <View style={{ flex: 2, marginLeft: -1, marginTop: -4 }}>
                                        <Text style={{ fontSize: 13, color: 'grey' }}>{item.category_detail}</Text>
                                    </View>

                                    <View style={{ flex: 2, marginLeft: -1, marginTop: 10 }}>
                                        <Text>{item.name}</Text>
                                    </View>

                                    <View style={{ flex: 2, marginLeft: -1, marginTop: 10 }}>
                                        <Text style={{ fontSize: 13, color: 'green' }}>Rp. {item.price},-</Text>
                                    </View>
                                </Card>
                            </TouchableOpacity>
                        } />
                </ScrollView>



            </ScrollView >
        )
    }

}

const mapStateToProps = state => ({
    restaurant: state.restaurant.dataRestaurantById,
    token: state.auth.token,
    ItemsByRestaurant: state.items.dataItemsByRestaurant
})

const mapDispatchToProps = {
    getRestaurantById, getReview, addCart, getItemsByIdRestaurant
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailRestaurantScreen) 
