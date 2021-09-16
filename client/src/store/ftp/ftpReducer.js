import * as actionTypes from './ftpTypes'

const initialState = {
    connectionDetails: {
        host: null,
        port: null,
        username: null,
        password: null,
        secure: null,
        totalSize: null,
        usedSpace: null
        // totalSize: null
    }
}

const ftpReducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.STORE_USER_DATA: return {
            ...state,
            connectionDetails: {
                host: action.value.host,
                port: action.value.port,
                username: action.value.username,
                password: action.value.password,
                secure: action.value.secure,
                totalSize: action.value.totalSize,
                usedSpace: action.value.usedSpace,
                // totalSize: action.value.totalSize
            }
        }

        default: return state;
    }
}

export default ftpReducer;