import { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card'
import '../task-card/TaskCard.css'

const TaskCard = ({ item }) => {


    const determinColumnColor = (): string => {
        let color = '';
        switch (item.priority) {
            case 'LOW':
                color = 'primary'
                break;
            case 'HIGH':
                color = 'danger'
                break;
            default:
                color = 'warning'
                break;
        }
        return color;
    }

    return (
        <Card bg={determinColumnColor()} text='white' className="taskCard">
            <Card.Body>
                <Card.Title>Title: {item.taskTitle}</Card.Title>
                <Card.Text>
                    <span>Description: {item.description}</span>
                </Card.Text>
                {item.taskDetail && item.taskDetail.id && (<Card.Link href={`/details/${item.taskDetail.id}`}>More Detail</Card.Link>)}
            </Card.Body>
        </Card>
    )
}
export default TaskCard