import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {useState} from "react";
import {updateSong} from "../API/apiEndpoints";
import {useSelector} from "react-redux";
import {NavLink} from "react-router-dom";

const AddSong = () =>
{


    const songData = useSelector(state => state.song)

    const [song, setSong] = useState({
        id: songData.id,
        songName: songData.songName,
        albumString: songData.albumString,
        authorString: songData.authorString,
        playtime: songData.playtime,
    })

    const handleChange = (e) => {
        setSong({
            ...song,
            [e.target.name]: e.target.value,
        })
    }

    const onSubmit = (e) =>{
        e.preventDefault()
        console.log(song)
        updateSong(song)
    }


    return(
        <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Song name</Form.Label>
                <Form.Control type="text"
                              defaultValue={song.songName}
                              name = 'songName'
                              onChange={handleChange}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="album">
                <Form.Label>Album</Form.Label>
                <Form.Control type="text"
                              defaultValue={song.albumString}
                              name = 'albumString'
                              onChange={handleChange}
                />
                <Form.Text className="text-muted">
                    Enter multiple with ;
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="author">
                <Form.Label>Author</Form.Label>
                <Form.Control type="text"
                              defaultValue={song.authorString}
                              name = 'authorString'
                              onChange={handleChange}
                />
                <Form.Text className="text-muted">
                    Enter multiple with ;
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="playtime">
                <Form.Label>Playtime</Form.Label>
                <Form.Control type="text"
                              defaultValue={song.playtime}
                              name = 'playtime'
                              onChange={handleChange}
                />
            </Form.Group>
            <Button variant="primary" type="submit" to="/songlist" as={NavLink}>
                Submit
            </Button>
        </Form>
    )
}
export default AddSong

