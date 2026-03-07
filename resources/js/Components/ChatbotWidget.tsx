import { useState, useEffect } from "react";
import ChatBot from "react-simple-chatbot";
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
                { value: "What features are planned?", label: "What features are planned?", trigger: "fetch_response" },
                { value: "How do I upvote a feature?", label: "How do I upvote a feature?", trigger: "fetch_response" },
                { value: "I have another question", label: "I have another question", trigger: "user_input" },
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
                className={`transition-all duration-300 origin-bottom-right ${isOpen ? "opacity-100 scale-100 mb-4 visible" : "opacity-0 scale-90 invisible h-0 mb-0"
                    }`}
            >
                <div className="shadow-2xl rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                    <ThemeProvider theme={theme}>
                        <ChatBot
                            steps={steps}
                            headerTitle="AI Assistant"
                            hideSubmitButton={false}
                            placeholder="Type your message..."
                            width="350px"
                            height="450px"
                            // Adding custom styles via style prop since react-simple-chatbot doesn't naturally accept className
                            style={{ fontFamily: "inherit" }}
                            bubbleStyle={{ fontSize: "14px", lineHeight: "1.5" }}
                        />
                    </ThemeProvider>
                </div>
            </div>

            {/* Floating Toggle Icon */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-center w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
                aria-label="Toggle AI Chat"
            >
                {isOpen ? (
                    // Close Icon X
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    // Chat Bubble Icon
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                        />
                    </svg>
                )}
            </button>
        </div>
    );
}
