import { combineReducers } from 'redux'
import authReducer from './Auth'

import restaurantReducer from './Restaurant'
import itemsReducer from './Items'
import profileReducer from './Profile'
import reviewReducer from './Review'
import createReducer from './CRUD/Create'
import updateReducer from './CRUD/Update'
import deleteReducer from './CRUD/Delete'
import categoryReducer from './Category'
import cartReducer from './Cart'


export default combineReducers({
    auth: authReducer,
    restaurant: restaurantReducer,
    items: itemsReducer,
    profile: profileReducer,
    review: reviewReducer,
    create: createReducer,
    update: updateReducer,
    delete: deleteReducer,
    category: categoryReducer,
    cart: cartReducer,
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