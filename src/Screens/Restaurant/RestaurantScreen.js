import React, { Component } from 'react'
import { Text, View, FlatList } from 'react-native'
import { Card } from 'react-native-elements'
import { getRestaurant } from '../../Redux/Actions/Restaurant'
import { connect } from 'react-redux'

class RestaurantScreen extends Component {
    render() {
        console.log(this.props.dataRestaurant)
        return (
            <View style={{ flex: 7, alignItems: 'center' }}>
                <FlatList
                    data={this.props.dataRestaurant}
                    renderItem={({ item, index }) =>

                        <Card
                            image={{ uri: `http://10.10.10.13:3333${item.image_restaurant}` }}
                            containerStyle={{ width: 350, height: 240, marginLeft: 4, marginBottom: 20 }}
                        >

                            {/* <Image source={{ uri: `http://10.10.10.13:3333${item.image_items}` }} style={{ height: 140, width: '100 %', borderRadius: 10 }}></Image> */}
                            <View style={{ flex: 2, marginLeft: -1, }}>
                                <Text style={{ fontSize: 20, color: 'blue' }}>{item.restaurant}</Text>
                            </View>

                            <View style={{ flex: 2, marginLeft: -1, marginTop: 40 }}>
                                <Text>{item.description}</Text>
                            </View>
                        </Card>
                    } />
            </View>

        )
    }
}

const mapStateToProps = state => ({
    dataRestaurant: state.restaurant.dataRestaurant
})
const mapDistachToProps = { getRestaurant }

export default connect(mapStateToProps, mapDistachToProps)(RestaurantScreen)
