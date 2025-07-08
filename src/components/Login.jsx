import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from 'react-redux';
import { setAuthUser } from '../redux/userSlice';

export default function Login() {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const {authUser} = useSelector(store=>store.user);
   
   useEffect(() => {  
      if (authUser) {
         navigate("/");
      }
   }, [authUser]);

   const [user, setUser] = useState({
      username: "",
      password: "",
   });
   
   const onSubmitHandler = async (e) => {
   e.preventDefault();
   try {
      const res = await axios.post(`http://localhost:8000/api/v1/user/login`, user, {
         headers: {
            'Content-Type': 'application/json'
         },
         withCredentials: true
      });

      dispatch(setAuthUser(res.data));
      navigate("/");
   } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "Login failed");
   }

   setUser({
      username: "",
      password: "",
   });
};


   
   return (
      <div className="min-h-screen">
      <div className="rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-0 border border-gray-100 p-3 flex justify-center items-center flex-col h-fit my-24 sm:m-28">
         <h1 className="underline text-2xl text-white font-bold">Login</h1>
         <form onSubmit={onSubmitHandler} action="" className="">
            <div className="flex flex-col my-2">
               <label htmlFor="name" className="label-text text-white">Username:</label>
               <input type="text" id="name" className="input input-bordered rounded-md text-sm h-8 w-full" placeholder="Enter your username" value={user.username} onChange={(e) => setUser({...user,username:e.target.value})} />
            </div>
            <div className="flex flex-col my-2">
               <label htmlFor="password" className="label-text text-white">Password:</label>
               <input type="password" id="password" className="input input-bordered rounded-md text-sm h-8 w-full" placeholder="Enter your password" value={user.password} onChange={(e) => setUser({...user,password:e.target.value})} />
            </div>
            <div className="label-text text-white">
               Don't have an account?
               <NavLink to="/register" className="text-purple-400 underline"> Signup</NavLink>
            </div>
            <button type="submit" className="btn btn-block btn-sm md-1 mt-2">Login</button>
            
         </form>
      </div>
      </div>
   );
}
