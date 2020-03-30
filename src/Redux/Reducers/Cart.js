const globalState = {
    getCarts: [],
    postCarts: [],
    dataAddCart: [],
    dataDeleteCart: [],
    dataCheckOut: []
}

export default function cartReducer(state = globalState, action) {
    switch (action.type) {
        case 'GET_CARTS':
            return {
                ...state,
                getCarts: action.dataGetCart,
            }
        case 'ADD_CARTS':
            return {
                dataAddCart: action.data
            }
        case 'DELETE_CARTS':
            return {
                dataDeleteCart: action.data
            }
        case 'CHECKOUT':
            return {
                dataCheckOut: action.data
            }



        default:
            return state
    }
}



