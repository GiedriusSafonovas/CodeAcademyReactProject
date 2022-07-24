import HTTP from './AxiosConfig';

const getSongs = () => HTTP.get("/songs")

const createSong = (songData) => HTTP.post("/createsong", songData)

const deleteSong = (id) => HTTP.delete("/deletesong/"+id)

const updateSong = (songData) => HTTP.put("/updatesong", songData)

const login = (loginData) => HTTP.post("/login", loginData)

const registerNewUser = (userData) => HTTP.post("/register", userData)

const likeSong = (data) => HTTP.post("/likesong", data)

export {getSongs, createSong, deleteSong, updateSong, login, registerNewUser, likeSong}