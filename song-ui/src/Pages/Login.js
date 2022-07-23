import {ErrorMessage, Field, Form, Formik} from "formik";
const Login = () => {

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

    return (
        <Formik initialValues={{
            username: '',
            password: ''
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