import {createSlice} from "@reduxjs/toolkit"

const chatSlice = createSlice({
    name:"chat",
    initialState:{
        chats:{},
        currentChatId:null,
        isLoading:false,
        error:null
    },

    reducers:{
        setChats:(state,action)=>{
            state.chats = action.payload
        },
        setCurrentChatId:(state,action)=>{
            currentChatId.state = action.payload
        },
        setIsLoading:(state,action)=>{
            isLoading.state = action.payload
        },
        setError:(state,action)=>{
            error.state = action.payload
        }
    }
})

export const {setChats,setCurrentChatId,setIsLoading,setError} = chatSlice.actions

export default chatSlice.reducer