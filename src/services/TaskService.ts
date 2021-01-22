import http from '../http-common'

const TaskService = () => {

    function retrieveAllTasks(){
        return http.get("/task")
    }

    function retrieveTaskDetailById(id){
        return http.get(`/task-detail/${id}`)
    }

    function createTask(task){
        return http.post('/task', {
            currentStatus: task.status,
            taskTitle: task.taskTitle,
            description: task.description,
            taskDetail: task.taskDetail
        });
    }

    return {
        retrieveAllTasks,
        retrieveTaskDetailById,
        createTask
    }

}

export default TaskService