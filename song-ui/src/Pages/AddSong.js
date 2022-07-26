import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {useState} from "react";
import {createSong} from "../API/apiEndpoints";
import {useSelector} from "react-redux";

const AddSong = () =>
{
    const user = useSelector(state => state.user)

    const [song, setSong] = useState({
        songName: '',
        albumString: '',
        authorString: '',
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
        createSong(song)
    }


    return(<>
        {user.roles.includes("ROLE_ADMIN") &&
        <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Song name</Form.Label>
                <Form.Control type="text"
                              placeholder="Enter song name"
                              name = 'songName'
                              onChange={handleChange}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="album">
                <Form.Label>Album</Form.Label>
                <Form.Control type="text"
                              placeholder="Enter album"
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
                              placeholder="Enter author"
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
                              placeholder="Enter playtime"
                              name = 'playtime'
                              onChange={handleChange}
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>}
        </>
    )
}
export default AddSong

