import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import BottomTabNavigation from './BottomTabNavigation'
import DetailHomeScreen from '../Screens/Home/DetailHomeScreen';

const AppNavigator = createStackNavigator({
    Main: BottomTabNavigation,
    Detail: DetailHomeScreen

});

export default createAppContainer(AppNavigator);