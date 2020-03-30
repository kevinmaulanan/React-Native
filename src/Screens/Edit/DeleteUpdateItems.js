import React, { Component } from 'react'
import { View, Button, Modal, TextInput, Text, Image, ScrollView, StyleSheet, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { BASE_API_URL } from 'react-native-dotenv'
import { getItemsByIdItems } from '../../Redux/Actions/Items'
import { connect } from 'react-redux'
import { UpdateItems, DeleteMessage } from '../../Redux/Actions/CRUD/Update'
import { getAllItems } from '../../Redux/Actions/Items'
import { DeleteItems } from '../../Redux/Actions/CRUD/Delete'
import { YellowBox } from 'react-native'
import ImagePicker from 'react-native-image-picker'

YellowBox.ignoreWarnings([
    'Each child in a list'
])

class DeleteUpdateItems extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalUpdate: false,
            modalDelete: false,
            filePath: {},
        }
    }



    componentDidMount() {
        console.log('props', this.props.navigation.state.params.idItem)
        this.props.getItemsByIdItems(this.props.navigation.state.params.idItem)
    }


    async toogleDelete() {
        this.setState({ modalDelete: !this.state.modalDelete })
    }


    toogleUpdate() {
        this.setState({ modalUpdate: !this.state.modalUpdate })
    }


    async submitUpdateItems() {
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

        const response = await this.props.UpdateItems(this.props.navigation.state.params.idItem, formData, this.props.token)
        console.log('responses', response)
        console.log(this.props.message)
        if (this.props.successUpdate == true) {
            this.props.getItemsByIdItems(this.props.navigation.state.params.idItem)
            Alert.alert('Berhasil', this.props.messageUpdate, [
                { text: 'Berhasil', onPress: () => this.toogleUpdate() },
            ])
            this.props.DeleteMessage()
            console.log('Jika berhasil')

        } else {
            Alert.alert('Error', this.props.messageUpdate, [
                { text: 'Error' },
            ])

        }


    }



    async submitDeleteItems() {
        const response = await this.props.DeleteItems(this.props.navigation.state.params.idItem, this.props.token)
        if (this.props.successDelete == true) {
            Alert.alert('Berhasil', this.props.messageDelete, [
                { text: 'Berhasil', onPress: () => this.toogleDelete() },
            ])
            this.props.getAllItems()
            this.props.navigation.navigate('EditItems')

        } else {
            Alert.alert('Error', this.props.messageDelete, [
                { text: 'Error' },
            ])

        }
    }

    chooseFile() {
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
            <View style={{ flex: 1 }}>
                <View style={{ flex: 2 }}>

                    {this.props.itemsByIdItems &&

                        <Image source={{ uri: `${BASE_API_URL}${this.props.itemsByIdItems.image_items}` }}
                            style={{ height: 250, width: '100%' }} >
                        </ Image>
                    }

                </View>

                <View style={{ flex: 3, marginTop: 60, marginLeft: 10, flexDirection: 'row' }}>
                    {this.props.itemsByIdItems &&
                        <View style={{ flex: 2, marginLeft: -1, marginTop: -4 }}>
                            <Text style={{ fontSize: 16, color: 'grey', marginBottom: 8 }}>{this.props.itemsByIdItems.category_detail}</Text>
                            <Text style={{ fontSize: 20, marginBottom: 10 }}>{this.props.itemsByIdItems.name}</Text>
                            <Text style={{ fontSize: 20, color: 'green' }}>Rp. {this.props.itemsByIdItems.price},-</Text>
                        </View >
                    }
                    <View style={{ flex: 2, marginLeft: -1, marginTop: -4, justifyContent: 'center' }}>
                        <View>
                            <Button title="Update" onPress={() => this.toogleUpdate()}></Button>
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Button title="Delete Items" onPress={() => this.toogleDelete()} />
                        </View >
                    </View>


                </View>

                {this.state.modalDelete == true &&
                    Alert.alert('Delete Items', 'Apakah yakin ingin menghapus items ini?', [
                        {},
                        { text: 'Cancel', onPress: () => this.toogleDelete() },
                        { text: 'Delete', onPress: () => this.submitDeleteItems() },
                    ])
                }


                <Modal
                    animationType="slide"
                    visible={this.state.modalUpdate}>
                    <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
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
                                <TextInput on placeholder='id_category_detail ' style={style.inputEmail}
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
                                <Button title="Update Items" onPress={() => this.submitUpdateItems()} />
                            </View>


                            <Button title="Cancel" onPress={() => this.toogleUpdate()} />
                        </View>
                    </ScrollView>
                </Modal>




            </View >
        )
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
    itemsByIdItems: state.items.dataItemsByItems,
    token: state.auth.token,
    messageUpdate: state.update.message,
    successUpdate: state.update.success,
    messageDelete: state.delete.message,
    successDelete: state.delete.success,
})

const mapDispatchToProps = { getItemsByIdItems, UpdateItems, DeleteItems, DeleteMessage, getAllItems }

export default connect(mapStateToProps, mapDispatchToProps)(DeleteUpdateItems)