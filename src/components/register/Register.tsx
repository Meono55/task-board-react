import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useForm } from "react-hook-form";
import { useState } from 'react';
import '../register/Register.css';
import AuthService from "../../services/AuthServices";



const authService = AuthService();

const Register = () => {
    const { register, handleSubmit, errors } = useForm();
    const [userDetails, setUserDetails] = useState({
        username: '',
        password: '',
        email: '',
        firstName: '',
        lastName: '',
        userRole: 'DEVELOPER',
    })

    const onSubmit = () => {
        if (Object.keys(errors).length === 0) {
            authService.register(userDetails);
            console.log(userDetails)
        }
    }

    const handleInputChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        setUserDetails((user) => ({
            ...user,
            [name]: value
        }))
    }


    return (
        <div>
            <h2>*Please Enter the provided information to Register an account!</h2>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group controlId="formFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control onChange={handleInputChange} name="firstName" ref={register({ required: true })} type="text" placeholder="Enter your first name"></Form.Control>
                    {errors.firstName && <span className="formError">This field is required</span>}
                </Form.Group>

                <Form.Group controlId="formLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control onChange={handleInputChange} name="lastName" ref={register({ required: true })} type="text" placeholder="Enter your last name"></Form.Control>
                    {errors.lastName && <span className="formError">This field is required</span>}
                </Form.Group>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control onChange={handleInputChange} name="email" ref={register({ required: true })} type="email" placeholder="Enter an email"></Form.Control>
                    {errors.email && <span className="formError">This field is required</span>}
                </Form.Group>
                <Form.Group controlId="formUserRole">
                    <Form.Label>Select Your Role</Form.Label>
                    <Form.Control as="select" onChange={handleInputChange} name="userRole" ref={register({ required: true })}>
                        <option>DEVELOPER</option>
                        <option>QA</option>
                        <option>PM</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control onChange={handleInputChange} name="username" ref={register({ required: true })} type="text" placeholder="Enter a username"></Form.Control>
                    {errors.username && <span className="formError">This field is required</span>}
                </Form.Group>
                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={handleInputChange} name="password" ref={register({ required: true })} type="password" placeholder="Enter a password"></Form.Control>
                    {errors.password && <span className="formError">This field is required</span>}
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )


}

export default Register