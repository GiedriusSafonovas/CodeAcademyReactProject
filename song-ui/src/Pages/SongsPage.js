import {Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import {getSongs, deleteSong} from "../API/apiEndpoints";
import Button from "react-bootstrap/Button";

const SongsPage = () => {

    const [songs, setSongs] = useState([])

    useEffect(() => {
        getSongs().then((response) => {
            console.log('response', response)
            setSongs(response.data)

        })
            .catch((error) => console.log('error', error))
    }, [])

    const deleteSongById = (id) =>
    {
        console.log(id)
        deleteSong(id)
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
                        <td></td>
                        <td><Button variant="warning">Edit</Button></td>
                        <td><Button variant="danger" onClick={() => deleteSongById(song.id)}>Delete</Button></td>
                    </tr>
                ))}
                </tbody>
            </Table>
    )
}
export default SongsPage