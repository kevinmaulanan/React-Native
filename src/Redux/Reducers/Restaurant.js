const globalState = {
    dataRestaurant: [
    ],
    dataRestaurantById: []
}

export default function restaurantReducer(state = globalState, action) {
    console.log(action.restaurantId)
    switch (action.type) {

        case 'GET_ALL_RESTAURANT':
            return {
                ...state,
                dataRestaurant: action.payload
            }
        case 'GET_ALL_RESTAURANT_BY_ID':
            return { ...state, dataRestaurantById: action.restaurantId }


        default:
            return state
    }
}

