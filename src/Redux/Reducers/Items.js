const globalState = {
    dataAllItems: [],
    dataItemsByCategory: [],
    dataItemsByItems: [],
    dataItemsByRestaurant: [],
    dataItemsBySortName: [],
    pagePaginationItems: [],

}

export default function itemsReducer(state = globalState, action) {
    switch (action.type) {


        case 'GET_ALL_ITEMS':
            return {
                ...state,
                dataAllItems: action.dataItems,
                pagePaginationItems: action.pagePagination
            }

        case 'GET_ITEMS_BY_ID_CATEGORY':
            return {
                ...state,
                dataItemsByCategory: action.dataItemsByIdCategory
            }

        case 'GET_ITEMS_BY_ID_ITEMS':
            return {
                ...state,
                dataItemsByItems: action.dataItemsByIdItems
            }

        case 'GET_ITEMS_BY_ID_RESTAURANT':
            return {
                ...state,
                dataItemsByRestaurant: action.dataItemsByIdRestaurant
            }

        case 'GET_ITEMS_BY_SORT_NAME':
            return {
                ...state,
                dataItemsBySortName: action.dataItemsBySortName
            }

        default:
            return state
    }
}
