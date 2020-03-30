import Axios from 'axios'
import { BASE_API_URL } from 'react-native-dotenv'

export const UpdateRestaurant = (id, data, token) => {
    return async (dispatch) => {
        try {
            const verify = { headers: { Authorization: "Bearer " + token } }
            const response = await Axios.patch(`${BASE_API_URL}/restaurant/${id}`, data, verify)
            dispatch({
                type: 'UPDATE_RESTAURANT',
                message: response.data.msg,
            })
        } catch (error) {
            console.log('error', error.response.data.message)
        }
    }
}


export const UpdateItems = (id, data, token) => {
    return async (dispatch) => {
        try {
            const response = await Axios.patch(`${BASE_API_URL}/items/${id}`, data, { headers: { Authorization: "Bearer " + token } })
            console.log('woi', response)
            dispatch({
                type: 'UPDATE_ITEMS',
                success: response.data.success,
                message: response.data.message,
            })
        } catch (error) {
            console.log('masuk sini')
            console.log('error', error)

        }
    }
}

export const DeleteMessage = () => {
    return async (dispatch) => {
        dispatch({
            type: 'DELETE_MESSAGE',
        })

    }
}


