const globalState = {
    allCategory: []
}

export default function categoryReducer(state = globalState, action) {
    switch (action.type) {
        case 'GET_ALL_CATEGORY':
            return {
                allCategory: action.data
            }


        default:
            return state
    }
}



