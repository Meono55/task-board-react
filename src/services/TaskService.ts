import http from '../http-common'

const TaskService = () => {

    function retrieveAllTasks(){
        return http.get("/task-detail")
    }

    return {
        retrieveAllTasks
    }

}

export default TaskService