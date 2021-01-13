import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useForm } from "react-hook-form";
import {v4 as uuid} from 'uuid';


const CreationForm = ({onChildClick}) => {
    const { register, handleSubmit, errors } = useForm();

    const [title, setTitle] = useState('');
    const [subTitle, setSubTitle] = useState('');
    const [text, setText] = useState('');
    const [task, setTask] = useState({
        id: '',
        title: '',
        subTitle: '',
        text: ''
    })

    function onSubmit(){
        // console.log(title,subTitle,text)
        setTask({
            id: uuid(),
            title: title,
            subTitle: subTitle,
            text: text
        })
        console.log('onSubmit', {task})
        onChildClick(task);

        
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control onChange={(e) => {setTitle(e.target.value)}} name="title" ref={register({ required: true })}  value={title} type="text" placeholder="Enter Title of Task"></Form.Control>
                {errors.title && <span>This field is required</span>}
            </Form.Group>

            <Form.Group controlId="formSubTitle">
                <Form.Label>SubTitle</Form.Label>
                <Form.Control onChange={(e) => {setSubTitle(e.target.value)}} name="subTitle" ref={register({ required: true })}  value={subTitle} type="text" placeholder="Enter SubTitle of Task"></Form.Control>
                {errors.subTitle && <span>This field is required</span>}
            </Form.Group>
            
            <Form.Group controlId="formDescription">
                <Form.Label>Task Description</Form.Label>
                <Form.Control onChange={(e) => {setText(e.target.value)}} name="description" ref={register({ required: true })}  value={text} type="text" placeholder="Enter Task Description"></Form.Control>
                {errors.description && <span>This field is required</span>}
            </Form.Group>

            <Button variant="primary" type="submit">
                Creat Task
            </Button>
        </Form>
    )
}

export default CreationForm