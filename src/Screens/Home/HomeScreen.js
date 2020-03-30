import React, { Component } from 'react'
import { Text, Image, FlatList, ScrollView, View, } from 'react-native'
import { Button } from 'native-base'
import { connect } from 'react-redux'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { getRestaurant } from '../../Redux/Actions/Restaurant'
import { getAllItems } from '../../Redux/Actions/Items'
import { SliderBox } from 'react-native-image-slider-box'
import { Card } from 'react-native-elements'
import { YellowBox } from 'react-native'
import { BASE_API_URL } from 'react-native-dotenv'

YellowBox.ignoreWarnings([
    'VirtualizedLists should never be nested',
    'Failed child context type'
])


class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            pageActive: 1,
        }
    }

    componentDidMount() {
        this.props.getRestaurant()
        this.props.getAllItems(this.state.pageActive)
        this.imageSleder()

    }

    page(page) {
        this.props.getAllItems(page)
    }

    imageSleder() {
        const data = this.props.dataRestaurant.map((v, i) => {
            return `${BASE_API_URL}${v.image_restaurant}`
        })
        this.setState({ images: data })
    }

    render() {
        return (
            <ScrollView style={{ flex: 1 }} >
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Restaurant')
                }>
                    <View style={{ flex: 4 }} >
                        <SliderBox
                            images={this.state.images}
                            sliderBoxHeight={200}

                            autoplay
                        />
                    </View>
                </TouchableOpacity>





                <View style={{ flex: 8, marginVertical: 20, marginTop: 70 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Items")}>
                        <View style={{ flex: 2, flexDirection: 'row' }}>
                            <View style={{ flex: 1, marginLeft: 10 }}>
                                <Text style={{ fontSize: 20 }} >Product</Text>
                            </View>

                            <View style={{ flex: 1, marginRight: 10 }}>
                                <Text style={{ fontSize: 20, textAlign: 'right' }}>></Text>
                            </View>
                        </View>
                    </TouchableOpacity>


                    <View style={{ flex: 7 }} >

                        <FlatList
                            data={this.props.AllDataItems}
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

                        <View style={{ flex: 1, flexDirection: 'row', marginTop: 20, marginLeft: 10 }}>
                            {this.props.AllDataItems &&
                                [...Array(this.props.pagination.totalPages)].map((v, i) =>
                                    <Button bordered style={{ height: 30, width: 30, justifyContent: 'center' }}
                                        onPress={() => this.page(i + 1)}
                                    >
                                        <Text style={{ color: 'blue', textAlign: 'center', }}> {i + 1}</Text>
                                    </Button>
                                )}
                        </View>

                    </View>
                </View>



                <TouchableOpacity onPress={() => this.props.navigation.navigate("Restaurant")}>
                    <View style={{ flex: 2, flexDirection: 'row', marginTop: 20 }}>
                        <View style={{ flex: 1, marginLeft: 10 }}>
                            <Text style={{ fontSize: 20 }} >Restaurant</Text>
                        </View>

                        <View style={{ flex: 1, marginRight: 10 }}>
                            <Text style={{ fontSize: 20, textAlign: 'right' }}>></Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <ScrollView style={{ flex: 7 }} horizontal>
                    <FlatList
                        horizontal
                        data={this.props.dataRestaurant}
                        renderItem={({ item, index }) =>

                            <Card
                                image={{ uri: `${BASE_API_URL}${item.image_restaurant}` }}
                                containerStyle={{ width: 350, height: 260, marginLeft: 4, marginBottom: 20 }}
                            >

                                {/* <Image source={{ uri: `${BASE_API_URL}${item.image_items}` }} style={{ height: 140, width: '100 %', borderRadius: 10 }}></Image> */}
                                <View style={{ flex: 2, marginLeft: -1, }}>
                                    <Text style={{ fontSize: 16, color: 'blue' }}>{item.restaurant}</Text>
                                </View>

                                <View style={{ flex: 2, marginLeft: -1, marginTop: 35 }}>
                                    <Text style={{ fontSize: 20 }}>{item.description}</Text>
                                </View>
                            </Card>
                        } />
                </ScrollView>

            </ScrollView >


        )
    }

}

const mapStateToProps = state => ({
    dataRestaurant: state.restaurant.dataRestaurant,
    AllDataItems: state.items.dataAllItems,
    pagination: state.items.pagePaginationItems,
})

const mapDispatchToProps = { getRestaurant, getAllItems }


export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
