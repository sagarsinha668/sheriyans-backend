import axios from "axios";

const api = axios.create({
    baseURL:"http://localhost:3000/api",
    withCredentials:true
})

export  const registerApi = async (username,email,password)=>{
    const response = await api.post("/auth/register",()=>{
        username,email,password
    })
    return console.log(response.data)
}