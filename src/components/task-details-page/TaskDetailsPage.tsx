import { useEffect, useState } from "react"
import TaskService from "../../services/TaskService"


const taskService = TaskService();

const TaskDetailPage = ({match:{params:{id}}}) => {

    const [taskDetail, setTaskDetail] = useState({
        id: null,
        acceptanceCriteria: ''
    })
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        getTaskDetailById(id);
    }, [])

    const getTaskDetailById = (id) => {
        taskService.retrieveTaskDetailById(id).then((response) => {
            if(response && response.data) {
                setTaskDetail(response.data);
                setLoading(false);
            }
        })
    }

    if(!loading) {
        return (
            <div>
                <h1>HELLO, This is the basic acceptance Criteria Page</h1>
                <p>{taskDetail.acceptanceCriteria}</p>
            </div>
        )
    } else {
        return (
            <p>Loading.....</p>
        )
    }
    
}
export default TaskDetailPage