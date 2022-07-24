import {ErrorMessage, Field, Form, Formik} from "formik";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setUserData} from "../Redux/Actions";
import {saveToLocalStorage} from "../Storage/localStorage";
const Login = () => {

    const navigate = useNavigate()

    const validate = (user) => {
        const errors = {}

        if (user.username.length < 1) {
            errors.username = "Can't be blank"
        }

        if (user.password.length < 1) {
            errors.password = "Can't be blank"
        }

        if (user.repeatPassword !== user.password) {
            errors.repeatPassword = "Passwords do not match"
        }
        return errors
    }

    const dispatch = useDispatch()

    return (
        <Formik initialValues={{
            username: '',
            password: '',
            repeatPassword: ''
        }}
                onSubmit={(user, helper) => {
                    console.log(user)

                }}
                validate={validate}>
            {props => {
                return (
                    <Form>
                        <div>
                            <label>Username</label>
                            <Field name="username"/>
                            <ErrorMessage name='username'/>
                        </div>
                        <br/>
                        <div>
                            <label>Password</label>
                            <Field name="password" type="password"/>
                            <ErrorMessage name='password'/>
                            <span> </span>
                            <ErrorMessage name='repeatPassword'/>
                        </div>
                        <br/>
                        <div>
                            <label>Repeat Password</label>
                            <Field name="repeatPassword" type="password"/>
                            <ErrorMessage name='repeatPassword'/>
                        </div>
                        <div>
                            <button type="submit">Submit</button>
                        </div>
                    </Form>
                )
            }}
        </Formik>

    )
}
export default Login