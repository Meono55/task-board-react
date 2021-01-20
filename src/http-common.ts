import axios from 'axios'

export default axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
        "Authorization" : "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmb28iLCJleHAiOjE2MTExOTg1NzEsImlhdCI6MTYxMTE2MjU3MX0.esQWGCnasloM2M9zEeqgK5ackVXZU1zCRtQip9hYHQo"
    }
})