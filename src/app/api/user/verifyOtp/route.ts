import { db } from "@/server/db";
import { NextRequest ,NextResponse} from "next/server";

export const POST = async (req : NextRequest) =>{
    try {
        const reqBody = await req.json()
        const {id, otp} = reqBody

       let user = await db.user.findUnique({
            where: {
                id
            }
        })

        if (!user) {
            return NextResponse.json({
                status: 404,
                message: 'User not found'
            })
        }

        if (user.otp!== otp) {
            return NextResponse.json({
                status: 400,
                message: 'Invalid OTP'
            })
        }

        // Update user status to active
        await db.user.update({
            where: {
                id
            },
            data: {
                isVerified: true,
                otp : null
            }
        })

        return NextResponse.json({
            status: 200,
            message: 'User verified successfully'
        })

    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: 'Something went wrong whle verifying',
            error: error.message
        })
    }
}