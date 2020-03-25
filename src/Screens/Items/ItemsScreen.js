import React, { Component } from 'react'
import { Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
import { getAllItems } from '../../Redux/Actions/Items'

class ItemsScreen extends Component {
    componentDidMount() {
        this.props.getAllItems()
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Text>Akus</Text>
                <FlatList
                    style={{ flex: 1 }}
                    data={this.props.AllDataItems}
                    renderItem={({ item, index }) =>
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate("Detail", { idItems: item.id }) }} >

                            <View style={{ flex: 1, flexDirection: 'row', marginVertical: 10 }}>
                                <View style={{ flex: 1 }}>
                                    <Image source={{ uri: `http://10.10.10.13:3333${item.image_items}` }} style={{ height: 50, width: 50 }}></Image>
                                </View>

                                <View style={{ flex: 1 }}>
                                    <Text> {item.name} </Text>

                                </View>

                                <View style={{ flex: 1 }}>
                                    <Text> {item.restaurant} </Text>
                                </View>

                                <View style={{ flex: 1 }}>
                                    <Text> Rp.{item.price},- </Text>
                                </View>
                                <View style={{ flex: 1 }}>

                                </View>
                            </View>
                        </TouchableOpacity>
                    } >
                </FlatList>
            </View>

        )
    }
}

const mapStateToProps = state => ({
    AllDataItems: state.items.dataAllItems
})
const mapDistachToProps = { getAllItems }

export default connect(mapStateToProps, mapDistachToProps)(ItemsScreen)
