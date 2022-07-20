import {Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import {getSongs} from "../API/apiEndpoints";

const SongsPage = () => {

    const [songs, setSongs] = useState([])

    useEffect(() => {
        getSongs().then((response) => {
            console.log('response', response)
            setSongs(response.data)

        })
            .catch((error) => console.log('error', error))
    }, [])

    return (
            <Table striped bordered hover variant="dark">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Song name</th>
                    <th>Album</th>
                    <th>Author</th>
                    <th>Playtime</th>
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
                    </tr>
                ))}
                </tbody>
            </Table>
    )
}
export default SongsPage