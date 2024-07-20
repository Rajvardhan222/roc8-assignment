"use client";
import { apiClient } from "@/server/api/axiosClient";
import Input from "@/utils/Input";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

function SIgnup() {
  const { handleSubmit, register } = useForm();
  let router = useRouter();
  let [errorMessage,setErrorMessage] = useState()
  let [loading,setLoading] = useState(false)

  const createAccount = async (data) => {
    const { name, email, password } = data;
    console.log('creating account ',name);
    
    setLoading(true)
    setErrorMessage('')
        try {
           let data = await apiClient.post('/user/create',{
                name,
                email,
                password
            })
            console.log(data);
            

            if (data.data.success) {
                router.push(`/verifyOtp?email=${email}`);
            } else {
                setErrorMessage(data.message)
            }
        } catch (error) {
            setErrorMessage(error.message)
        }
        setLoading(false)
}

  return (
    <div className="mx-auto flex w-full justify-center">
      <div className="flex flex-col border-[1px] my-8 rounded-xl border-[#C1C1C1] px-14 py-4">
        <div className="flex items-center justify-center text-3xl font-semibold">
          <p>Create your account</p>
        </div>
        <form className="flex flex-col items-center gap-y-5 my-6" onSubmit={
            handleSubmit(createAccount)
        
          
            }>
          
            <Input
              {...register("name", {
                required: true,
                minLength: 3,
                maxLength: 30,
              })}
              label="Name"
              placeholder="Enter your name"
              className="my-input-class"
              type="text"
              key="name"
            />
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
          Create account
          </button>
        </form>
        <div className="mx-auto">
            <p className="text-[#333333] ">Have an Account? <span className="cursor-pointer font-semibold" 
            onClick={()=>{
                router.push('/login')
            }}
            >Login</span></p>
        </div>
      </div>
    </div>
  );
}

export default SIgnup;
