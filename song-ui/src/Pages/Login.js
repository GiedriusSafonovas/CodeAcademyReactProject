import {ErrorMessage, Field, Form, Formik} from "formik";
import {login} from "../API/apiEndpoints";
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
        return errors
    }

    const dispatch = useDispatch()

    return (
        <Formik initialValues={{
            username: '',
            password: ''
        }}
                onSubmit={(user, helper) => {
                    console.log(user)
                    login({
                        username: user.username,
                        password: user.password
                    }).then((response)=>{
                        console.log(response)
                        saveToLocalStorage('user', response.data)
                        dispatch(setUserData(response.data))
                        navigate("/songlist")})
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