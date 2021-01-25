import axios from 'axios'

export default axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
        "Authorization" : "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmb28iLCJleHAiOjE2MTE2MjY3ODEsImlhdCI6MTYxMTU5MDc4MX0.0ymmnhos7UBppNYhzLM6FEOht-DchErxGNICeaT4Epg"
    }
})