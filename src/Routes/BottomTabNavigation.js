import React, { Component } from 'react'
// import { crateBottomTabNavigation } from 'react-navigation-tabs'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import ProfileScreen from '../Screens/Profile/ProfileScreen'
import HomeScreen from '../Screens/Home/HomeScreen'
import RestaurantScreen from '../Screens/Restaurant/RestaurantScreen'
import ItemsScreen from '../Screens/Items/ItemsScreen'
import Icon from 'react-native-vector-icons/FontAwesome5'

const BottomTabNavigation = createBottomTabNavigator({
    Home: HomeScreen,
    Profile: ProfileScreen,
    Restaurant: RestaurantScreen,
    Items: ItemsScreen
},
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused }) => {
                const { routeName } = navigation.state
                let iconName
                if (routeName === 'Home') {
                    iconName = 'home'
                }
                else if (routeName === 'Profile') {
                    iconName = 'user-tie'
                }
                else if (routeName === 'Restaurant') {
                    iconName = 'layer-group'
                }
                else if (routeName === 'Items') {
                    iconName = 'clipboard-list'
                }
                return <Icon name={iconName} size={26} color={focused ? 'blue' : '#bababa'} ></Icon>

            }
        })

    })

export default BottomTabNavigation