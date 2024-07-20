"use client";
import { useUser } from "@/components/userContext/context";
import { apiClient } from "@/server/api/axiosClient";
import Input from "@/utils/Input";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
function Login() {
    const { handleSubmit, register } = useForm();
    let router = useRouter();
    let [errorMessage,setErrorMessage] = useState()
    let [loading,setLoading] = useState(false)
  let {user,setUser} = useUser()
    const login = async (data) => {
      const {  email, password } = data;
      console.log('creating account ',name);
      
      setLoading(true)
      setErrorMessage('')
          try {
            let response = await apiClient.post('/user/login',{
                email,
                password,
 
             })
             console.log(response);
             

             if(response.data.success){
                setUser(prev => {
                    return {
                     ...prev,
                     id : response.data.id,
                     name : response.data.name,
                     email : response.data.email,
                     isLoggedIn : true,
                    }
  
                })

                
                 router.push('/')
             }
          } catch (error) {
              setErrorMessage(error.message)
          }
          setLoading(false)
  }
  
    return (
      <div className="mx-auto flex w-full justify-center">
        <div className="flex flex-col border-[1px] my-8 rounded-xl border-[#C1C1C1] px-32 py-10">
          <div className="flex items-center gap-y-2 flex-col justify-center  font-semibold">
            <p className="text-3xl">Login</p>
            <p className="font-medium text-xl">Welcome back to ECOMMERCE</p>
            <p className="font-normal">The next gen business marketplace</p>
          </div>
          <form className="flex flex-col items-center gap-y-5 my-6" onSubmit={
              handleSubmit(login)
          
            
              }>
            
            
              <Input
                {...register("email", {
                  required: true,
                  minLength: 3,
                  maxLength: 30,
                })}
                label="Email"
                placeholder="Enter your email"
                className="my-input-class"
                type="email"
                key="email"
              />
              <Input
                {...register("password", {
                  required: true,
                  minLength: 3,
                  maxLength: 30,
                })}
                label="password"
                placeholder="Enter your password"
                className="my-input-class"
                type="password"
                key="password"
              />
  
              {errorMessage && (
                <div className="text-red-500 text-xs my-2">{errorMessage}</div>
              )}
            
            <button type="submit" disabled={loading} className="bg-black text-white font-medium uppercase rounded-md px-20 py-2 ">
            Login
            </button>
          </form>
          <div className="mx-auto">
              <p className="text-[#333333] ">Don’t have an Account? <span className="cursor-pointer font-semibold" 
              onClick={()=>{
                  router.push('/signup')
              }}
              >Signup</span></p>
          </div>
        </div>
      </div>
    );
}

export default Login