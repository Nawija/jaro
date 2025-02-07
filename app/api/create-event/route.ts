// app/api/create-event/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

export const config = {
    runtime: "nodejs",
};

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const eventName = formData.get("eventName")?.toString();
        const password = formData.get("password")?.toString();

        if (!eventName || !password) {
            return NextResponse.json(
                { error: "Brak wymaganych pól" },
                { status: 400 }
            );
        }

        const photos = formData.getAll("photos");
        const uploadDir = path.join(process.cwd(), "public", "uploads");

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const imageData: { url: string }[] = [];

        for (const file of photos) {
            if (file instanceof File) {
                const arrayBuffer = await file.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);
                const fileName = `${Date.now()}-${file.name}`;
                const filePath = path.join(uploadDir, fileName);
                fs.writeFileSync(filePath, buffer);
                const url = `/uploads/${fileName}`;
                imageData.push({ url });
            }
        }

        // Tworzymy wydarzenie wraz z powiązanymi zdjęciami (nested write)
        await prisma.event.create({
            data: {
                eventName,
                password,
                images: {
                    create: imageData,
                },
            },
        });

        return NextResponse.json({ message: "Wydarzenie zapisane pomyślnie!" });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Błąd zapisu danych" },
            { status: 500 }
        );
    }
}
