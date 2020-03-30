import Axios from 'axios'
import { BASE_API_URL } from 'react-native-dotenv'

export const CreateRestaurant = (data, token) => {
    return async (dispatch) => {

        try {
            const verify = { headers: { Authorization: "Bearer " + token } }
            const response = await Axios.post(`${BASE_API_URL}/restaurant`, data, verify)
            console.log(data)
            console.log('forgot Password', response.data)
            dispatch({
                type: 'CREATE_RESTAURANT',
                message: response.data.msg,
            })
        } catch (error) {
            console.log('error', error.response.data.message)
        }
    }
}


export const createItems = (data, token) => {
    return async (dispatch) => {
        console.log('sini')
        try {

            const verify = { headers: { Authorization: "Bearer " + token } }
            const response = await Axios.post(`${BASE_API_URL}/items`, data, verify)
            console.log('anjir', response.data)
            dispatch({
                type: 'CREATE_ITEMS',
                success: response.data.success,
                message: response.data.message,
            })
        } catch (error) {
            console.log('error', error.response.data.message)
        }
    }
}


