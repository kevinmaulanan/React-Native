import React, { Component } from 'react'

export default class ModalCreateItems extends Component {
    render() {
        return (
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
                            <TextInput on placeholder=' ' style={style.inputEmail}
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
        )
    }
}
