import { useState, useEffect, useRef } from "react";
import axios from "axios";

type MessageRole = "bot" | "user";

interface Message {
    id: number;
    role: MessageRole;
    text: string;
    loading?: boolean;
}

type SuggestedOption = {
    label: string;
    value: string;
};

const SUGGESTIONS: SuggestedOption[] = [
    { value: "What is VoteFlow built with?", label: "🛠️ What's the tech stack?" },
    { value: "How do I submit a new feature?", label: "💡 How do I suggest a feature?" },
    { value: "How does the voting system work?", label: "🗳️ How do I vote?" },
];

let nextId = 1;

export default function ChatbotWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: nextId++, role: "bot", text: "Hello! I'm your AI assistant. How can I help you today?" },
    ]);
    const [showSuggestions, setShowSuggestions] = useState(true);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    //  auto-scroll run after every message change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Focus input when chat opens
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [isOpen]);

    const sendMessage = async (text: string) => {
        if (!text.trim() || isLoading) return;

        setShowSuggestions(false);
        setInput("");
        setIsLoading(true);

        const userMsg: Message = { id: nextId++, role: "user", text };
        const loadingMsg: Message = { id: nextId++, role: "bot", text: "", loading: true };

        setMessages((prev) => [...prev, userMsg, loadingMsg]);

        try {
            const response = await axios.post("/chatbot/message", {
                message: text,
                url: window.location.href,
            });
            const reply = response.data?.reply || "No response received.";
            setMessages((prev) =>
                prev.map((m) => (m.loading ? { ...m, text: reply, loading: false } : m))
            );
        } catch (err) {
            console.error("Chatbot API Error:", err);
            setMessages((prev) =>
                prev.map((m) =>
                    m.loading
                        ? { ...m, text: "Sorry, I encountered an error. Please try again.", loading: false }
                        : m
                )
            );
        } finally {
            setIsLoading(false);
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendMessage(input);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
            {/* Chat Window */}
            <div
                className={`transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] origin-bottom-right mb-4 pointer-events-auto ${isOpen
                    ? "opacity-100 scale-100 translate-y-0 visible"
                    : "opacity-0 scale-95 translate-y-4 invisible pointer-events-none"
                    }`}
                style={{ width: 380 }}
            >
                <div className="shadow-2xl rounded-2xl overflow-hidden border border-gray-200 bg-white flex flex-col" style={{ height: 500 }}>
                    {/* Header */}
                    <div
                        className="relative flex items-center justify-between px-5 py-5 flex-shrink-0 overflow-hidden"
                        style={{ background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)" }}
                    >
                        {/* Decorative Mesh Gradient Blur */}
                        <div className="absolute top-[-20px] left-[-20px] w-32 h-32 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
                        <div className="absolute bottom-[-20px] right-[-20px] w-32 h-32 bg-blue-400/20 rounded-full blur-3xl pointer-events-none"></div>

                        <div className="relative flex items-center gap-3">
                            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 border border-white/20 shadow-inner">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-300 drop-shadow-[0_0_8px_rgba(253,224,71,0.6)]">
                                    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.937A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .962 0l1.582 6.135A2 2 0 0 0 15.5 9.937l6.135 1.582a.5.5 0 0 1 0 .962L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.962 0z" />
                                    <path d="M20 3a1 1 0 0 1 .707.293L21 3.593v.001l-.007.213a1 1 0 0 1-1.286.706L19.407 4.41l-.013-.003a1 1 0 0 1-.687-1.114l.007-.213a1 1 0 0 1 .98-.713l.306.003L20 3z" />
                                    <path d="M18 19a1 1 0 0 1 .707.293l.293.293a1 1 0 0 1 .28.98l.007-.213a1 1 0 0 1-1.286.706l-.306-.094a1 1 0 0 1-.687-1.114l.007-.213a1 1 0 0 1 .98-.713l.306.003h-.3z" />
                                </svg>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-white tracking-tight text-base leading-tight">AI Assistant</span>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_4px_rgba(74,222,128,0.8)]"></span>
                                    <span className="text-[10px] uppercase tracking-widest font-bold text-white/60">Online Now</span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2.5 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all active:scale-90 border border-transparent hover:border-white/10"
                            title="Close Chat"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 6 6 18M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Messages */}
                    <div
                        ref={containerRef}
                        className="flex-1 overflow-y-auto px-4 py-3 space-y-3"
                        style={{ scrollBehavior: "smooth" }}
                    >
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex items-end gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                            >
                                {/* Avatar Icon */}
                                <div className="flex-shrink-0">
                                    {msg.role === "user" ? (
                                        <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center border border-blue-200">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                                                <circle cx="12" cy="7" r="4" />
                                            </svg>
                                        </div>
                                    ) : (
                                        <div className="w-7 h-7 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center border border-gray-200">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <rect width="16" height="12" rx="2" x="4" y="8" />
                                                <path d="M12 8V4H8" />
                                                <path d="M9 13h.01" />
                                                <path d="M15 13h.01" />
                                            </svg>
                                        </div>
                                    )}
                                </div>

                                {msg.loading ? (
                                    <div className="flex items-center gap-1 bg-gray-100 rounded-2xl px-4 py-3">
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                                    </div>
                                ) : (
                                    <div
                                        className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap shadow-sm ${msg.role === "user"
                                            ? "bg-blue-600 text-white rounded-br-none"
                                            : "bg-gray-100 border border-gray-200 text-gray-800 rounded-bl-none"
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Quick suggestion buttons */}
                        {showSuggestions && (
                            <div className="flex flex-col gap-2 pt-1">
                                {SUGGESTIONS.map((s) => (
                                    <button
                                        key={s.value}
                                        onClick={() => sendMessage(s.value)}
                                        className="text-left text-sm px-4 py-2 rounded-xl border border-blue-200 text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors font-medium"
                                    >
                                        {s.label}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Scroll anchor — always stays at the bottom */}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="flex-shrink-0 border-t border-gray-100 bg-white px-3 py-3">
                        <form onSubmit={handleSubmit} className="flex items-center gap-2">
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask me anything..."
                                disabled={isLoading}
                                className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all disabled:opacity-60"
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !input.trim()}
                                className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95 flex-shrink-0"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="m22 2-7 20-4-9-9-4Z" />
                                    <path d="M22 2 11 13" />
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Floating Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{ borderRadius: "100px" }}
                className={`flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white shadow-2xl transition-all duration-500 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-300 pointer-events-auto
                    ${isOpen ? "w-12 h-12" : "w-12 h-12 sm:w-[125px] sm:h-[40px] p-2 sm:pt-2 sm:pb-2 sm:pl-2 sm:pr-4"}
                `}
                aria-label="Toggle AI Chat"
            >
                {isOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <div className="flex items-center justify-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-300 drop-shadow-sm animate-pulse">
                            <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.937A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .962 0l1.582 6.135A2 2 0 0 0 15.5 9.937l6.135 1.582a.5.5 0 0 1 0 .962L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.962 0z" />
                            <path d="M20 3a1 1 0 0 1 .707.293L21 3.593v.001l-.007.213a1 1 0 0 1-1.286.706L19.407 4.41l-.013-.003a1 1 0 0 1-.687-1.114l.007-.213a1 1 0 0 1 .98-.713l.306.003L20 3z" />
                            <path d="M18 19a1 1 0 0 1 .707.293l.293.293a1 1 0 0 1 .28.98l.007-.213a1 1 0 0 1-1.286.706l-.306-.094a1 1 0 0 1-.687-1.114l.007-.213a1 1 0 0 1 .98-.713l.306.003h-.3z" />
                        </svg>
                        <span className="hidden sm:inline-block text-[14px] font-bold tracking-wide whitespace-nowrap">Ask kodee</span>
                    </div>
                )}
            </button>
        </div>
    );
}
