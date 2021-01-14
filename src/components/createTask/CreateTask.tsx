import React from 'react'
import Button from 'react-bootstrap/Button'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import CreationForm from '../creationForm/CreationForm'
import '../createTask/CreateTask.css'

const CreateTask = ({onParentClick}) => {

    const popOver = (
        <Popover id="popover-basic">
            <Popover.Title as="h3">Create Task</Popover.Title>
            <Popover.Content>
                <CreationForm onChildClick={onParentClick}/>
            </Popover.Content>
        </Popover>
    );

    return (
        <div className="creationButton">
            <OverlayTrigger trigger="click" rootClose placement="right" overlay={popOver}>
                <div className="creationButton">
                    <Button variant="success">+</Button>
                </div>
            </OverlayTrigger>
        </div>

    )
}

export default CreateTask