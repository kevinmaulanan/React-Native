import Axios from 'axios'
import { BASE_API_URL } from 'react-native-dotenv'

export const getAllCategory = () => {
    return async (dispatch) => {
        try {
            const response = await Axios.get(`${BASE_API_URL}/browse_category`)
            dispatch({
                type: 'GET_ALL_CATEGORY',
                data: response.data.result
            })
        } catch (error) {

        }
    }
}
