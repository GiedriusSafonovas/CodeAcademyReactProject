import axios from "axios";
import {loadFromLocalStorage} from "../Storage/localStorage";

const HTTP = axios.create({
    baseURL: ''
})

HTTP.interceptors.request.use(config => {
    const user = loadFromLocalStorage('user')

    // console.log("Before every request jwt", user)

    if (user) {
        config.headers.authorization = "Bearer " + user.jwtToken
    }

    return config
})

export default HTTP