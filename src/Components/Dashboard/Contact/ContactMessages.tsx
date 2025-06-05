import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface ContactMessage {
    userName: string;
    userEmail: string;
    userPhone: string;
    userMessage: string;
    userLocation: string;
    _id: string;
    timestamp: string;
}

const getContact = async (): Promise<ContactMessage[]> => {
    const response = await axios.get<ContactMessage[]>(
        "https://casa-tomas-api.onrender.com/api/getContact"
    );
    return response.data;
};

const getInitial = (name: string) => {
    if (!name) return "?";
    return name.trim().charAt(0).toUpperCase();
};

const ContactMessages: React.FC = () => {
    const [messages, setMessages] = useState<ContactMessage[]>([]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const data = await getContact();
                setMessages(data);
            } catch (error) {
                console.error("Error fetching contact messages:", error);
            }
        };

        fetchMessages();
    }, []);

    return (
        <div className="p-6 bg-sky-100 min-h-screen">
            <h1 className="text-3xl font-extrabold mb-8 text-sky-700 text-center tracking-tight drop-shadow">
                Mensajes de Contacto
            </h1>
            <div className="max-w-3xl mx-auto grid gap-6">
                {messages.length === 0 ? (
                    <div className="text-center text-gray-400 py-20">
                        No hay mensajes de contacto aún.
                    </div>
                ) : (
                    messages.map((message) => (
                        <div
                            key={message._id}
                            className="flex items-start gap-4 p-6 bg-white/90 shadow-lg rounded-2xl border border-gray-200 hover:shadow-2xl transition-shadow"
                        >
                            {/* Avatar */}
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 rounded-full bg-sky-600 flex items-center justify-center text-white text-xl font-bold shadow">
                                    {getInitial(message.userName)}
                                </div>
                            </div>
                            {/* Content */}
                            <div className="flex-1">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                                    <span className="text-lg font-semibold text-gray-800">
                                        {message.userName}
                                    </span>
                                    <span className="text-xs text-gray-400 mt-1 sm:mt-0">
                                        {new Date(message.timestamp).toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-4 mb-2">
                                    <span className="inline-flex items-center gap-1 text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                                        <svg className="w-4 h-4 text-sky-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 12a4 4 0 01-8 0m8 0a4 4 0 00-8 0m8 0V8a4 4 0 00-8 0v4m8 0v4a4 4 0 01-8 0v-4"></path></svg>
                                        {message.userEmail || <span className="italic text-gray-400">Sin email</span>}
                                    </span>
                                    <span className="inline-flex items-center gap-1 text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                                        <svg className="w-4 h-4 text-sky-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm0 10a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2zm10-10a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zm0 10a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                                        {message.userPhone}
                                    </span>
                                    <span className="inline-flex items-center gap-1 text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                                        <svg className="w-4 h-4 text-sky-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 12.414a2 2 0 00-2.828 0l-4.243 4.243a8 8 0 1111.314 0z"></path><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                        {message.userLocation || <span className="italic text-gray-400">Sin ubicación</span>}
                                    </span>
                                </div>
                                <div className="bg-sky-50 border-l-4 border-sky-400 px-4 py-3 rounded text-gray-700 text-base">
                                    <span className="font-medium text-sky-700">Mensaje:</span> {message.userMessage}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ContactMessages;