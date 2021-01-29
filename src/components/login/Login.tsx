import { useForm } from "react-hook-form";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from "react";
import '../login/Login.css'
import {useHistory} from 'react-router-dom';
import AuthService from "../../services/AuthServices";

const authService = AuthService();

const Login = () => {

    const { register, handleSubmit, errors } = useForm();
    const [errorMessage, setErrorMessage] = useState('');
    const history = useHistory();
    const [loginCredentials, setLoginCredentials] = useState({
        username: '',
        password: ''
    })

    const onSubmit = () => {
        if(!errors.username && !errors.password){
            authService.login(loginCredentials.username, loginCredentials.password).then(
                () => {
                    history.push('/taskboard');
                    window.location.reload();
                }, (error) => {
                    setErrorMessage('Invalid username or Password')
                }
            )
        }
    }

    const onRegisterClick = () => {
        history.push('/register')
    }

    const handleInputChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        setLoginCredentials({
            ...loginCredentials,
            [name] : value
        })

    }

    return(
        <div>
        {errorMessage && <p className="errorMessage">{errorMessage}</p>}
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="formPassword">
                <Form.Label>Username</Form.Label>
                <Form.Control onChange={handleInputChange} name="username" ref={register({ required: true })}   type="text" placeholder="Enter Username"></Form.Control>
                {errors.username && <span className="formError">This field is required</span>}
            </Form.Group>
            
            <Form.Group controlId="formUserName">
                <Form.Label>Password</Form.Label>
                <Form.Control onChange={handleInputChange} name="password" ref={register({ required: true })}   type="password" placeholder="Enter Password"></Form.Control>
                {errors.password && <span className="formError">This field is required</span>}
            </Form.Group>

            <Button variant="primary" type="submit">
                Login
            </Button>
            <div className="signUpButton">
            <Button variant="secondary" onClick={onRegisterClick}>Sign Up</Button>
            </div>
        </Form>
        </div>
    )

}

export default Login