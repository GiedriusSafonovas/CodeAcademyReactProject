import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {useState} from "react";
import {createSong} from "../API/apiEndpoints";

const AddSong = () =>
{
    const [song, setSong] = useState({
        name: '',
        album: '',
        author: '',
        playtime: '',
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
        createSong(song).then()
    }


    return(
        <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Song name</Form.Label>
                <Form.Control type="text"
                              placeholder="Enter song name"
                              name = 'name'
                              onChange={handleChange}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="album">
                <Form.Label>Album</Form.Label>
                <Form.Control type="text"
                              placeholder="Enter album"
                              name = 'album'
                              onChange={handleChange}
                />
                <Form.Text className="text-muted">
                    Enter multiple with ;
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="author">
                <Form.Label>Author</Form.Label>
                <Form.Control type="text"
                              placeholder="Enter author"
                              name = 'author'
                              onChange={handleChange}
                />
                <Form.Text className="text-muted">
                    Enter multiple with ;
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="playtime">
                <Form.Label>Playtime</Form.Label>
                <Form.Control type="text"
                              placeholder="Enter playtime"
                              name = 'playtime'
                              onChange={handleChange}
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}
export default AddSong

