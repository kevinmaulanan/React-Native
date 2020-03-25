import Axios from 'axios'

export const getAllItems = () => {
    return async (dispatch) => {
        try {

            const response = await Axios.get(`http://10.10.10.13:3333/browse_items`)
            dispatch({
                type: 'GET_ALL_ITEMS',
                dataItems: response.data.result

            })
        } catch (error) {

        }
    }
}


export const getItemsByIdItems = (id) => {
    return async (dispatch) => {
        try {
            const response = await Axios.get(`http://10.10.10.13:3333/browse_items/items/${id}`)
            dispatch({
                type: 'GET_ITEMS_BY_ID_ITEMS',
                dataItems: response.data.data

            })
        } catch (error) {

        }
    }
}


export const getItemsByIdRestaurant = (id) => {
    return async (dispatch) => {
        try {
            const response = await Axios.get(`http://10.10.10.13:3333/browse_items/restaurant/${id}`)
            dispatch({
                type: 'GET_ITEMS_BY_ID_RESTAURANT',
                dataItems: response.data.data

            })
        } catch (error) {

        }
    }
}

export const getItemsByIdCategory = (ID) => {
    return async (dispatch) => {
        try {
            const response = await Axios.get(`http://10.10.10.13:3333/browse_items/category/${id}`)
            dispatch({
                type: 'GET_ITEMS_BY_ID_CATEGORY',
                dataItems: response.data.data

            })
        } catch (error) {

        }
    }
}


export const getItemsBySortName = () => {
    return async (dispatch) => {
        try {
            const response = await Axios.get(`http://10.10.10.13:3333/browse_items?sort[name]=1}`)
            dispatch({
                type: 'GET_ITEMS_BY_SORT_NAME',
                dataItems: response.data.result

            })
        } catch (error) {

        }
    }
}






