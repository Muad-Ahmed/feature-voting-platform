<?php

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;

Route::post('/demo-login/{role}', function (string $role) {
    $validRoles = ['admin', 'commenter', 'user'];

    if (! in_array($role, $validRoles)) {
        Log::warning("Demo login attempted with invalid role: {$role}");
        return back()->with('error', 'Invalid demo role selected.');
    }

    $emails = [
        'admin'     => 'admin@example.com',
        'commenter' => 'commenter@example.com',
        'user'      => 'user@example.com',
    ];

    $user = User::where('email', $emails[$role])->first();

    if (! $user) {
        Log::error("Demo login failed: user with email '{$emails[$role]}' not found. Run: php artisan migrate:fresh --seed");
        return back()->with('error', "Demo account not found. Please contact the administrator.");
    }

    // Ensure demo users always have verified email
    if (! $user->hasVerifiedEmail()) {
        $user->markEmailAsVerified();
    }

    Auth::logout();
    request()->session()->invalidate();
    request()->session()->regenerateToken();

    Auth::login($user, remember: true);

    Log::info("Demo login successful as {$role} ({$user->email})");

    return redirect()->intended(route('feature.index'));
})->name('demo.quick-login');
