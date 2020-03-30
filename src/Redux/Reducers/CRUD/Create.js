const globalState = {
    success: '',
    message: ''
}

export default function CreateData(state = globalState, action) {

    switch (action.type) {
        case 'CREATE_RESTAURANT':
            return { message: action.message }

        case 'CREATE_ITEMS':
            console.log(action.message)
            return {
                success: action.success,
                message: action.message
            }

        default: return state
    }
}