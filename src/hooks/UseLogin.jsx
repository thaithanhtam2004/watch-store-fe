import { useState } from "react";
import axios from "axios";

export function useLogin(){
    const[loading,setLoading]= useState(false);
    const[error, setError]= useState(null);
    const[user, setUser]= useState(null);

    const login= async (email, password) => {
        setLoading(true);
        setError(null);

        try{
            const response= await axios.post(
                "http://localhost:3000/api/users/login",
                {email, password},
                {withCredentials: true}
            );
            setUser(response.data);
        }catch(err){
            const message= err.response?.data?.message||err.message||'Dang nhap that bai';
            setError(message);

        }finally{
            setLoading(false);
        }
        
        };
        return {login,loading,error,user};
}