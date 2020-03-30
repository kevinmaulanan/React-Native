import React, { Component } from 'react'

import { Button } from 'native-base'
import { Card } from 'react-native-elements'
import { Text, Image, FlatList, ScrollView, View, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Modal from 'react-native-modal'

import { connect } from 'react-redux'
import { getAllItems } from '../../Redux/Actions/Items'
import { createItems } from '../../Redux/Actions/CRUD/Create'
import { DeleteItems } from '../../Redux/Actions/CRUD/Delete'
import { DeleteMessage } from '../../Redux/Actions/CRUD/Update'
import { BASE_API_URL } from 'react-native-dotenv'

import ImagePicker from 'react-native-image-picker'




class EditDetailItemsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filePath: {},
            modalCreate: false,
            modalDelete: false,
            modalUpdate: false,
            name: '',
            quantity: null,
            price: null,
            id_category_detail: null,
            id_restaurant: null,
            pageActive: 1,
            successCreate: '',
        };
    }


    handleModalCreate() {
        this.setState({ modalCreate: !this.state.modalCreate })
    }

    async handleModalDelete() {
        this.setState({ modalDelete: !this.state.modalDelete })
    }

    handleModalUpdate() {
        this.setState({ modalUpdate: !this.state.modalUpdate })
    }


    page(page) {
        this.props.getAllItems(page)
    }


    componentDidMount() {
        this.props.getAllItems(this.state.pageActive)
    }

    async submitCreateItems() {
        const image = {
            type: "image/jpeg",
            uri: this.state.filePath.uri,
            name: this.state.filePath.fileName
        }
        var formData = new FormData()
        formData.append('name', this.state.name)
        formData.append('quantity', this.state.quantity)
        formData.append('price', this.state.price)
        formData.append('id_category_detail', this.state.id_category_detail)
        formData.append('id_restaurant', this.state.id_restaurant)
        formData.append('images', image)

        const response = await this.props.createItems(formData, this.props.token)
        if (this.props.success == true) {
            Alert.alert('Berhasil', this.props.message, [
                { text: 'Berhasil', onPress: () => this.handleModalCreate() },
            ])
            this.props.DeleteMessage()

        } else {
            Alert.alert('Error', this.props.message, [
                { text: 'Error' },
            ])

        }
    }

    async submitUpdateItems() {

    }


    chooseFile = () => {
        const options = {
            noData: true,
        };

        ImagePicker.showImagePicker(options, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
                let source = response;
                this.setState({
                    filePath: source,
                });
            }
        });
    };


    render() {
        return (
            <ScrollView style={{ flex: 1 }} >

                <View style={{ flex: 7 }} >

                    <TouchableOpacity onPress={() => this.handleModalCreate()}>
                        <View style={{ flex: 4, alignItems: 'center', marginVertical: 20 }}>
                            <Image source={require('../../Asset/Makanan.jpg')} style={{ height: 120, width: 350, borderRadius: 100 }}></Image>
                        </View>
                    </TouchableOpacity>

                    <FlatList
                        data={this.props.items}
                        numColumns={2}
                        renderItem={({ item, index }) =>

                            <TouchableOpacity onPress={() => this.props.navigation.navigate("DeleteUpdateItem", { idItem: item.id })}>


                                <Card
                                    image={{ uri: `${BASE_API_URL}${item.image_items}` }}
                                    containerStyle={{ width: 165, marginLeft: 4 }}
                                >

                                    <View style={{ flex: 2, marginLeft: -1, marginTop: -4, }}>
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



                    <View style={{
                        flex: 1, flexDirection: 'row', marginTop: 10, marginLeft: 10, marginBottom: 10
                    }}>
                        {this.props.items &&
                            [...Array(this.props.pagination.totalPages)].map((v, i) =>
                                <Button bordered style={{ height: 30, width: 30, justifyContent: 'center' }}
                                    onPress={() => this.page(i + 1)}
                                >
                                    <Text style={{ color: 'blue', textAlign: 'center', }}> {i + 1}</Text>
                                </Button>

                            )}

                    </View>










                    <Modal isVisible={this.state.modalCreate}>
                        <View style={{ flex: 1, backgroundColor: 'white' }}>
                            <View style={{ flex: 1, margin: 10 }}>
                                <Image
                                    source={{ uri: this.state.filePath.uri }}
                                    style={{ width: 20, height: 20 }}
                                />
                                <Text style={{ alignItems: 'center' }}>
                                    {this.state.filePath.uri}
                                </Text>

                                <View style={{ position: 'relative', marginBottom: 5 }}>
                                    <Icon name='user' color='#000' size={22} style={{ position: 'absolute', left: 10, top: 13 }} />
                                    <TextInput on placeholder='name ' style={style.inputEmail}
                                        underlineColorAndroid="transparent" onChangeText={name => this.setState({ name })}
                                    />
                                </View>

                                <View style={{ position: 'relative', marginBottom: 5 }}>
                                    <Icon name='user' color='#000' size={22} style={{ position: 'absolute', left: 10, top: 13 }} />
                                    <TextInput on placeholder='quantity ' style={style.inputEmail}
                                        underlineColorAndroid="transparent" onChangeText={quantity => this.setState({ quantity })}
                                    />
                                </View>

                                <View style={{ position: 'relative', marginBottom: 5 }}>
                                    <Icon name='user' color='#000' size={22} style={{ position: 'absolute', left: 10, top: 13 }} />
                                    <TextInput on placeholder='price ' style={style.inputEmail}
                                        underlineColorAndroid="transparent" onChangeText={price => this.setState({ price })}
                                    />
                                </View>

                                <View style={{ position: 'relative', marginBottom: 5 }}>
                                    <Icon name='user' color='#000' size={22} style={{ position: 'absolute', left: 10, top: 13 }} />
                                    <TextInput on placeholder='id_category ' style={style.inputEmail}
                                        underlineColorAndroid="transparent" onChangeText={id_category_detail => this.setState({ id_category_detail })}
                                    />
                                </View>

                                <View style={{ marginTop: 15, marginBottom: 15 }}>
                                    <Icon name='lock' color='#000' size={22} style={{ position: 'absolute', left: 10, top: 13 }} />
                                    <TextInput on placeholder='id_restaurant ' style={style.inputEmail}
                                        underlineColorAndroid="transparent" onChangeText={id_restaurant => this.setState({ id_restaurant })}
                                    />
                                </View>

                                <Button title="Choose File" onPress={this.chooseFile.bind(this)} />

                                <View style={{ marginTop: 15, marginBottom: 15 }}>
                                    <Button title="Create" onPress={() => this.submitCreateItems()} />
                                </View>
                                <Button title="Hide modal" onPress={() => this.handleModalCreate()} />
                            </View>
                        </View>
                    </Modal>


                </View>

            </ScrollView >

        );
    }
}


const style = StyleSheet.create({
    container: {
        flex: 1
    },
    textTitle: {
        textAlign: "center", marginTop: 10, marginBottom: 20
    },
    wrapFrom: {
        marginHorizontal: 30, marginTop: 20, marginBottom: 30,
    },
    inputEmail: { borderBottomColor: '#8A8F9E', borderBottomWidth: 1, height: 50, fontSize: 15, color: '#161F3D', borderWidth: 1, borderRadius: 10, paddingLeft: 45 }
})

const mapStateToProps = state => ({
    pagination: state.items.pagePaginationItems,
    items: state.items.dataAllItems,
    token: state.auth.token,
    message: state.create.message
})

const mapDispatchToProps = {
    getAllItems, createItems, DeleteMessage
}

export default connect(mapStateToProps, mapDispatchToProps)(EditDetailItemsScreen)