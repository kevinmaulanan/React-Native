import Axios from 'axios'
import { BASE_API_URL } from 'react-native-dotenv'

export const getMyProfile = (token) => {

    return async (dispatch) => {
        try {
            const response = await Axios.get(`${BASE_API_URL}/profile`, token)
            dispatch({
                type: 'GET_MY_PROFILE',
                myProfile: response.data.data
            })

        } catch (error) {
            console.log('error', error.response.data)
        }
    }

}


export const topUp = (data, token) => {
    return async (dispatch) => {
        try {
            const response = await Axios.post(`${BASE_API_URL}/topup/add`, data, token)

            dispatch({
                type: 'TOP_UP',
                TopUp: response.data
            })

        } catch (error) {
            console.log('error', error.response.data)
        }
    }

}