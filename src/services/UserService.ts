import http from '../http-common'


const UserService = () => {

    const getAllUsers = () => {
        return http.get('/user');
    }

    return {
        getAllUsers
    }
}

export default UserService