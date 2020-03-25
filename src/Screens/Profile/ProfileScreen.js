import React, { Component } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { Button } from 'native-base'
import { connect } from 'react-redux'
import { logoutUser } from '../../Redux/Actions/Auth'
import { getMyProfile } from '../../Redux/Actions/Profile'

class ProfileScreen extends Component {

    logout() {
        console.log('hmmm')
        console.log(this.props.logoutUser())
    }

    componentDidMount() {
        this.props.getMyProfile()
    }

    render() {
        console.log('woi2', this.props.profile)
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 3 }}>
                    <Text>Ini Halaman Profile</Text>
                    <Button onPress={() => this.logout()}>
                        <Text>LOGOUT</Text>
                    </Button>
                </View>
                <View style={{ flex: 13 }}>
                    <View style={{ flex: 3, backgroundColor: 'blue', justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={{ uri: `http://10.10.10.13:3333${this.props.profile.image}` }} style={{ height: 120, width: 120, borderRadius: 100, }}></Image>
                    </View>
                    <View style={{ flex: 1, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={style.textName}>{this.props.profile.nama}</Text>
                    </View>

                    <View style={{ flex: 6 }}>

                    </View>

                </View>
            </View >
        )
    }
}

var style = StyleSheet.create({
    textName: {
        fontFamily: 'sans-serif',
        fontSize: 20,

    }
})

const mapStateToProps = state => ({
    profile: state.auth.getUser
})

const mapDispatchToProps = { getMyProfile, logoutUser }

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)
