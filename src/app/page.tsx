'use client';
import Category from "@/components/Category";
import UserContextProvider, { useUser } from "@/components/userContext/context";
import { apiClient } from "@/server/api/axiosClient";
import { debounce } from "@/utils/debounce";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HomePage() {
  let {user,setUser} = useUser()
let router = useRouter()
let [skip,setSkip] = useState(0)
let [pageInResponse,setPageInResponse] = useState(0)
let [responseCategory,setResponseCategory] = useState([])
let [hasNextPage,setHasNextPage] = useState(true)
let verifyAccessToken = async () => {
  let data = await apiClient.get('/user/verifyAccessToken')
  console.log(data);
  
  if(data.data.success){
      setUser(prev => {
        return {...prev,isLoggedIn: true,name : data.data.data.name,email : data.data.data.email,id:data.data.data.id}
      })
    router.push('/')
  }else{
    router.push('/signup')
  }
}


      let getAllCategory = async () => {
      let responseCategoryresult =await  apiClient.get(`/categories/getCategories?skip=${skip}`)
      console.log(responseCategoryresult);
      if(responseCategoryresult.data.success){
        setResponseCategory([])
        setResponseCategory(responseCategoryresult.data.response.page)
        setHasNextPage(responseCategoryresult.data.response.hasNextPage)
        console.log(responseCategoryresult.data.response.page);
        
      }
      }

  useEffect(() => {

  verifyAccessToken()

  }, [router])

  useEffect(() => {
   getAllCategory()
  }, [skip])
  
  return (
    <main>
     <div className='w-full flex items-center justify-center'>
        <div className=' flex flex-col border-[1px] my-8 rounded-xl border-[#C1C1C1] px-20 py-10 gap-y-9'>
            <div className="flex flex-col items-center mx-auto gap-y-4">
              <h3 className="font-bold text-2xl">Please mark your interests!</h3>
              <p>We will keep you notified.</p>
            </div>
            <div className="flex flex-col gap-y-3 items-start">
                  <p className="font-medium text-xl">My saved interests!</p>
                  <div className="flex flex-col gap-y-3 ">
                          {/* <Category marked='true' name='shoes' id={'id'} /> */}

                          {
                          responseCategory &&  responseCategory?.map((category,index) => (
                              <Category key={category.id} marked={category.liked} name={category.name}  id={category.id}/>
                            ))
                          }
                  </div>
            </div>
            <div className="flex gap-x-6">
              <div className={!(skip/6 > 0) ? "text-gray-400" : ""} onClick={()=>{
                if(skip/6 > 0){
                  setSkip(prev=>prev - 6)
                }
              }} >&lt;</div>
              <div >{(skip/6)+1}</div>
              <div className={hasNextPage ? "" : "text-gray-400"}  onClick={()=>{
                if(hasNextPage){
                  setSkip(prev=>prev + 6)
                }
              }}>&gt;</div>
            </div>
        </div>
        
    </div>
    </main>
  );
}
