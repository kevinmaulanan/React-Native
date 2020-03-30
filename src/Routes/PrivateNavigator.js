import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import BottomTabNavigation from './BottomTabNavigation'
import DetailHomeScreen from '../Screens/Home/DetailHomeScreen';
import DetailItemsScreen from '../Screens/Items/ItemsDetail';
import DetailRestaurantScreen from '../Screens/Restaurant/RestaurantDetail';
import EditDetailItemsScreen from '../Screens/Edit/EditDetailItemsScreen';
import DeleteUpdateItems from '../Screens/Edit/DeleteUpdateItems';
import CartScreen from '../Screens/Cart/Cart'

const AppNavigator = createStackNavigator({
    KEVMAN: BottomTabNavigation,
    Detail: DetailHomeScreen,
    DetailItems: DetailItemsScreen,
    DetailRestaurant: DetailRestaurantScreen,
    EditItems: EditDetailItemsScreen,
    DeleteUpdateItem: DeleteUpdateItems,
    MyCart: CartScreen
});

export default createAppContainer(AppNavigator);