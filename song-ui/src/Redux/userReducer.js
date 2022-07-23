import {loadFromLocalStorage} from "../Storage/localStorage";

const defaultState = loadFromLocalStorage('user') ?
    {
        ...loadFromLocalStorage('user')
    }
    : {
        username: '',
        jwtToken: '',
        jwtTokenExpiresIn: 0
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