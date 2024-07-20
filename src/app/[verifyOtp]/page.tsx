'use client';
import OtpInput from '@/components/OtpInput';
import { apiClient } from '@/server/api/axiosClient';
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'


let hideEmail = (emailAddress: string) => {
  let slicedEmail = emailAddress.split('@')
  let domain = slicedEmail[1]
  let hiddenEmail = slicedEmail[0]?.slice(0,2) + '***@' + domain
  return hiddenEmail
}

function VerifyOtp() {
  let [otp,setOtp] = useState('')

  //get params from url

  let queryParams = useSearchParams()
  let [error,setError] = useState('')
  let email = queryParams.get('email')
  console.log(email);
  let router = useRouter()
  const submitOtp = async() =>{
      try {
        setError('')
        console.log(otp);
        
        let response = await  apiClient.post('/user/verifyOtp',{
            otp : Number(otp),
            email : email
          })
          console.log(response);
          

          if (response.data.success) {
            router.push('/login')
          }else{
            setError(response.data.message)
          }

        
      } catch (error) {
        
      }
  }
  return (
    <div className="mx-auto flex w-full justify-center">
      <div className="flex flex-col gap-y-5 border-[1px] my-8 rounded-xl border-[#C1C1C1] px-14 py-4">
        <div className="flex items-center mx-auto justify-center text-3xl font-semibold">
          <p>Verify your email</p>
        </div>
        <div>
            <p className='font-normal mx-auto w-[80%] text-center' >Enter the 8 digit code you have received on {'  '}
            {email ? hideEmail(email) : 'your email'}</p>
        </div>

        <div className='mx-auto'>
            <OtpInput length={8} setOtp={setOtp}/>
        </div>
        {error && <p className='text-red-500 '>
          {error}
        </p>
        }
        <div className='mx-auto mt-16'>
        <button   className="bg-black text-white font-medium uppercase mx-auto rounded-md px-36 py-2 " onClick={submitOtp}>
            verify
            </button>
        </div>
        
       
      </div>
    </div>
  )
}

export default VerifyOtp