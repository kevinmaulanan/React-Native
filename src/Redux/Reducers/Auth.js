const globalState = {
    isLogin: false,
    token: '',
    getUser: {},
    message: '',
    success: '',
    code: null,
}

export default function AuthUser(state = globalState, action) {
    switch (action.type) {
        case 'AUTH_USER_SUCCESS':
            return {
                isLogin: true,
                token: action.token,
                getUser: action.getUser

            }
        case 'USER_LOGGED_OUT_SUCCESS':
            return { isLogin: false, token: '' };

        case 'USER_REGISTER':
            return { message: action.playload, success: action.success }

        case 'USER_CHECK_USERNAME':
            return { message: action.message, success: action.success, code: action.code }

        default:
            return state
    }
}



