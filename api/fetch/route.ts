import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function PUT(request: NextRequest) {
    const body = await request.json();

    const data = await prisma.routesInfo.findMany({
        where: {
            car: {
                SeatingCount: {
                    gte: 3
                }
            },
            Status: "notbooked"
        }
    })
    console.log(data);

    return NextResponse.json(data)
}