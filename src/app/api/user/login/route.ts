import { db } from "@/server/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { boolean } from "zod";
export const POST = async (req : NextRequest) => {
    try {
        const secret = process.env.JWT_SECRET;
       
        if (!secret) {
          throw new Error('JWT_SECRET is not defined in the environment variables');
        }
        const input = await req.json()
        const {email, password} = input;
        
        if (!(email, password)) {
           return NextResponse.json( {
                status: 'error',
                message: 'Please provide email and password',
                success: false
            })
        }

        let user = await  db.user.findUnique({
            where: {
                email : email,
            },
            select : {
               email : true,
               id : true,
               name : true,
               isVerified : true,
               password :true
            }
        })
        console.log(user);
        

        if (!user) {
            return NextResponse.json(  {
                status: 'error',
                message: 'User not found',
                success: false
            })
           
        }
        if(!user?.isVerified ){
            return NextResponse.json( {
                status: 'error',
                message: 'Please verify your email first',
                success: false
            })
        }

       let isPasswordCorrect = bcrypt.compareSync(password, user.password)
       console.log(isPasswordCorrect);
       

       if (!isPasswordCorrect) {
           return NextResponse.json( {
               status: 'error',
               message: 'Invalid password',
               success: false

           })
           
       }

       let token = jwt.sign({ userId: user.id }, secret, { expiresIn: '1h' });

      let updateToken =await db.user.update({
        where:{
            id: user.id
        },
        data:{
            accessToken: token
        }
       })



        let response = NextResponse.json( {
            status:'success',
            message: 'User logged in successfully',
            success: true,
            user
        })
        response.cookies.set('accessToken', token,{
            httpOnly: true
        })

        return response;

        
      } catch (error) {
           return NextResponse.json({
               status: 'error',
               message: 'logining in user failed , reason :: '+ error.message,
               success: false
           })
      }
}