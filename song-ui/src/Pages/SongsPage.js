import {Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import {getSongs, deleteSong, getLikedSongs, likeSongapi, unLikeSongapi} from "../API/apiEndpoints";
import Button from "react-bootstrap/Button";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {likeSong, setLikedSongsinReducer, unLikeSong, updateSong} from "../Redux/Actions";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {regular, solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {useTranslation} from "react-i18next";

const SongsPage = () => {

    const {t} = useTranslation("songTable")

    const user = useSelector(state => state.user)

    const likedSongsSelector = useSelector(state => state.likes)

    const [songs, setSongs] = useState(null)

    const navigate = useNavigate()

    const dispatch = useDispatch();

    useEffect(() => {

        console.log(likedSongsSelector.likedSongs)

        if (user.username && likedSongsSelector.likedSongs === null) {
            getLikedSongs(user.username).then((response) => {
                    dispatch(setLikedSongsinReducer(response.data))
                }
            )
        }
        getSongs().then((response) => {
            console.log('response', response)
            setSongs(response.data)

        })
            .catch((error) => console.log('error', error))
        console.log('selector ', likedSongsSelector.likedSongs)
    }, [])


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

        likeSongapi(data).then(()=>{dispatch(likeSong(song))})
    }

    const unLikeSongHandler = (song) => {

        const data = {
            username: user.username,
            songId: song.id
        }

        unLikeSongapi(data).then(()=>{dispatch(unLikeSong(song))})
    }

    return (
        <Table striped bordered hover variant="dark">
            <thead>
            <tr>
                <th>#</th>
                <th>{t("songName")}</th>
                <th>{t("album")}</th>
                <th>{t("author")}</th>
                <th>{t("playtime")}</th>
                {user.username &&
                    <>
                        <th>{t("like")}</th>
                        <th></th>
                        <th></th>
                    </>}
            </tr>
            </thead>
            {songs !== null &&
                <tbody>
                {songs.map((song, i) => (
                    <tr key={song.id}>
                        <td>{i + 1}</td>
                        <td>{song.songName}</td>
                        <td>{song.albumString}</td>
                        <td>{song.authorString}</td>
                        <td>{song.playtime}</td>
                        {user.username &&
                            <>
                                {likedSongsSelector.likedSongs &&
                                <td>
                                    {likedSongsSelector.likedSongs.find(likedSong => likedSong.id === song.id) ?
                                        <Button onClick={() => unLikeSongHandler(song)}>
                                            <FontAwesomeIcon icon={solid('heart')}/>
                                        </Button>
                                        : <Button onClick={() => likeSongHandler(song)}>
                                            <FontAwesomeIcon icon={regular('heart')}/>
                                        </Button>
                                    }
                                </td>}
                                <td><Button variant="warning" onClick={() => editSong(song)}>Edit</Button></td>
                                <td><Button variant="danger" onClick={() => deleteSongById(song.id)}>Delete</Button>
                                </td>
                            </>
                        }
                    </tr>
                ))}
                </tbody>
            }
        </Table>
    )
}
export default SongsPage