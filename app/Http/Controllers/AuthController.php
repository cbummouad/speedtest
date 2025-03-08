<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Laravel\Sanctum\HasApiTokens;

class AuthController extends Controller
{
    public function showRegisterForm()
    {
        return Inertia::render('Auth/Register', [
            'auth' => [
                'user' => Auth::user()
            ]
        ]);
    }

    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        Auth::login($user);

        return redirect()->route('dashboard');
    }

    public function showLoginForm()
    {
        return Inertia::render('Auth/Login', [
            'auth' => [
                'user' => Auth::user()
            ]
        ]);
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            return response()->json(['token' => $user->createToken('YourAppName')->plainTextToken, 'user' => $user]);
        }

        return response()->json(['message' => 'Unauthorized'], 401);
    }

    public function logout(Request $request)
    {
        if ($request->user()) {
            $request->user()->delete();
            return response()->json(['message' => 'Logged out successfully']);
        }
        return response()->json(['message' => 'No user to log out'], 400);
    }

    public function user(Request $request)
    {
        return response()->json($request->user());
    }
}
