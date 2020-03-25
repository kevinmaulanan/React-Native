import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Button } from 'native-base'


export default class DetailHomeScreen extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Button light small onPress={() => { this.props.navigation.navigate("Home") }}>
                    <Text > Ini Halaman DetailHomeScreen </Text>
                </Button>
            </View>

        )
    }
}
