import Axios from 'axios'

export const getMyProfile = () => {

    return async (dispatch) => {
        try {
            const response = await Axios.get(`http://10.10.10.13:3333/profile`)
            console.log('response', response)
            dispatch({
                type: 'GET_MY_PROFILE',
                myProfile: response.data.data
            })

        } catch (error) {
            console.log('error', error)
        }
    }

}