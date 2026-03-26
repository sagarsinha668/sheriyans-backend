import {configureStore} from "@reduxjs/toolkit"
import authReduce from "./feature/auth/auth.silice"

export const store = configureStore({
    reducer:{
        auth: authReduce,
        
    }
})