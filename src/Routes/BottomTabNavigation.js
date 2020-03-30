import React, { Component } from 'react'
// import { crateBottomTabNavigation } from 'react-navigation-tabs'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import ProfileScreen from '../Screens/Profile/ProfileScreen'
import HomeScreen from '../Screens/Home/HomeScreen'
import RestaurantScreen from '../Screens/Restaurant/RestaurantScreen'
import ItemsScreen from '../Screens/Items/ItemsScreen'
import EditScreen from '../Screens/Edit/EditScreen'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { connect } from 'react-redux'





// console.log('Bottom', this.props.classUser)
const BottomTabNavigation = createBottomTabNavigator({
    Home: HomeScreen,
    Restaurant: RestaurantScreen,
    Items: ItemsScreen,
    Profile: ProfileScreen,
    Edits: EditScreen

},
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused }) => {
                const { routeName } = navigation.state

                let iconName
                if (routeName === 'Home') {
                    iconName = 'home'
                }
                else if (routeName === 'Restaurant') {
                    iconName = 'layer-group'
                }
                else if (routeName === 'Items') {
                    iconName = 'clipboard-list'
                }
                else if (routeName === 'Profile') {
                    iconName = 'user-tie'
                }
                else if (routeName === 'Edits') {
                    iconName = 'user'
                }
                return <Icon name={iconName} size={26} color={focused ? 'blue' : '#bababa'} ></Icon>
            }
        })

    })

// const mapStateToProps = state => ({
//     classUser: state.profile.dataMyProfile
// })

// console.log(this.props)
export default (BottomTabNavigation)