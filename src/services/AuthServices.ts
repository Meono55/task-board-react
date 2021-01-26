import http from '../http-common'


const AuthService = () => {

    const login = (username, password) => {
        return http.post('/authenticate', 
        {
            username: username,
            password: password
        }).then((response) => {
            if(response && response.data && response.data.jwt){
                localStorage.setItem('user', JSON.stringify(response.data))
            }

            return response.data;
        })
    }

    const getCurrentUser = () => {
        return JSON.parse(localStorage.getItem('user'))
    }

    return {
        login,
        getCurrentUser
    }

}

export default AuthService