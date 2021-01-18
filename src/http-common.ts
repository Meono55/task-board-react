import axios from 'axios'

export default axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
        "Authorization" : "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmb28iLCJleHAiOjE2MTEwMzk5NTYsImlhdCI6MTYxMTAwMzk1Nn0.EAOeCmKwZSQlp9mSshokQSCBLigFOyNE6j0Ot67DygY"
    }
})