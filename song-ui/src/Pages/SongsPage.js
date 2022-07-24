import {Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import {getSongs, deleteSong} from "../API/apiEndpoints";
import Button from "react-bootstrap/Button";
import {NavLink, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {updateSong} from "../Redux/Actions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {brands, regular, solid} from "@fortawesome/fontawesome-svg-core/import.macro";

const SongsPage = () => {

    const [songs, setSongs] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        getSongs().then((response) => {
            console.log('response', response)
            setSongs(response.data)

        })
            .catch((error) => console.log('error', error))
    }, [])

    const dispatch = useDispatch();

    const deleteSongById = (id) =>
    {
        console.log(id)

        deleteSong(id).then(()=>{
            const newSongList = songs.filter(song => song.id !== id)
            setSongs(newSongList)
        })
    }

    const editSong = (song) =>{
        console.log('hello ',song)
        dispatch(updateSong(song))
        navigate("/updatesong")
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
                        <td>{i+1}</td>
                        <td>{song.songName}</td>
                        <td>{song.albumString}</td>
                        <td>{song.authorString}</td>
                        <td>{song.playtime}</td>
                        <td>
                            <FontAwesomeIcon icon={regular('heart')} />
                            {/*<FontAwesomeIcon icon={solid('heart')} />*/}
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