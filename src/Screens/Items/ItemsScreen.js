import React, { Component } from 'react'
import { Text, View, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native'
import { Card } from 'react-native-elements'
import { connect } from 'react-redux'
import { getAllItems, getItemsByIdCategory } from '../../Redux/Actions/Items'
import { getAllCategory } from '../../Redux/Actions/Category'
import { BASE_API_URL } from 'react-native-dotenv'
import { SearchBar } from 'react-native-elements'


class ItemsScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            categoryActive: 1,
            search: '',
        }
    }


    componentDidMount() {

        this.props.getAllItems()
        this.props.getAllCategory()
        this.props.getItemsByIdCategory(this.state.categoryActive)
    }

    handleCategoryPage(id) {
        this.setState({ categoryActive: id })
        this.props.getItemsByIdCategory(id)
    }

    search(search) {
        console.log(search)
        this.setState({ search })
    }

    render() {
        console.log('sini', this.props.ItemsByCategory)
        return (
            <ScrollView style={{ flex: 1, }}>

                <View style={{ flex: 1, }}>
                    <SearchBar
                        inputContainerStyle={{ backgroundColor: 'white' }}
                        containerStyle={{ backgroundColor: 'white' }}
                        placeholderTextColor="grey"
                        underlineColorAndroid="white"
                        placeholder="Search Items..."
                        onChangeText={this.search}
                        value={this.state.search}
                    />
                </View>

                <ScrollView horizontal style={{ flex: 1 }}>
                    <FlatList horizontal
                        data={this.props.AllCategory}
                        renderItem={({ item }) =>
                            <View style={{ flex: 1, marginHorizontal: 10, marginVertical: 20 }}>
                                <View style={{ height: 20, width: 80, }}>

                                    <TouchableOpacity onPress={() => this.handleCategoryPage(item.id)}>
                                        <Text style={{ textAlign: 'center', color: `${item.id == this.state.categoryActive ? 'black' : 'grey'}` }}
                                        >{item.category_detail}</Text>
                                    </TouchableOpacity>
                                    {this.state.categoryActive == item.id &&
                                        <View style={{ height: 3, backgroundColor: "grey", marginTop: 10 }}></View>
                                    }

                                </View>
                            </View>
                        }
                    />

                </ScrollView>

                <ScrollView>
                    <FlatList
                        data={this.props.ItemsByCategory}
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
    AllDataItems: state.items.dataAllItems,
    AllCategory: state.category.allCategory,
    ItemsByCategory: state.items.dataItemsByCategory
})
const mapDistachToProps = { getAllItems, getAllCategory, getItemsByIdCategory }

export default connect(mapStateToProps, mapDistachToProps)(ItemsScreen)
