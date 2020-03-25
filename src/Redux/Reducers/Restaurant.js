const globalState = {
    dataRestaurant: [

    ]
}

export default function restaurantReducer(state = globalState, action) {
    switch (action.type) {
        case 'GET_ALL_RESTAURANT':
            return {
                ...state,
                dataRestaurant: action.payload
            }

        default:
            return state
    }
}

