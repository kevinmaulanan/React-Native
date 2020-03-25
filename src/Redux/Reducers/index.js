import { combineReducers } from 'redux'
import authReducer from './Auth'

import restaurantReducer from './Restaurant'
import itemsReducer from './Items'
import profileReducer from './Profile'


export default combineReducers({
    auth: authReducer,
    restaurant: restaurantReducer,
    items: itemsReducer,
    profile: profileReducer
})


// const reducers = {
//     authReducer: auth
// }


// const appReducer = combineReducers(reducers)

// const rootReducer = (state, action) => {

//     if (action.type === "USER_LOGGED_OUT_SUCCESS") {
//         state = {}
//     }
//     return appReducer(state, action)
// }

// export default rootReducer