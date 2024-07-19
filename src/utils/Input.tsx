import React, { forwardRef } from 'react'

function Input({placeholder,className,label,type,key,...props},ref) {
  return (
       <div className='flex flex-col gap-y-2 w-full'> 

       <label htmlFor={key} className='font-normal' >{label}</label>
        <input id={key} className={`p-2 outline-none border-[#C1C1C1] border-[1px] rounded-lg   ${className}`} type={type} placeholder={placeholder} ref={ref} {...props}/>
        
        </div>
  )
}

export default forwardRef(Input)