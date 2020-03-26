import Axios from 'axios'

export const loginUser = (playload) => {
    return async (dispatch) => {
        try {
            const response = await Axios.post(`http://10.10.10.13:3333/auth/login`, playload)
            console.log('jnj', response.data.message)
            dispatch({
                type: 'AUTH_USER_SUCCESS',
                token: response.data.data.token,
                getUser: response.data.data.getUser
            })
        } catch (error) {
            console.log('sini', error.response.data.message)
            throw error
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

export const registerUser = (data) => {
    return async (dispatch) => {
        try {
            const response = await Axios.post(`http://10.10.10.13:3333/register`, data)
            console.log('Register', response.data.message)
            dispatch({
                type: 'USER_REGISTER',
                playload: response.data.message,
                success: response.data.success

            })
        } catch (error) {
            console.log(error.response.data.message)
        }
    }
}

export const checkUsername = (data) => {
    return async (dispatch) => {
        try {
            const response = await Axios.post(`http://10.10.10.13:3333/verify`, data)
            console.log(data)
            console.log('checkUsername', response.data)
            dispatch({
                type: 'USER_CHECK_USERNAME',
                message: response.data.message,
                success: response.data.success,
                code: response.data.Code

            })
        } catch (error) {
            console.log('error', error.response.data.message)
        }
    }
}
