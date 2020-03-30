import React, { Component } from 'react'
import { Text, Image, TouchableOpacity, ScrollView, View } from 'react-native'



class EditScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: []
        }
    }

    render() {
        return (
            <ScrollView style={{ flex: 1 }} >
                <TouchableOpacity onPress={() => this.props.navigation.navigate('EditItems')}>
                    <View style={{ flex: 4, alignItems: 'center', marginVertical: 20 }}>
                        <Image source={require('../../Asset/Restaurant.jpg')} style={{ height: 120, width: 350, borderRadius: 100 }}></Image>
                    </View>
                </TouchableOpacity>

                <View style={{ flex: 4, alignItems: 'center' }}>
                    <Image source={require('../../Asset/Makanan.jpg')} style={{ height: 120, width: 350, borderRadius: 100 }}></Image>
                </View>

            </ScrollView >


        )
    }

}




export default (EditScreen)
