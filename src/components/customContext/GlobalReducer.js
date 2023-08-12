const GlobalReducer = (state, action) => {
    switch(action.type) {
        case 'ADD_DATA': {
            return {
                data: [...state.data,...action.payload],
                fun: true
            }
        }
        case 'SET_FUN': {
            return {
                data: [],
                fun: false
            }
        }
        default: {
            return {
                ...state.data
            }
        }
    }
}

export default GlobalReducer;