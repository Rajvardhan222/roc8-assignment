'use client';
import UserContextProvider, { useUser } from "@/components/userContext/context";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  let {user} = useUser()
let router = useRouter()
  useEffect(() => {
   if(!user.isLoggedIn){
    router.push('/signup')
   }
  }, [user])
  
  return (
    <main>
     
    </main>
  );
}
