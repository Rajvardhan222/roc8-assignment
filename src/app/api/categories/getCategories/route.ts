import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import { db } from "@/server/db";
export const GET =async (req : NextRequest) => {
    try {
        const token = req.cookies.get('accessToken')?.value
        const params = req.nextUrl.searchParams
        const secret = process.env.JWT_SECRET;
        const skip =Number( params.get('skip'))

        const userId = jwt.verify(token,secret)
         console.log(userId);
         
        const user = await db.user.findUnique({where:{id:userId.userId},select : {
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


        const categories = await db.categories.findMany({
            take: 6,
            skip : skip | 0,
            include: {
              likedBy: {
                where: {
                  userId: userId.userId,
                },
              },
            },
          });
      
          // Map through the categories and add the `liked` field
          let categoriesWithLikedField = categories.map(category => ({
            ...category,
            liked: category.likedBy.length > 0,
          }));

          let hasNextPage = await db.categories.findMany({
            take: 6,
            skip : skip+6 ,
            include: {
              likedBy: {
                where: {
                  userId: userId.userId,
                },
              },
            },
          });

          

          let response = {
            page : categoriesWithLikedField,
            currentPage : skip/6,
            hasNextPage : hasNextPage.length > 0,
            
          }
      
          // Return the response
          return NextResponse.json({response,success:true});


       

    } catch (error) {
        return NextResponse.json({
            error : error.message,
            status : 500,
            success : false
        })
    }
}