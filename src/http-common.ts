import axios from 'axios'

export default axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
        "Authorization" : "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmb28iLCJleHAiOjE2MTEzODQ3OTAsImlhdCI6MTYxMTM0ODc5MH0.gx98jlJYJKXNae2VLr-Veis5TpP-kmE_D_4N9hB0JMs"
    }
})