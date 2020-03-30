import Axios from 'axios'


import { BASE_API_URL } from 'react-native-dotenv'


export const getReview = (id, token) => {
    return async (dispatch) => {
        try {
            const verify = { headers: { Authorization: "Bearer " + token } }
            const response = await Axios.get(`${BASE_API_URL}/review/${id}`, verify)
            dispatch({
                type: 'GET_ALL_REVIEW',
                data: response.data.data
            })

        } catch (error) {
            console.log(error.response)
        }
    }
}
