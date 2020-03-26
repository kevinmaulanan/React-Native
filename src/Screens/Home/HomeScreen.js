import React, { Component } from 'react'
import { Text, Image, FlatList, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { getRestaurant } from '../../Redux/Actions/Restaurant'
import { getAllItems } from '../../Redux/Actions/Items'
import { SliderBox } from 'react-native-image-slider-box'
import { Card } from 'react-native-elements'


class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: ''
        }
    }

    componentDidMount() {
        this.props.getRestaurant()
        this.props.getAllItems()
        this.imageSleder()

    }

    imageSleder() {
        const data = this.props.dataRestaurant.map((v, i) => {
            return `http://10.10.10.13:3333${v.image_restaurant}`
        })
        this.setState({ images: data })
    }

    render() {
        return (
            < ScrollView style={{ flex: 1 }
            } >
                <ScrollView style={{ flex: 4 }}>
                    <SliderBox
                        images={this.state.images}
                        sliderBoxHeight={200}
                        onCurrentImagePressed={index =>
                            console.warn(`image ${index} pressed`)
                        }
                        autoplay
                    />
                </ScrollView>

                <ScrollView style={{ flex: 8 }}>
                    <FlatList
                        style={{ flex: 1 }}
                        data={this.props.dataRestaurant}
                        renderItem={({ item, index }) =>
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate("Detail", { idRestaurant: restaurant.id }) }}>
                                <ScrollView style={{ flex: 1, flexDirection: 'row', marginBottom: 50, marginTop: 50 }}>
                                    <ScrollView style={{ flex: 3, margin: 10 }}>
                                        <Image source={{ uri: `http://10.10.10.13:3333${item.image_restaurant}` }} style={{ height: 100, width: 200 }}></Image>
                                    </ScrollView>
                                    <ScrollView style={{ flex: 2, margin: 10 }}>
                                        <Text>{item.restaurant}</Text>
                                    </ScrollView>
                                    <ScrollView style={{ flex: 2, margin: 10 }}>
                                        <Text>{item.description}</Text>
                                    </ScrollView>

                                </ScrollView>
                            </TouchableOpacity>
                        }
                        keyExtractor={this.props.dataRestaurant.id}
                    >

                    </FlatList>
                </ScrollView>

                <ScrollView style={{ flex: 8, marginLeft: 10 }}>
                    <ScrollView style={{ flex: 1 }}>
                        <Text>Items</Text>
                    </ScrollView>

                    <ScrollView style={{ flex: 3, flexDirection: "row", }}>
                        <FlatList
                            style={{ flex: 1, }}
                            data={this.props.AllDataItems}
                            numColumns={4}
                            renderItem={({ item, index }) =>
                                <Image source={{ uri: `http://10.10.10.13:3333${item.image_items}` }} style={{ flexDirection: "row-reverse", height: 60, width: 60, margin: 10 }} >
                                </Image>
                            } />
                    </ScrollView>
                </ScrollView>

            </ScrollView >


        )
    }

}

const mapStateToProps = state => ({
    dataRestaurant: state.restaurant.dataRestaurant,
    AllDataItems: state.items.dataAllItems
})

const mapDispatchToProps = { getRestaurant, getAllItems }


export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
