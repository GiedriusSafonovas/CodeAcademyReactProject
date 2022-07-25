import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {regular, solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {Table} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {unLikeSongapi} from "../API/apiEndpoints";
import {unLikeSong} from "../Redux/Actions";

const HomePage = () => {

    const {t} = useTranslation("songTable")

    const user = useSelector(state => state.user)

    const likedSongsSelector = useSelector(state => state.likes)

    const dispatch = useDispatch();

    const unLikeSongHandler = (song) => {

        const data = {
            username: user.username,
            songId: song.id
        }

        unLikeSongapi(data).then(()=>{dispatch(unLikeSong(song))})
    }

    return (
        <div>
            {
                user.username ?
                    <div>
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
                                    </>}
                            </tr>
                            </thead>
                            {likedSongsSelector.likedSongs !== null &&
                                <tbody>
                                {likedSongsSelector.likedSongs.map((song, i) => (
                                    <tr key={song.id}>
                                        <td>{i + 1}</td>
                                        <td>{song.songName}</td>
                                        <td>{song.albumString}</td>
                                        <td>{song.authorString}</td>
                                        <td>{song.playtime}</td>
                                        <td>
                                            <Button onClick={() => unLikeSongHandler(song)}>
                                                <FontAwesomeIcon icon={solid('heart')}/>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            }
                        </Table>
                    </div>
                    : <div>
                        <Nav.Link to="/login" as={NavLink}>Login</Nav.Link>
                        <span>OR</span>
                        <Nav.Link to="/register" as={NavLink}>Register</Nav.Link>
                    </div>
            }
        </div>
    )
}

export default HomePage