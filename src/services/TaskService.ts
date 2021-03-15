import http from '../http-common'

const TaskService = () => {

    const retrieveAllTasks = () => {
        return http.get("/task")
    }

    const retrieveTaskDetailById = (id) => {
        return http.get(`/task-detail/${id}`)
    }

    const  createTask = (task) => {
        return http.post('/task', {
            currentStatus: task.currentStatus,
            taskTitle: task.taskTitle,
            description: task.description,
            taskDetail: task.taskDetail,
            user: task.user,
            priority: task.priority
        });
    }

    const updateStatus = (task) => {
        console.log(task)
        return http.put('task-status', task)
    }

    return {
        retrieveAllTasks,
        retrieveTaskDetailById,
        createTask,
        updateStatus
    }

}

export default TaskService