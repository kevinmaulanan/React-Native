globalState = {
    success: '',
    message: ''
}

export default function UpdateData(state = globalState, action) {
    switch (action.type) {
        case 'UPDATE_RESTAURANT':
            return { success: action.success, message: action.message }

        case 'UPDATE_ITEMS':
            return { success: action.success, message: action.message }
        case 'DELETE_MESSAGE':
            return { success: '', message: '' }
        default: return state
    }
}