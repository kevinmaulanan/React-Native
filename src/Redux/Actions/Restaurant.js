import Axios from 'axios'
import { BASE_API_URL } from 'react-native-dotenv'

export const getRestaurant = () => dispatch => {
    console.log(BASE_API_URL)
    Axios.get(`${BASE_API_URL}/browse_restaurant`)
        .then(res => {
            dispatch({
                type: 'GET_ALL_RESTAURANT',
                payload: res.data.result
            })
        })
        .catch(err => {
            console.log(err)
            console.log('disiinin')
        })
}


export const getRestaurantById = (id) => {
    console.log('aku', id)
    return async (dispatch) => {
        try {
            const response = await Axios.get(`${BASE_API_URL}/browse_restaurant/${id}`)
            console.log(response.data)
            dispatch({
                type: 'GET_ALL_RESTAURANT_BY_ID',
                restaurantId: response.data.data

            })
        } catch (error) {

        }
    }
}



