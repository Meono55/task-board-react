import { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card'
import '../task-card/TaskCard.css'

const TaskCard = ({ item, column }) => {


    function determinColumnColor(): string {
        let color = '';
        switch (column) {
            case 'New':
                color = 'primary'
                break;
            case 'In Progress':
                color = 'danger'
                break;
            case 'In QA':
                color = 'warning'
                break;
            default:
                color = 'success'
                break;
        }
        return color;
    }

    return (
        <Card bg={determinColumnColor()} text='white' className="taskCard">
            <Card.Body>
                <Card.Title>{item.taskTitle}</Card.Title>
                {/* <Card.Subtitle className="mb-2">{item.subTitle}</Card.Subtitle> */}
                <Card.Text>
                    {item.description}
                </Card.Text>
                {item.taskDetail && item.taskDetail.id && (<Card.Link href={`/details/${item.taskDetail.id}`}>More Detail</Card.Link>)}
            </Card.Body>
        </Card>
    )
}
export default TaskCard