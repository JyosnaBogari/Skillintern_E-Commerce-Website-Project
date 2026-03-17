import axios from 'axios';
import { create } from 'zustand';

export const useAuth = create((set) => ({
    currentUser: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    login: async (userCredWithRole) => {
        const { role, ...userCredObj } = userCredWithRole;
        try {
            //set loading true
            set({ loading: true, error: null });
            //make API call
            let res = await axios.post('http://localhost:3000/common-api/authenticate', userCredObj,{withCredentials:true});
            console.log("res is", res);

            //after login set loading to false ,and display the user details
            set({
                loading: false,
                currentUser: res.data.payload,
                isAuthenticated: true
            });
        } catch (err) {
            console.log("err is", err.message);
            set({
                loading: false,
                currentUser: null,
                error:err.response?.data?.error || "Login Failed",
                isAuthenticated: false
            })
        }
    },
    logout:async()=>{
        try{
     set({ loading: true, error: null });
            //make API call
            await axios.get('http://localhost:3000/common-api/logout',{withCredentials:true});
            
            //update state 
             set({
                loading: false,
                currentUser: null,
                isAuthenticated: false
            });

        }catch(err)
        {
            console.log("err is", err.message);
            set({
                loading: false,
                currentUser: null,
                error:err.response?.data?.error || "Logout Failed",
                isAuthenticated: false
            })
        }
    }
}))