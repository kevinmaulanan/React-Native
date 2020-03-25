import React, { Component } from 'react'
import { View, Text, Image, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { getRestaurant } from '../../Redux/Actions/Restaurant'
import { SliderBox } from 'react-native-image-slider-box'


class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: ''
        }
    }

    componentDidMount() {
        this.props.getRestaurant()
        this.imageSleder()

    }

    imageSleder() {
        const data = this.props.dataRestaurant.map((v, i) => {
            return `http://10.10.10.13:3333${v.image_restaurant}`
        })
        this.setState({ images: data })
    }

    render() {
        console.log(this.state.images)
        return (
            < View style={{ flex: 10 }
            } >
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

                <View style={{ flex: 6 }}>
                    <FlatList
                        style={{ flex: 1 }}
                        data={this.props.dataRestaurant}
                        renderItem={({ item, index }) =>
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

            </View >


        )
    }

}

const mapStateToProps = state => ({
    dataRestaurant: state.restaurant.dataRestaurant
})

const mapDispatchToProps = { getRestaurant }


export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
