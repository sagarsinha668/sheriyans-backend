import { initializedSocketConnection } from "../services/chat.socket";
import{useDispatch}from "react-redux"
import { sendMessage,getChats,getMessage,deleteChat } from "../services/chat.api";
import { setChats,setIsLoading,setCurrentChatId,setError } from "../chat.silice";
import { setLoading } from "../../auth/auth.silice";
export const useChat = () => {

    const dispatch = useDispatch()

    async function handleSendMessage({message,chatId}){
        dispatch(setLoading(true))
        const data = await sendMessage({message,chatId})
        
    }

    return {
        initializedSocketConnection
    }
};