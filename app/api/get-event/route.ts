// app/api/get-event/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const { password } = await request.json();
        const event = await prisma.event.findFirst({
            where: { password },
            include: { images: true },
        });

        if (!event) {
            return NextResponse.json(
                { error: "Błędne hasło lub wydarzenie nie istnieje" },
                { status: 404 }
            );
        }

        const images = event.images.map((img) => img.url);

        return NextResponse.json({
            event: {
                id: event.id,
                eventName: event.eventName,
                images,
            },
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Błąd podczas pobierania danych" },
            { status: 500 }
        );
    }
}
