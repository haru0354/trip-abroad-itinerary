import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
import prisma from "@/app/lib/prisma";

// サインアップ
export async function POST(request: Request) {
    try {
       

        return NextResponse.json(response)
    } catch (error) {
        console.log(error);
        return new NextResponse('Error', { status: 500 })   
    }
}
