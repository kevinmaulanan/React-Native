import Axios from 'axios'
import { BASE_API_URL } from 'react-native-dotenv'


export const getCart = (token) => {
    return async (dispatch) => {
        try {
            const verify = { headers: { Authorization: "Bearer " + token } }
            const response = await Axios.get(`${BASE_API_URL}/carts`, verify)

            dispatch({
                type: 'GET_CARTS',
                dataGetCart: response.data
            })

        } catch (error) {
            console.log(error.response)
        }
    }
}


export const addCart = (idItem, quantity, token) => {
    return async (dispatch) => {
        try {
            const verify = { headers: { Authorization: "Bearer " + token } }
            const response = await Axios.post(`${BASE_API_URL}/carts/${idItem}`, quantity, verify)

            dispatch({
                type: 'ADD_CARTS',
                data: response.data
            })

        } catch (error) {
            console.log(error.response)
        }
    }
}


export const deleteCart = (idItem, token) => {
    return async (dispatch) => {
        try {
            console.log(idItem)
            console.log(token)
            const data = {
                idCart: idItem
            }
            const verify = { headers: { Authorization: "Bearer " + token } }
            const response = await Axios.delete(`${BASE_API_URL}/carts`, { data, headers: { Authorization: "Bearer " + token } })
            console.log('DELETE CARTS', response.data)
            dispatch({
                type: 'DELETE_CARTS',
                data: response.data
            })

        } catch (error) {
            console.log('wo', error.response)
        }
    }
}

export const checkOut = (idItem, token) => {
    return async (dispatch) => {
        try {
            console.log(idItem)
            console.log(token)
            const data = {
                idCart: idItem
            }
            const verify = { headers: { Authorization: "Bearer " + token } }
            const response = await Axios.post(`${BASE_API_URL}/checkout`, data, { headers: { Authorization: "Bearer " + token } })
            console.log('CHECK OUT CARTS', response.data)
            dispatch({
                type: 'CHECKOUT',
                data: response.data
            })

        } catch (error) {
            console.log('woi', error.response)
        }
    }
}