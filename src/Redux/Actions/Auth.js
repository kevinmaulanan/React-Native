import Axios from 'axios'
import { BASE_API_URL } from 'react-native-dotenv'

export const loginUser = (playload) => {
    console.log(BASE_API_URL)
    return async (dispatch) => {
        try {
            console.log('2', BASE_API_URL)
            const response = await Axios.post(`${BASE_API_URL}/auth/login`, playload)
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
            const response = await Axios.post(`${BASE_API_URL}/register`, data)
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
            const response = await Axios.post(`${BASE_API_URL}/verify`, data)
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


export const forgotPassword = (data) => {
    return async (dispatch) => {
        try {
            const response = await Axios.post(`${BASE_API_URL}/forgot-password`, data)
            console.log(data)
            console.log('forgot Password', response.data)
            dispatch({
                type: 'USER_FORGOT_PASSWORD',
                message: response.data.message,
            })
        } catch (error) {
            console.log('error', error.response.data.message)
        }
    }
}
