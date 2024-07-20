import { db } from "@/server/db";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
export const POST =async (req: NextRequest) => {
  try {
    const reqBody = await req.json();
    let { categoryId } = reqBody;
    const token = req.cookies.get("accessToken")?.value;
    const secret = process.env.JWT_SECRET;
       
    if (!secret) {
      throw new Error('JWT_SECRET is not defined in the environment variables');
    }
    const userId = jwt.verify(token,secret);
    console.log(userId);

    const user = await db.user.findUnique({
      where: { id: userId.userId },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (!user) {
      return NextResponse.json({
        status: 404,
        success: false,
        message: "Invalid Token",
      });
    }

    let isCategoryFav = await db.usersCategorys.findUnique({
      where: {
        userId_categoryId: {
            userId: userId.userId,
            categoryId: categoryId,
          }
      },
    });

    if (isCategoryFav) {
      await db.usersCategorys.delete({
        where: {
            userId_categoryId: {
                userId: userId.userId,
                categoryId: categoryId,
              }
          },
      });
    } else {
      await db.usersCategorys.create({
        data: {
          userId: userId.userId,
          categoryId: categoryId,
        },
      });
    }

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Category Updated",
    });
  } catch (error) {
    return NextResponse.json({
      message: error.message,
      success: false,
      status: 500,
    });
  }
};
