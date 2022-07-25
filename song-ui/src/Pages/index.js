import {useDispatch, useSelector} from "react-redux";
import {getLikedSongs} from "../API/apiEndpoints";
import {setLikedSongsinReducer} from "../Redux/Actions";
import {Route, Routes} from "react-router-dom";
import SongsPage from "./SongsPage";
import AddSong from "./AddSong";
import UpdateSong from "./UpdateSong";
import Login from "./Login";
import Register from "./Register";
import {useEffect} from "react";
import HomePage from "./HomePage";

const Pages = () => {

    const likedSongsSelector = useSelector(state => state.likes)
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    useEffect(() => {

            console.log(likedSongsSelector.likedSongs)

            if (user.username && likedSongsSelector.likedSongs === null) {
                getLikedSongs(user.username).then((response) => {
                        dispatch(setLikedSongsinReducer(response.data))
                    }
                )
            }
        }
    )

    return (
        <Routes>
            <Route path='/songlist' element={<SongsPage/>}/>
            <Route path='/addsong' element={<AddSong/>}/>
            <Route path='/updatesong' element={<UpdateSong/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/' element={<HomePage/>}/>
        </Routes>
    )
}

export default Pages;