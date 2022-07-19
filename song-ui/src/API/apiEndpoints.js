import HTTP from './AxiosConfig';

const getSongs = () => HTTP.get("/songs")

export {getSongs}