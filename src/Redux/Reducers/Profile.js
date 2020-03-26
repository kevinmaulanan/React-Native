const globalState = {
    dataMyProfile: [],
}

export default function profileReducer(state = globalState, action) {
    switch (action.type) {
        case 'GET_MY_PROFILE':
            return {
                ...state,
                dataMyProfile: action.myProfile
            }
        default:
            return state
    }
}