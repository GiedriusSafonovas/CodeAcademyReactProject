import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {useState} from "react";
import {createSong} from "../API/apiEndpoints";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

const AddSong = () =>
{
    const user = useSelector(state => state.user)

    const { t } = useTranslation("songTable")

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
                <Form.Label>{t("songName")}</Form.Label>
                <Form.Control type="text"
                              placeholder={t("placeholders:songName")}
                              name = 'songName'
                              onChange={handleChange}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="album">
                <Form.Label>{t("album")}</Form.Label>
                <Form.Control type="text"
                              placeholder={t("placeholders:album")}
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
                              placeholder={t("placeholders:author")}
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
                              placeholder={t("placeholders:playtime")}
                              name = 'playtime'
                              onChange={handleChange}
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                {t("common:submit")}
            </Button>
        </Form>}
        </>
    )
}
export default AddSong

