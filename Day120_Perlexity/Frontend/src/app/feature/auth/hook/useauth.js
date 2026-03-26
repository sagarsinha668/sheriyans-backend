import {useDispatch} from "react-redux"
import {registerApi,loginApi,getmeApi} from "../services/auth.api"
import { setUser,setLoading,setError } from "../auth.silice"


export function useAuth (){
    const dispatach = useDispatch()

    async function handleRegister({email,username,password}) {
        try{
            dispatach(setLoading(true))
            const data = await registerApi({email,username,password})
        }catch(error){
            dispatach(setError(error.response?.data?.message || "Registration Failed"))
        }finally{
            dispatach(setLoading(false))
        }
    }

    async function handleLogin({email,password}){
        try{
            dispatach(setLoading(true))
            const data = await loginApi({email,password})
            dispatach(setUser(data.user))
        }catch(error){
            dispatach(setError(error.response?.data?.message || "Login Failed"))
        }finally{
            dispatach(setLoading(false))
        }
    }

    async function handleGetMe(){
        try{
            dispatach(setLoading(true))
            const data = await getmeApi()
            dispatach(setUser(data.user))
        }catch(error){
            dispatach(setError(error.response?.data?.message || "Get Me Failed"))
        }finally{
            dispatach(setLoading(false))
        }
    }

    return {handleRegister,handleLogin,handleGetMe}
}
