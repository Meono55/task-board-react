import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useForm } from "react-hook-form";
import {v4 as uuid} from 'uuid';


const CreationForm = ({onChildClick}) => {
    const { register, handleSubmit, errors } = useForm();
    const [task, setTask] = useState({
        id: '',
        taskTitle: '',
        description: '',
        status: 'NEW',
        taskDetail: {}
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
            <Form.Group controlId="formtaskTitle">
                <Form.Label>Task Title</Form.Label>
                <Form.Control onChange={handleInputChange} name="taskTitle" ref={register({ required: true })}  value={task.taskTitle} type="text" placeholder="Enter Title of Task"></Form.Control>
                {errors.taskTitle && <span>This field is required</span>}
            </Form.Group>
            
            <Form.Group controlId="formDescription">
                <Form.Label>Task Description</Form.Label>
                <Form.Control onChange={handleInputChange} name="description" ref={register({ required: true })}  value={task.description} type="text" placeholder="Enter Task Description"></Form.Control>
                {errors.description && <span>This field is required</span>}
            </Form.Group>

            <Button variant="primary" type="submit">
                Creat Task
            </Button>
        </Form>
    )
}

export default CreationForm