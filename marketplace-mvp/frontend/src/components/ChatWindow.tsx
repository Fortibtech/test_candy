
"use client";

import { useState, useEffect, useRef } from 'react';
import api from '@/lib/api';
import { Send, Paperclip, MoreVertical } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Button from './ui/Button';

interface Message {
    id: number;
    content: string;
    senderId: number;
    createdAt: string;
}

interface ChatWindowProps {
    conversationId: number;
}

export default function ChatWindow({ conversationId }: ChatWindowProps) {
    const { user } = useAuth();
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const fetchMessages = async () => {
        try {
            const res = await api.get(`/conversations/${conversationId}`);
            setMessages(res.data.messages);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
        const interval = setInterval(fetchMessages, 5000);
        return () => clearInterval(interval);
    }, [conversationId]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        try {
            await api.post(`/conversations/${conversationId}/messages`, { content: newMessage });
            setNewMessage('');
            fetchMessages();
        } catch (err) {
            console.error("Failed to send message", err);
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center h-[500px] bg-stone-50 rounded-2xl">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
    );

    return (
        <div className="flex flex-col h-[650px] bg-white rounded-3xl shadow-soft-xl border border-stone-100 overflow-hidden relative">
            {/* Header (Optional, if not handled by page) */}

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-stone-50/30">
                {messages.length === 0 && (
                    <div className="text-center py-20 opacity-50">
                        <p className="text-sm font-bold uppercase tracking-widest text-stone-400">Début de la discussion</p>
                    </div>
                )}

                {messages.map((msg, idx) => {
                    const isMe = msg.senderId === user?.userId;
                    const showAvatar = !isMe && (idx === 0 || messages[idx - 1].senderId !== msg.senderId);

                    return (
                        <div key={msg.id} className={`flex w-full ${isMe ? 'justify-end' : 'justify-start'}`}>
                            <div className={`flex max-w-[75%] items-end gap-2 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>

                                {/* Avatar Placeholder for 'Them' */}
                                {!isMe && (
                                    <div className={`w-8 h-8 rounded-full bg-stone-200 flex-shrink-0 ${showAvatar ? 'visible' : 'invisible'}`}></div>
                                )}

                                <div className={`relative px-5 py-3 shadow-sm ${isMe
                                    ? 'bg-primary text-white rounded-2xl rounded-br-sm'
                                    : 'bg-white border border-stone-100 text-stone-800 rounded-2xl rounded-bl-sm'
                                    }`}>
                                    <p className="text-sm leading-relaxed">{msg.content}</p>
                                    <span className={`text-[9px] mt-1 block opacity-70 text-right font-medium tracking-wide ${isMe ? 'text-white/70' : 'text-stone-400'}`}>
                                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-4 bg-white border-t border-stone-100 flex gap-3 items-center relative z-10">
                <Button type="button" variant="ghost" size="sm" className="text-stone-400 hover:text-primary px-2">
                    <Paperclip size={20} />
                </Button>

                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Écrivez votre message..."
                    className="flex-1 bg-stone-50 border-0 focus:ring-2 focus:ring-primary/10 rounded-full px-6 py-3 text-stone-800 placeholder:text-stone-400 transition-all outline-none"
                    autoFocus
                />

                <Button
                    type="submit"
                    variant="primary"
                    disabled={!newMessage.trim()}
                    className="rounded-full w-12 h-12 p-0 flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/20"
                >
                    <Send size={18} className={newMessage.trim() ? "ml-1" : ""} />
                </Button>
            </form>
        </div>
    );
}
