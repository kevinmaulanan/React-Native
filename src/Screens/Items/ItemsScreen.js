import React, { Component } from 'react'
import { Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
import { Card } from 'react-native-elements'
import { connect } from 'react-redux'
import { getAllItems } from '../../Redux/Actions/Items'

class ItemsScreen extends Component {
    componentDidMount() {
        this.props.getAllItems()
    }

    render() {
        return (
            <View style={{ flex: 7 }}>
                <FlatList
                    data={this.props.AllDataItems}
                    numColumns={2}
                    renderItem={({ item, index }) =>

                        <Card
                            image={{ uri: `http://10.10.10.13:3333${item.image_items}` }}
                            containerStyle={{ width: 165, marginLeft: 4 }}
                        >

                            {/* <Image source={{ uri: `http://10.10.10.13:3333${item.image_items}` }} style={{ height: 140, width: '100 %', borderRadius: 10 }}></Image> */}
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
                    } />
            </View>

        )
    }
}

const mapStateToProps = state => ({
    AllDataItems: state.items.dataAllItems
})
const mapDistachToProps = { getAllItems }

export default connect(mapStateToProps, mapDistachToProps)(ItemsScreen)
