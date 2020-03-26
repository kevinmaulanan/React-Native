import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from '../Screens/Login/LoginScreen'
import RegisterScreen from '../Screens/Register/RegisterScreen'
import CheckUsernameScreen from '../Screens/ForgotPassword/CheckUsernameScreen'
import ForgotPasswordScreen from '../Screens/ForgotPassword/ForgotPasswordScreen';


const AppNavigator = createStackNavigator({
    Login: LoginScreen,
    Register: RegisterScreen,
    CheckUsername: CheckUsernameScreen,
    ForgotPassword: ForgotPasswordScreen
}, {
    headerMode: 'none'
}


);

export default createAppContainer(AppNavigator);