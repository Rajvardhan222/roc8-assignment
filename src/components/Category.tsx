'use client';
import { apiClient } from '@/server/api/axiosClient';
import React, { useEffect, useState } from 'react'

function Category({marked,name,id}) {
    let [checked,setChecked] = useState(marked)
    let toogleLikedCategory = async () => {
        let toogleResponse = await apiClient.post('/categories/updateFavCategories',{
            categoryId : id
        })
        console.log('toogleResponse', toogleResponse);
        
    }

    useEffect(() => {
        setChecked(marked)
    }, [marked])
    
  return (
    <div>
        <label htmlFor={id} className='flex items-center gap-x-4'>
        <input id={id} type="checkbox" className='' checked={checked} onClick={() => setChecked(prev => !prev)} value={id} onChange={()=>{toogleLikedCategory()}} />
       <p> {name}</p>
        </label>
        

        </div>
  )
}

export default Category