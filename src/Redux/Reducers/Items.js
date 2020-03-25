const globalState = {
    dataAllItems: [],
    dataItemsByCategory: [],
    dataItemsByItems: [],
    dataItemsByRestaurant: [],
    dataItemsBySortName: [],

}

export default function itemsReducer(state = globalState, action) {
    switch (action.type) {

        case 'GET_ALL_ITEMS':
            return {
                ...state,
                dataAllItems: action.dataItems
            }

        case 'GET_ITEMS_BY_ID_CATEGORY':
            return {
                ...state,
                dataItemsByItems: action.dataItems
            }

        case 'GET_ITEMS_BY_ID_ITEMS':
            return {
                ...state,
                dataItemsByItems: action.dataItems
            }

        case 'GET_ITEMS_BY_ID_RESTAURANT':
            return {
                ...state,
                dataItemsByRestaurant: action.dataItems
            }

        case 'GET_ITEMS_BY_SORT_NAME':
            return {
                ...state,
                dataItemsBySortName: action.dataItems
            }

        default:
            return state
    }
}
