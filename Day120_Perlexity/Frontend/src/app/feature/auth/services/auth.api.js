import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

export const registerApi = async ({username, email, password}) => {
  const response = await api.post("/auth/register", {
    username,
    email,
    password,
  });
 return response.data
};

export const loginApi = async ({username,email,password})=>{
    const response = await api.post("/auth/login",{username,email,password})
    return response.data
}

export const getmeApi = async () =>{
    const response = await api.get("/auth/get-me")
    return response.data
}