import { db } from "@/server/db";
import { NextRequest ,NextResponse} from "next/server";
import jwt from 'jsonwebtoken'
export const GET = async (req : NextRequest) =>{
    try {
        const secret = process.env.JWT_SECRET;
       
        if (!secret) {
          throw new Error('JWT_SECRET is not defined in the environment variables');
        }
        let token = req.cookies.get('accessToken')?.value

           let userId = jwt.verify(token,secret)
            console.log(userId);
            
           let user = await db.user.findUnique({where:{id:userId.userId},select : {
            id : true,
            name :true,
            email :true,
           }})

           if(!user){
            return NextResponse.json({
                status :404,
                success : false,
                message : "Invalid Token"
            })
           }

           return NextResponse.json({
            status : 200,
            success : true,
            data : user
        })
    } catch (error) {
        return NextResponse.json({
            status : 500,
            success : false,
            message : "Something went wrong while checking token"
        })
    }
}