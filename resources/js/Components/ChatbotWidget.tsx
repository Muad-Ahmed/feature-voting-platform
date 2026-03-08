import { useState, useEffect } from "react";
// @ts-ignore
import ChatBot from "react-simple-chatbot";
// @ts-ignore
import { ThemeProvider } from "styled-components";
import axios from "axios";

// Custom component to handle the API call to Laravel backend
const BotResponse = ({ previousStep, triggerNextStep }: any) => {
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState("");

    useEffect(() => {
        const userMessage = previousStep.value;
        const currentUrl = window.location.href;

        // Post to our Laravel backend endpoint
        axios
            .post("/chatbot/message", {
                message: userMessage,
                url: currentUrl,
            })
            .then((response) => {
                const reply = response.data?.reply || "No response received.";
                setResult(reply);
                setLoading(false);
                triggerNextStep({ trigger: "user_input" });
            })
            .catch((error) => {
                console.error("Chatbot API Error:", error);
                setResult("Sorry, I encountered an error. Please try again later.");
                setLoading(false);
                triggerNextStep({ trigger: "user_input" });
            });
    }, [previousStep, triggerNextStep]);

    if (loading) {
        return (
            <div className="flex space-x-1 items-center p-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
            </div>
        );
    }
    return <div className="text-sm">{result}</div>;
};

export default function ChatbotWidget() {
    const [isOpen, setIsOpen] = useState(false);

    // Theme matching the project's blue palette (based on FeatureItem.tsx text-blue-600)
    const theme = {
        background: "#ffffff",
        headerBgColor: "#2563eb", // Tailwind blue-600
        headerFontSize: "16px",
        botBubbleColor: "#f3f4f6", // Tailwind gray-100
        headerFontColor: "white",
        botFontColor: "#1f2937", // Tailwind gray-800
        userBubbleColor: "#2563eb", // Tailwind blue-600
        userFontColor: "white",
    };

    const steps = [
        {
            id: "greeting",
            message: "Hello! I am your AI assistant. How can I help you today?",
            trigger: "suggestions",
        },
        {
            id: "suggestions",
            options: [
                { value: "What is VoteFlow built with?", label: "🛠️ What's the tech stack?", trigger: "fetch_response" },
                { value: "How do I submit a new feature?", label: "💡 How do I suggest a feature?", trigger: "fetch_response" },
                { value: "How does the voting system work?", label: "🗳️ How do I vote?", trigger: "fetch_response" },
                { value: "I need help with something else", label: "💬 Other questions", trigger: "user_input" },
            ],
        },
        {
            id: "user_input",
            user: true,
            trigger: "fetch_response",
        },
        {
            id: "fetch_response",
            component: <BotResponse />,
            asMessage: true,
            waitAction: true,
        },
    ];

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {/* Chatbot Window Container */}
            <div
                className={`transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] origin-bottom-right mb-4 ${isOpen
                    ? "opacity-100 scale-100 translate-y-0 visible"
                    : "opacity-0 scale-95 translate-y-4 invisible pointer-events-none"
                    }`}
            >
                <div className="shadow-2xl rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white">
                    <ThemeProvider theme={theme}>
                        <ChatBot
                            steps={steps}
                            headerTitle={
                                <div className="flex items-center justify-between w-full pr-2 w-[360px]">
                                    <div className="flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400 fill-yellow-400">
                                            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                                        </svg>
                                        <span className="font-bold tracking-tight text-white">AI Assistant</span>
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIsOpen(false);
                                        }}
                                        className="p-2 m-0 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all active:scale-90"
                                        title="Close Chat"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M18 6 6 18M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            }
                            hideSubmitButton={false}
                            placeholder="Ask me anything..."
                            width="380px"
                            height="500px"
                            floating={false}
                            style={{
                                fontFamily: "inherit",
                                borderRadius: "1rem",
                                boxShadow: "none",
                            }}
                            headerStyle={{
                                padding: "1rem 1.25rem",
                                borderBottom: "1px solid rgba(255,255,255,0.1)",
                                background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                            }}
                            footerStyle={{
                                padding: "0.5rem",
                                borderTop: "1px solid #f3f4f6",
                                background: "#ffffff",
                            }}
                            inputStyle={{
                                borderRadius: "0.75rem",
                                border: "1px solid #e5e7eb",
                                padding: "0.75rem 1rem",
                                fontSize: "14px",
                                outline: "none",
                                boxShadow: "none",
                                width: "calc(100% - 0.5rem)",
                                background: "#f9fafb",
                                color: "#374151"
                            }}
                            bubbleStyle={{
                                fontSize: "14px",
                                lineHeight: "1.5",
                                borderRadius: "1rem",
                                padding: "0.75rem 1rem",
                            }}
                        />
                    </ThemeProvider>
                </div>
            </div>

            {/* Floating Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    borderRadius: "100px",
                }}
                className={`flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white shadow-2xl transition-all duration-500 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-300
                    ${isOpen ? "w-12 h-12" : "w-12 h-12 sm:w-[125px] sm:h-[40px] p-2 sm:pt-2 sm:pb-2 sm:pl-2 sm:pr-4"}
                `}
                aria-label="Toggle AI Chat"
            >
                {isOpen ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <div className="flex items-center justify-center gap-2">
                        {/* Beautiful Sparkle Icon */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-yellow-300 fill-yellow-300 drop-shadow-sm animate-pulse"
                        >
                            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                        </svg>
                        <span className="hidden sm:inline-block text-[14px] font-bold tracking-wide whitespace-nowrap">
                            Ask kodee
                        </span>
                    </div>
                )}
            </button>
        </div>
    );
}
