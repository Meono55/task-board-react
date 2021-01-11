import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const CreationForm = () => {
    
    return (
        <Form>
            <Form.Group controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Enter Title of Task"></Form.Control>
            </Form.Group>

            <Form.Group controlId="formSubTitle">
                <Form.Label>SubTitle</Form.Label>
                <Form.Control type="text" placeholder="Enter SubTitle of Task"></Form.Control>
            </Form.Group>
            
            <Form.Group controlId="formDescription">
                <Form.Label>Task Description</Form.Label>
                <Form.Control type="text" placeholder="Enter Task Description"></Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit">
                Creat Task
            </Button>
        </Form>
    )
}

export default CreationForm