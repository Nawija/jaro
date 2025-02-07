"use client";

import { useState, ChangeEvent, FormEvent } from "react";

export default function AdminPage() {
    const [eventName, setEventName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [photos, setPhotos] = useState<FileList | null>(null);
    const [message, setMessage] = useState<string>("");

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setPhotos(e.target.files);
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!photos) {
            setMessage("Wybierz zdjęcia.");
            return;
        }

        const formData = new FormData();
        formData.append("eventName", eventName);
        formData.append("password", password);
        for (let i = 0; i < photos.length; i++) {
            formData.append("photos", photos[i]);
        }

        const res = await fetch("/api/create-event", {
            method: "POST",
            body: formData,
        });
        const data = await res.json();
        if (res.ok) {
            setMessage(data.message);
            setEventName("");
            setPassword("");
            setPhotos(null);
        } else {
            setMessage(data.error || "Wystąpił błąd");
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-xl">
            <h1 className="text-3xl font-bold mb-6">Panel Administracyjny</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium mb-1">
                        Nazwa wydarzenia:
                    </label>
                    <input
                        type="text"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block font-medium mb-1">Hasło:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block font-medium mb-1">
                        Zdjęcia (wielokrotny wybór):
                    </label>
                    <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        required
                        className="block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
                >
                    Dodaj wydarzenie
                </button>
            </form>
            {message && (
                <p className="mt-4 text-center text-green-600 font-semibold">
                    {message}
                </p>
            )}
        </div>
    );
}
