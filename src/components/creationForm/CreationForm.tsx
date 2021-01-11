import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Validator from '../validator/validator';
import { useForm } from "react-hook-form";
import { eventNames } from 'process';


const CreationForm = () => {
    const { register, handleSubmit, errors } = useForm();

    const [title, setTitle] = useState('');
    const [subTitle, setSubTitle] = useState('');
    const [description, setDescription] = useState('');
    // const initialErrors = {
    //     title: null,
    //     subTitle: null,
    //     description: null
    // };
    // const [errors, setErrors] = useState(initialErrors);

    function onSubmit(event){
        console.log(event)
        // event.preventDefault();
        // const formValues = {
        //     title: title,
        //     subTitle: subTitle,
        //     description: description
        // }
        // const ValidatorErrors = Validator(formValues);
        // setErrors(ValidatorErrors);
        
    }
    
    function handleOnChage(event){
        event.preventDefault();
        switch(event.target.id){
            case 'formTitle':
                setTitle(event.target.value);
                break;
            case 'formSubTitle':
                setSubTitle(event.target.value);
                break;
            case 'formDescription':
                setDescription(event.target.value);
                break;
            default:
                break;
        }
    }


    return (
        <Form onSubmit={handleSubmit(onSubmit)} onChange={handleOnChage}>
            <Form.Group controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control name="title" ref={register({ required: true })}  value={title} type="text" placeholder="Enter Title of Task"></Form.Control>
                {/* {errors.title && <p>{errors.title}</p>} */}
                {errors.title && <span>This field is required</span>}
            </Form.Group>

            <Form.Group controlId="formSubTitle">
                <Form.Label>SubTitle</Form.Label>
                <Form.Control name="subTitle" ref={register({ required: true })}  value={subTitle} type="text" placeholder="Enter SubTitle of Task"></Form.Control>
                {/* {errors.subTitle && <p>{errors.subTitle}</p>} */}
                {errors.subTitle && <span>This field is required</span>}
            </Form.Group>
            
            <Form.Group controlId="formDescription">
                <Form.Label>Task Description</Form.Label>
                <Form.Control name="description" ref={register({ required: true })}  value={description} type="text" placeholder="Enter Task Description"></Form.Control>
                {/* {errors.description && <p>{errors.description}</p>} */}
                {errors.description && <span>This field is required</span>}
            </Form.Group>

            <Button variant="primary" type="submit">
                Creat Task
            </Button>
        </Form>
    )
}

export default CreationForm