import Axios from 'axios'

export const loginUser = (playload) => {
    return async (dispatch) => {
        const response = await Axios.post(`http://10.10.10.13:3333/auth/login`, playload)
        try {
            dispatch({
                type: 'AUTH_USER_SUCCESS',
                token: response.data.data.token,
                getUser: response.data.data.getUser
            })
        } catch (error) {
            console.log('errorrrrrrrrrrrr')
        }
    }
}

export const logoutUser = () => {
    return async (dispatch, getState) => {

        const state = getState()
        dispatch({
            type: 'USER_LOGGED_OUT_SUCCESS'
        })
    }
}