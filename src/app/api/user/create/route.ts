import { db } from "@/server/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import sendEmail from "@/utils/sendEmail";
export const POST = async(req:NextRequest) =>{
    try {
        const reqBody = await req.json()
        const {name ,email,password} = reqBody
        
        if (!(name,email,password)) {
            return NextResponse.json( {
                status: 'error',
                message: 'please provide all the fields',
                success: false
            })
        }

        let hashedPassword =  bcrypt.hashSync(password,10)

        const user = await db.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        }
        
    )

    if(!user) {
        return NextResponse.json( {
            status: 'error',
            message: 'Error creating user',
            success: false
        })
    }

    await  sendEmail({email,name : user.name,userId : user.id})

    return NextResponse.json( {
        status:'success',
        message: 'User created successfully',
        success: true,
        
    })

    } catch (error) {
        return NextResponse.json(
            { error: "An error occurred while creating your account." ,
                
             status: 500 ,
             success: false,
             errmsg : error.message
            
            }
        );
    }
}