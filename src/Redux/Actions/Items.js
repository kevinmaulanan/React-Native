import Axios from 'axios'
import { BASE_API_URL } from 'react-native-dotenv'

export const getAllItems = (pageActive) => {
    return async (dispatch) => {
        try {

            const response = await Axios.get(`${BASE_API_URL}/browse_items?page=${pageActive}`)
            dispatch({
                type: 'GET_ALL_ITEMS',
                dataItems: response.data.result,
                pagePagination: response.data.pagination


            })
        } catch (error) {

        }
    }
}


export const getItemsByIdItems = (id) => {
    console.log('byid', id)
    return async (dispatch) => {
        try {
            const response = await Axios.get(`${BASE_API_URL}/browse_items/items/${id}`)

            dispatch({
                type: 'GET_ITEMS_BY_ID_ITEMS',
                dataItemsByIdItems: response.data.data

            })
        } catch (error) {

        }
    }
}


export const getItemsByIdRestaurant = (id) => {
    return async (dispatch) => {
        try {
            const response = await Axios.get(`${BASE_API_URL}/browse_items/restaurant/${id}`)
            dispatch({
                type: 'GET_ITEMS_BY_ID_RESTAURANT',
                dataItemsByIdRestaurant: response.data.data

            })
        } catch (error) {

        }
    }
}

export const getItemsByIdCategory = (id) => {

    return async (dispatch) => {
        try {
            const response = await Axios.get(`${BASE_API_URL}/browse_items/category/${id}`)
            dispatch({
                type: 'GET_ITEMS_BY_ID_CATEGORY',
                dataItemsByIdCategory: response.data.data

            })
        } catch (error) {

        }
    }
}


export const getItemsBySortName = () => {
    return async (dispatch) => {
        try {
            const response = await Axios.get(`${BASE_API_URL}/browse_items?sort[name]=1}`)
            dispatch({
                type: 'GET_ITEMS_BY_SORT_NAME',
                dataItemsBySortName: response.data.result

            })
        } catch (error) {

        }
    }
}






