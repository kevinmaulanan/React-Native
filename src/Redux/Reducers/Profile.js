const globalState = {
    dataMyProfile: [],
    topUp: []
}

export default function profileReducer(state = globalState, action) {
    switch (action.type) {
        case 'GET_MY_PROFILE':
            return {
                ...state,
                dataMyProfile: action.myProfile
            }
        case 'TOP_UP':
            return {
                ...state,
                topUp: action.TopUp
            }
        default:
            return state
    }
}