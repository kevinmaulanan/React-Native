const globalState = {
    reviewAll: [

    ]
}

export default function reviewReducer(state = globalState, action) {
    switch (action.type) {
        case 'GET_ALL_REVIEW':
            return {
                ...state,
                reviewAll: action.data
            }

        default:
            return state
    }
}

