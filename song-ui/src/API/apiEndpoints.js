import HTTP from './AxiosConfig';

const getSongs = () => HTTP.get("/songs")

const createSong = (songData) => HTTP.post("/createsong", songData)

const deleteSong = (id) => HTTP.delete("/deletesong/"+id)

const updateSong = (songData) => HTTP.put("/updatesong", songData)

const login = (loginData) => HTTP.post("/login", loginData)

const registerNewUser = (userData) => HTTP.post("/register", userData)

const likeSongapi = (data) => HTTP.post("/likesong", data)

const getLikedSongs = (username) => HTTP.get("/getLikedSongs/"+username)

export {getSongs, createSong, deleteSong, updateSong, login, registerNewUser, likeSongapi, getLikedSongs}