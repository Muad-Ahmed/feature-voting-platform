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
                                    'text' => "You are an AI assistant for a feature voting platform.
                                    The user is currently on the page: {$contextUrl}.
                                    Please provide a helpful, concise response to the user's message:
                                    \"{$userMessage}\""
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
