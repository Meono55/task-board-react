import http2 from '../http-register'


const AuthService = () => {

    const login = (username, password) => {
        return http2.post('/authenticate', 
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

    const register = (userDetails) => {
        return http2.post('/register',
        {
            username: userDetails.username,
            password: userDetails.password,
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            email: userDetails.email,
            userRole: userDetails.userRole
        })
    }

    const getCurrentUser = () => {
        return JSON.parse(localStorage.getItem('user'))
    }

    const logout = () => {
        localStorage.removeItem('user');
    }

    return {
        login,
        logout,
        getCurrentUser,
        register
    }

}

export default AuthService