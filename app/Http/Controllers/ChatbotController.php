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
        // Validate the request to ensure message and contextual URL are provided
        $validated = $request->validate([
            'message' => 'required|string|max:1000',
            'url' => 'required|url',
        ]);

        $userMessage = $validated['message'];
        $contextUrl = $validated['url'];

        $placeholderResponse = "This is a placeholder response until the AI API is configured. (Context: $contextUrl)";

        return response()->json([
            'success' => true,
            'reply' => $placeholderResponse,
        ]);
    }
}
