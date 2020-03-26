import React, { Component } from 'react'
import { Text, Image, FlatList, ScrollView, View } from 'react-native'
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
            images: []
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
            <ScrollView style={{ flex: 1 }} >
                <View style={{ flex: 4 }}>
                    <SliderBox
                        images={this.state.images}
                        sliderBoxHeight={200}
                        onCurrentImagePressed={index =>
                            console.warn(`image ${index} pressed`)
                        }
                        autoplay
                    />
                </View>



                <View style={{ flex: 8 }}>
                    <FlatList
                        style={{ flex: 1 }}
                        data={this.props.dataRestaurant}
                        renderItem={({ item }) =>
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate("Detail", { idRestaurant: restaurant.id }) }}>
                                <View style={{ flex: 1, flexDirection: 'row', marginBottom: 50, marginTop: 50 }}>
                                    <View style={{ flex: 3, margin: 10 }}>
                                        <Image source={{ uri: `http://10.10.10.13:3333${item.image_restaurant}` }} style={{ height: 100, width: 200 }}></Image>
                                    </View>
                                    <View style={{ flex: 2, margin: 10 }}>
                                        <Text>{item.restaurant}</Text>
                                    </View>
                                    <View style={{ flex: 2, margin: 10 }}>
                                        <Text>{item.description}</Text>
                                    </View>

                                </View>
                            </TouchableOpacity>
                        }
                        keyExtractor={this.props.dataRestaurant.id}
                    >

                    </FlatList>
                </View>

                <View style={{ flex: 8 }}>
                    <View style={{ flex: 1 }}>
                        <Text>Items</Text>
                    </View>

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
                </View>

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
