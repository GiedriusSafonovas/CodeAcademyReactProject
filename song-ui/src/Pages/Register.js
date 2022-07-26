import {ErrorMessage, Field, Form, Formik} from "formik";
import {useNavigate} from "react-router-dom";
import {registerNewUser} from "../API/apiEndpoints";
import {useTranslation} from "react-i18next";

const Login = () => {

    const { t } = useTranslation("user")

    const navigate = useNavigate()

    const validate = (user) => {
        const errors = {}

        if (user.username.length < 1) {
            errors.username = t("errors:blank")
        }

        if (user.password.length < 1) {
            errors.password = t("errors:blank")
        }

        if (user.repeatPassword !== user.password) {
            errors.repeatPassword = t("errors:password.compare")
        }
        return errors
    }

    return (
        <Formik initialValues={{
            username: '',
            password: '',
            repeatPassword: ''
        }}
                onSubmit={(user, helper) => {
                    registerNewUser({
                        userName: user.username,
                        password: user.password,
                    }).then((response)=>{
                        navigate("/songlist")})
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
                            <span> </span>
                            <ErrorMessage name='repeatPassword'/>
                        </div>
                        <br/>
                        <div>
                            <label>{t("repeat.password")}</label>
                            <Field name="repeatPassword" type="password"/>
                            <ErrorMessage name='repeatPassword'/>
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