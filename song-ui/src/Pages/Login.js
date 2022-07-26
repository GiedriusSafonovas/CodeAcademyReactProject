import {ErrorMessage, Field, Form, Formik} from "formik";
import {getLikedSongs, login} from "../API/apiEndpoints";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setLikedSongsinReducer, setUserData} from "../Redux/Actions";
import {saveToLocalStorage} from "../Storage/localStorage";
import {useTranslation} from "react-i18next";
const Login = () => {

    const navigate = useNavigate()

    const { t } = useTranslation("user")

    const validate = (user) => {
        const errors = {}

        if (user.username.length < 1) {
            errors.username = t("errors:blank")
        }

        if (user.password.length < 1) {
            errors.password = t("errors:blank")
        }
        return errors
    }

    const dispatch = useDispatch()

    return (
        <Formik initialValues={{
            username: '',
            password: ''
        }}
                onSubmit={(user, helper) => {
                    login({
                        username: user.username,
                        password: user.password
                    }).then((response)=>{
                        saveToLocalStorage('user', response.data)
                        dispatch(setUserData(response.data))
                        getLikedSongs(response.data.username).then((response) => {
                            dispatch(setLikedSongsinReducer(response.data))
                            navigate("/")
                        })
                        })
                }}
                validate={validate}>
            {props => {
                return (
                        <Form>
                            <div>
                                <label>{t("username")}</label>
                                <Field name="username"/>
                                <ErrorMessage name='username'/>
                            </div>
                            <br/>
                            <div>
                                <label>{t("password")}</label>
                                <Field name="password" type="password"/>
                                <ErrorMessage name='password'/>
                            </div>
                            <div>
                                <button type="submit">{t("common:submit")}</button>
                            </div>
                        </Form>
                )
            }}
        </Formik>

    )
}
export default Login