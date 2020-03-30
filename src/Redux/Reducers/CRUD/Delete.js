const globalState = {
    success: '',
    message: ''
}

export default function DeleteData(state = globalState, action) {
    switch (action.type) {
        case 'DELETE_RESTAURANT':
            return { message: action.message }

        case 'DELETE_ITEMS':
            return { success: action.success, message: action.message }

        default: return state
    }
}