import {Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import {getSongs, deleteSong, likeSong, getLikedSongs} from "../API/apiEndpoints";
import Button from "react-bootstrap/Button";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setLikedSongsinReducer, updateSong} from "../Redux/Actions";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {regular, solid} from "@fortawesome/fontawesome-svg-core/import.macro";

const SongsPage = () => {

    const user = useSelector(state => state.user)

    const likedSongsSelector = useSelector(state => state.likes)

    const [songs, setSongs] = useState([])

    const [likedSongs, setLikedSongs] = useState([])

    const navigate = useNavigate()

    useEffect(() => {

        console.log(likedSongsSelector.likedSongs.isEmpty)

        if(user && likedSongsSelector.likedSongs.length === 0){
            getLikedSongs(user.username).then((response) => {
                dispatch(setLikedSongsinReducer(response.data))
                }
            )
        }
        setLikedSongs(likedSongsSelector.likedSongs)
        getSongs().then((response) => {
            console.log('response', response)
            setSongs(response.data)

        })
            .catch((error) => console.log('error', error))
        console.log('selector ', likedSongsSelector.likedSongs)
    }, [])


    const dispatch = useDispatch();


    const deleteSongById = (id) => {
        console.log(id)

        deleteSong(id).then(() => {
            const newSongList = songs.filter(song => song.id !== id)
            setSongs(newSongList)
        })
    }

    const editSong = (song) => {
        console.log('hello ', song)
        dispatch(updateSong(song))
        navigate("/updatesong")
    }

    const likeSongHandler = (song) => {

        const data = {
            username: user.username,
            songId: song.id
        }

        likeSong(data)
    }

    return (
        <Table striped bordered hover variant="dark">
            <thead>
            <tr>
                <th>#</th>
                <th>Song name</th>
                <th>Album</th>
                <th>Author</th>
                <th>Playtime</th>
                <th>Like</th>
                <th></th>
                <th></th>
            </tr>
            </thead>
                <tbody>
                {songs.map((song, i) => (
                    <tr key={song.id}>
                        <td>{i + 1}</td>
                        <td>{song.songName}</td>
                        <td>{song.albumString}</td>
                        <td>{song.authorString}</td>
                        <td>{song.playtime}</td>
                        <td>
                            {likedSongs.find(likedSong => likedSong.id === song.id) ?
                                <Button>
                                    <FontAwesomeIcon icon={solid('heart')}/>
                                </Button>
                                : <Button onClick={() => likeSongHandler(song)}>
                                    <FontAwesomeIcon icon={regular('heart')}/>
                                </Button>
                            }
                        </td>
                        <td><Button variant="warning" onClick={() => editSong(song)}>Edit</Button></td>
                        <td><Button variant="danger" onClick={() => deleteSongById(song.id)}>Delete</Button></td>
                    </tr>
                ))}
                </tbody>
        </Table>
    )
}
export default SongsPage