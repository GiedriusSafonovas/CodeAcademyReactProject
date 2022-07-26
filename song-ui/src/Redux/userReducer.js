import {loadFromLocalStorage} from "../Storage/localStorage";

const defaultState = loadFromLocalStorage('user') ?
    {
        ...loadFromLocalStorage('user')
    }
    : {
        username: '',
        jwtToken: '',
        roles: []
    }

const userReducer = (state = defaultState, action) => {

    switch (action.type) {
        case 'login':
            return action.user
        default:
            return state
    }
}
export default userReducer