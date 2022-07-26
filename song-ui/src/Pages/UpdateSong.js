import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {useState} from "react";
import {updateSong} from "../API/apiEndpoints";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

const AddSong = () =>
{

    const { t } = useTranslation("songTable")

    const navigate = useNavigate()

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
        updateSong(song).finally(() => navigate("/songlist"))
    }


    return(
        <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="name">
                <Form.Label>{t("songName")}</Form.Label>
                <Form.Control type="text"
                              defaultValue={song.songName}
                              name = 'songName'
                              onChange={handleChange}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="album">
                <Form.Label>{t("album")}</Form.Label>
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
                <Form.Label>{t("author")}</Form.Label>
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
                <Form.Label>{t("playtime")}</Form.Label>
                <Form.Control type="text"
                              defaultValue={song.playtime}
                              name = 'playtime'
                              onChange={handleChange}
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                {t("common:submit")}
            </Button>
        </Form>
    )
}
export default AddSong

