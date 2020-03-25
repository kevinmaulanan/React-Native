const globalState = {
    isLogin: false,
    token: '',
    getUser: {}
}

export default function AuthUser(state = globalState, action) {
    switch (action.type) {
        case 'AUTH_USER_SUCCESS':
            console.log('getUser', action.getUser)
            return {
                isLogin: true,
                token: action.token,
                getUser: action.getUser

            }
        case 'USER_LOGGED_OUT_SUCCESS':
            console.log('masuk reducer logout')
            return { isLogin: false, token: '' };
        default:
            return state
    }
}



