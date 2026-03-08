<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ChatbotController extends Controller
{
    /**
     * Handle incoming chatbot messages.
     */
    public function handleMessage(Request $request)
    {
        $validated = $request->validate([
            'message' => 'required|string|max:1000',
            'url' => 'required|url',
        ]);

        $userMessage = $validated['message'];
        $contextUrl = $validated['url'];
        $apiKey = config('ai.api_key');

        if (empty($apiKey)) {
            return response()->json([
                'success' => false,
                'reply' => "The AI API key is not configured. (Context: $contextUrl)",
            ], 500);
        }

        try {
            $response = \Illuminate\Support\Facades\Http::post(
                "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={$apiKey}",
                [
                    'contents' => [
                        [
                            'parts' => [
                                [
                                    'text' => "You are an AI assistant inside a demo website called VoteFlow.

                                            Your role is to help visitors understand how the platform works and answer questions about its features and technology.

                                            ABOUT THE PLATFORM
                                            VoteFlow is a community-driven feature voting platform where users suggest product ideas, vote on features, and discuss them.

                                            CORE FEATURES
                                            • Feature Voting System
                                            Users can upvote or downvote features. Each user can vote only once per feature.

                                            • Feature Comment System
                                            Comments are tied to specific features and allow discussion about them.

                                            • Role-Based Permissions
                                            There are three roles:

                                            User
                                            Can vote on features and view discussions.

                                            Commenter
                                            All User permissions plus the ability to post comments.

                                            Admin
                                            Full platform access, including creating features and managing user roles.

                                            TECH STACK
                                            VoteFlow is built with:
                                            Laravel 11
                                            React with TypeScript
                                            Inertia.js v2
                                            Spatie Permissions
                                            Server-Side Rendering (SSR)

                                            DEMO NOTICE
                                            This is a demo environment. Data may reset periodically and authentication is simplified.

                                            ASSISTANT BEHAVIOR
                                            • Answer clearly and concisely.
                                            • Only answer questions related to the platform.
                                            • If a question is unrelated, guide the user back to the platform.
                                            • Responses must be plain text only. Do not use Markdown formatting such as **bold**, *, or bullet lists.
                                            
                                            Common questions:
                                            - How do I suggest a feature?
                                            - How does the voting system work?
                                            - What is VoteFlow built with?
                                    
                                    User Message: \"{$userMessage}\""
                                ]
                            ]
                        ]
                    ]
                ]
            );

            if ($response->successful()) {
                $data = $response->json();
                $reply = $data['candidates'][0]['content']['parts'][0]['text'] ?? "I'm sorry, I couldn't generate a response.";

                return response()->json([
                    'success' => true,
                    'reply' => $reply,
                ]);
            }

            return response()->json([
                'success' => false,
                'reply' => "Error from AI service: " . ($response->json()['error']['message'] ?? 'Unknown error'),
            ], 500);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'reply' => "An unexpected error occurred: " . $e->getMessage(),
            ], 500);
        }
    }
}
