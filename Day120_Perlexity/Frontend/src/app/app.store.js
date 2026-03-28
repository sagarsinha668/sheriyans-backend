import {configureStore} from "@reduxjs/toolkit"
import authReduce from "./feature/auth/auth.silice"
import chatSlice from "./feature/chat/chat.silice" 

export const store = configureStore({
    reducer:{
        auth: authReduce,
        chat:chatSlice
    }
})