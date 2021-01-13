import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useForm } from "react-hook-form";
import {v4 as uuid} from 'uuid';


const CreationForm = ({onChildClick}) => {
    const { register, handleSubmit, errors } = useForm();
    const [task, setTask] = useState({
        id: '',
        title: '',
        subTitle: '',
        text: ''
    })

    function onSubmit(){
        onChildClick(task);
    }

    function handleInputChange(e){
        const target = e.target;
        const value = target.value;
        const name = target.name;

        setTask(task => ({
            ...task,
            [name]:value
        }))
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control onChange={handleInputChange} name="title" ref={register({ required: true })}  value={task.title} type="text" placeholder="Enter Title of Task"></Form.Control>
                {errors.title && <span>This field is required</span>}
            </Form.Group>

            <Form.Group controlId="formSubTitle">
                <Form.Label>SubTitle</Form.Label>
                <Form.Control onChange={handleInputChange} name="subTitle" ref={register({ required: true })}  value={task.subTitle} type="text" placeholder="Enter SubTitle of Task"></Form.Control>
                {errors.subTitle && <span>This field is required</span>}
            </Form.Group>
            
            <Form.Group controlId="formDescription">
                <Form.Label>Task Description</Form.Label>
                <Form.Control onChange={handleInputChange} name="text" ref={register({ required: true })}  value={task.text} type="text" placeholder="Enter Task Description"></Form.Control>
                {errors.description && <span>This field is required</span>}
            </Form.Group>

            <Button variant="primary" type="submit">
                Creat Task
            </Button>
        </Form>
    )
}

export default CreationForm