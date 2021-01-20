import http from '../http-common'

const TaskService = () => {

    function retrieveAllTasks(){
        return http.get("/task")
    }

    function retrieveTaskDetailById(id){
        return http.get(`/task-detail/${id}`)
    }

    return {
        retrieveAllTasks,
        retrieveTaskDetailById
    }

}

export default TaskService