'use client';
import OtpInput from '@/components/OtpInput';
import { useSearchParams } from 'next/navigation'
import React from 'react'


let hideEmail = (emailAddress: string) => {
  let slicedEmail = emailAddress.split('@')
  let domain = slicedEmail[1]
  let hiddenEmail = slicedEmail[0]?.slice(0,2) + '***@' + domain
  return hiddenEmail
}

function VerifyOtp() {

  //get params from url

  let queryParams = useSearchParams()
  let email = queryParams.get('email')
  console.log(email);
  const submitOtp = (otp) =>{
      try {
        
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
            {hideEmail(email)}</p>
        </div>

        <div className='mx-auto'>
            <OtpInput length={8} submitForm={submitOtp}/>
        </div>
        
       
      </div>
    </div>
  )
}

export default VerifyOtp