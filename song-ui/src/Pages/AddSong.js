import {Form as BootstrapForm} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {createSong, getLikedSongs} from "../API/apiEndpoints";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {ErrorMessage, Field, Formik, Form} from "formik";
import {useState} from "react";
import {saveToLocalStorage} from "../Storage/localStorage";
import {setLikedSongsinReducer, setUserData} from "../Redux/Actions";


const AddSong = () => {

    const [result, setResult] = useState(null)

    const user = useSelector(state => state.user)

    const {t} = useTranslation("songTable")


    const validate = (song) => {
        const errors = {}

        if (song.songName.length < 1) {
            errors.songName = t("errors:blank")
        }

        if (song.albumString.length < 1) {
            errors.albumString = t("errors:blank")
        }

        if (song.authorString.length < 1) {
            errors.authorString = t("errors:blank")
        }

        if (song.playtime.length < 1) {
            errors.playtime = t("errors:blank")
        }
        return errors
    }

    const handleResult = (result) => {
        setResult(result)
    }


    return (<>
            {user.roles.includes("ROLE_ADMIN") &&
                <Formik initialValues={{
                    songName: '',
                    albumString: '',
                    authorString: '',
                    playtime: '',
                }}
                        onSubmit={(song, helper) => {
                            createSong(song).then(()=>{
                                handleResult("success")
                            }).catch(()=>{
                                handleResult("error")
                            })
                        }}
                        validate={validate}>
                    {props => {
                        return (
                            <Form>
                                <ErrorMessage name='songName'/>
                                <Field name='songName'>
                                    {({field, form}) => {
                                        return (
                                            <BootstrapForm.Group className="mb-3" controlId="name">
                                                <BootstrapForm.Label>{t("songName")}</BootstrapForm.Label>
                                                <BootstrapForm.Control type="text"
                                                                       placeholder={t("placeholders:songName")}
                                                                       name='songName'
                                                                       onChange={field.onChange}

                                                />
                                            </BootstrapForm.Group>
                                        )
                                    }}
                                </Field>

                                <ErrorMessage name='albumString'/>
                                <Field name='albumString'>
                                    {({field, form}) => {
                                        return (
                                            <BootstrapForm.Group className="mb-3" controlId="album">
                                                <BootstrapForm.Label>{t("album")}</BootstrapForm.Label>
                                                <BootstrapForm.Control type="text"
                                                                       placeholder={t("placeholders:album")}
                                                                       name='albumString'
                                                                       onChange={field.onChange}

                                                />
                                                <BootstrapForm.Text className="text-muted">
                                                    Enter multiple with ;
                                                </BootstrapForm.Text>
                                            </BootstrapForm.Group>
                                        )
                                    }}
                                </Field>

                                <ErrorMessage name='authorString'/>
                                <Field name='authorString'>
                                    {({field, form}) => {
                                        return (
                                            <BootstrapForm.Group className="mb-3" controlId="author">
                                                <BootstrapForm.Label>{t("author")}</BootstrapForm.Label>
                                                <BootstrapForm.Control type="text"
                                                                       placeholder={t("placeholders:author")}
                                                                       name='authorString'
                                                                       onChange={field.onChange}

                                                />
                                                <BootstrapForm.Text className="text-muted">
                                                    Enter multiple with ;
                                                </BootstrapForm.Text>
                                            </BootstrapForm.Group>
                                        )
                                    }}
                                </Field>

                                <ErrorMessage name='playtime'/>
                                <Field name='playtime'>
                                    {({field, form}) => {
                                        return (
                                            <BootstrapForm.Group className="mb-3" controlId="playtime">
                                                <BootstrapForm.Label>{t("playtime")}</BootstrapForm.Label>
                                                <BootstrapForm.Control type="text"
                                                                       placeholder={t("placeholders:playtime")}
                                                                       name='playtime'
                                                                       onChange={field.onChange}

                                                />
                                            </BootstrapForm.Group>
                                        )
                                    }}
                                </Field>
                                <Button variant="primary" type="submit">
                                    {t("common:submit")}
                                </Button>


                            </Form>)
                    }}
                </Formik>

            }
            {result &&
                <span>{t("common:"+result)}</span>
            }
        </>
    )
}
export default AddSong

