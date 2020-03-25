import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from '../Screens/Login/LoginScreen'
import RegisterScreen from '../Screens/Register/RegisterScreen'


const AppNavigator = createStackNavigator({
    Login: LoginScreen,
    Register: RegisterScreen
}, {
    headerMode: 'none'
}


);

export default createAppContainer(AppNavigator);