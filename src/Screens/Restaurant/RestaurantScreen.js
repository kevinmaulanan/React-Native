import React, { Component } from 'react'
import { Text, View, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import { Card } from 'react-native-elements'
import { getRestaurant } from '../../Redux/Actions/Restaurant'
import { connect } from 'react-redux'
import { BASE_API_URL } from 'react-native-dotenv'

class RestaurantScreen extends Component {
    render() {

        return (

            <View style={{ flex: 1, marginTop: 30 }}>

                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 4, marginLeft: 10 }}>
                        <Text style={{ fontSize: 20 }} >All Restaurant</Text>
                    </View>

                    <View style={{ flex: 1, marginRight: 10 }}>
                        <Text style={{ fontSize: 20, textAlign: 'right' }}>></Text>
                    </View>
                </View>



                <View style={{ flex: 19 }}>
                    <FlatList
                        data={this.props.dataRestaurant}
                        renderItem={({ item, index }) =>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailRestaurant', { idRestaurant: item.id })
                            }>
                                <Card
                                    image={{ uri: `${BASE_API_URL}${item.image_restaurant}` }}
                                    containerStyle={{ width: 350, height: 260, marginLeft: 4, marginBottom: 20 }}
                                >

                                    {/* <Image source={{ uri: `http://10.10.10.13:3333${item.image_items}` }} style={{ height: 140, width: '100 %', borderRadius: 10 }}></Image> */}
                                    <View style={{ flex: 2, marginLeft: -1, }}>
                                        <Text style={{ fontSize: 16, color: 'blue' }}>{item.restaurant}</Text>
                                    </View>

                                    <View style={{ flex: 2, marginLeft: -1, marginTop: 35 }}>
                                        <Text style={{ fontSize: 20 }}>{item.description}</Text>
                                    </View>
                                </Card>
                            </TouchableOpacity>
                        } />
                </View>




            </View >

        )
    }
}

const mapStateToProps = state => ({
    dataRestaurant: state.restaurant.dataRestaurant,

})
const mapDistachToProps = { getRestaurant }

export default connect(mapStateToProps, mapDistachToProps)(RestaurantScreen)
