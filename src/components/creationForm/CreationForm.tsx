import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useForm } from "react-hook-form";
import '../creationForm/CreationForm.css';
import UserDropDown from '../useDropDown/UserDropDown';

const CreationForm = ({onChildClick}) => {
    const { register, handleSubmit, errors } = useForm();
    const [task, setTask] = useState({
        taskTitle: '',
        description: '',
        priority: 'LOW',
        status: 'NEW',
        taskDetail: {},
        user: {}
    })

    const onSubmit = () => {
        if(!errors.taskTitle && !errors.description){
            onChildClick(task);
        }
    }

    const handleInputChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        setTask(task => ({
            ...task,
            [name]:value
        }))
    }

    const handleSelectedUser = (selectedUser) => {
        setTask(task => ({
            ...task,
            ['user']: selectedUser
        }))
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="formtaskTitle">
                <Form.Label>Task Title</Form.Label>
                <Form.Control onChange={handleInputChange} name="taskTitle" ref={register({ required: true })}  value={task.taskTitle} type="text" placeholder="Enter Title of Task"></Form.Control>
                {errors.taskTitle && <span className="formError">This field is required</span>}
            </Form.Group>
            
            <Form.Group controlId="formDescription">
                <Form.Label>Task Description</Form.Label>
                <Form.Control onChange={handleInputChange} name="description" ref={register({ required: true })}  value={task.description} type="text" placeholder="Enter Task Description"></Form.Control>
                {errors.description && <span className="formError">This field is required</span>}
            </Form.Group>
            <Form.Group controlId="formPriority">
                    <Form.Label>Select Task Priority</Form.Label>
                    <Form.Control as="select" onChange={handleInputChange} name="priority" ref={register({ required: true })}>
                        <option>LOW</option>
                        <option>MID</option>
                        <option>HIGH</option>
                    </Form.Control>
            </Form.Group>
            <div>
                <UserDropDown onSelectedUser={handleSelectedUser}/>
            </div>
            <Button variant="primary" type="submit">
                Creat Task
            </Button>
        </Form>
    )
}

export default CreationForm