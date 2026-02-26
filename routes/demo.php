<?php

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::post('/demo-login/{role}', function ($role) {
    Auth::logout();
    request()->session()->invalidate();
    request()->session()->regenerateToken();

    $emails = [
        'admin'     => 'admin@example.com',
        'commenter' => 'commenter@example.com',
        'user'      => 'user@example.com',
    ];

    if (isset($emails[$role])) {
        $user = User::where('email', $emails[$role])->first();
        if ($user) {
            Auth::login($user, remember: true);
            return redirect()->route('feature.index');
        }
    }

    return back();
})->name('demo.quick-login');
