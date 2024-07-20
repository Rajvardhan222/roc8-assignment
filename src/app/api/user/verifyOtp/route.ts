import { db } from "@/server/db";
import { NextRequest ,NextResponse} from "next/server";

export const POST = async (req : NextRequest) =>{
    try {
        const reqBody = await req.json()
        const {email, otp} = reqBody

       let user = await db.user.findUnique({
            where: {
                email
            }
        })

        if (!user) {
            return NextResponse.json({
                status: 404,
                message: 'User not found',
                success: false
            })
        }

        if (user.otp!== otp) {
            return NextResponse.json({
                status: 400,
                message: 'Invalid OTP',
                success: false
            })
        }

        // Update user status to active
        await db.user.update({
            where: {
                email
            },
            data: {
                isVerified: true,
                otp : null
            }
        })

        return NextResponse.json({
            status: 200,
            message: 'User verified successfully',
            success : true
        })

    } catch (error) {
        return NextResponse.json({
            status: 500,
            success : false,
            message: 'Something went wrong whle verifying',
            error: error.message
        })
    }
}