"use client";

import { useState, FormEvent } from "react";

interface EventData {
    id: number;
    eventName: string;
    images: string[];
}

export default function ClientPage() {
    const [password, setPassword] = useState<string>("");
    const [eventData, setEventData] = useState<EventData | null>(null);
    const [error, setError] = useState<string>("");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setEventData(null);

        const res = await fetch("/api/get-event", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ password }),
        });
        const data = await res.json();
        if (res.ok) {
            setEventData(data.event);
        } else {
            setError(data.error || "Błąd podczas pobierania danych");
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-xl">
            <h1 className="text-3xl font-bold mb-6">Strefa Klienta</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <label className="block font-medium">Podaj hasło:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
                >
                    Pokaż zdjęcia
                </button>
            </form>
            {error && (
                <p className="mt-4 text-center text-red-600 font-semibold">
                    {error}
                </p>
            )}
            {eventData && (
                <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4">
                        {eventData.eventName}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {eventData.images.map((src, index) => (
                            <img
                                key={index}
                                src={src}
                                alt={`Zdjęcie ${index + 1}`}
                                className="w-full h-auto rounded-md shadow-md"
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
