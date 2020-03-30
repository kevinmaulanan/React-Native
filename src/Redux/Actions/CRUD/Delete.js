import Axios from 'axios'
import { BASE_API_URL } from 'react-native-dotenv'

export const DeleteRestaurant = (id, token) => {
    return async (dispatch) => {
        try {
            const verify = { headers: { Authorization: "Bearer " + token } }
            const response = await Axios.delete(`${BASE_API_URL}/restaurant/${id}`, verify)
            dispatch({
                type: 'DELETE_RESTAURANT',
                message: response.data.msg,
            })
        } catch (error) {
            console.log('error', error.response.data.message)
        }
    }
}


export const DeleteItems = (idItem, token) => {
    console.log(idItem)
    console.log(token)
    return async (dispatch) => {
        try {

            const verify = { headers: { Authorization: "Bearer " + token } }
            const data = {
                id: idItem
            }
            const response = await Axios.delete(`${BASE_API_URL}/items`, { data, headers: { Authorization: "Bearer " + token } })
            console.log('response', response)
            dispatch({
                type: 'DELETE_ITEMS',
                success: response.data.success,
                message: response.data.message,
            })
        } catch (error) {
            console.log('error', error.response.data.message)
        }
    }
}


