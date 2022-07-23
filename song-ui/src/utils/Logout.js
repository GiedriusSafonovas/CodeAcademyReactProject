import {clearItemFromLocalStorage, clearLocalStorage} from "../Storage/localStorage";

export const logout = (key) =>{
    clearItemFromLocalStorage(key)
}