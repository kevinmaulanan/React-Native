import Axios from 'axios'

export const getRestaurant = () => dispatch => {
    Axios.get(`http://10.10.10.13:3333/browse_restaurant`)
        .then(res => {
            dispatch({
                type: 'GET_ALL_RESTAURANT',
                payload: res.data.result
            })
        })
        .catch(err => {
            console.log(err)
            console.log('disiinin')
        })
}


export const getRestaurantById = (id) => {
    return async (dispatch) => {
        try {
            const response = await Axios.get(`http://10.10.10.13:3333/browse_restaurant/${id}`)
            dispatch({
                type: 'GET_ALL_RESTAURANT_BY_ID',
                playload: response.data.data

            })
        } catch (error) {

        }
    }
}



