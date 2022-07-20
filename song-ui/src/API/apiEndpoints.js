import HTTP from './AxiosConfig';

const getSongs = () => HTTP.get("/songs")

const createSong = (songData) => HTTP.post("/createsong", songData)

export {getSongs, createSong}