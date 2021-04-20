<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function login(Request $request){
        $user = User::where('email', '=', $request->email)->first();
        if(!is_null($user) && Hash::check($request->password, $user->password)){

            $token = $user->createToken('Cotizacion')->accessToken;

            return response()->json([
                'res' => true,
                'token' => $token,
                'message' => 'Welcome to system',
            ], 200);
        }else{
            return response()->json([
                'res' => false,
                'message' => 'Username or password incorrect',
            ], 204);
        }
    }

    public function logout(){
        $user = auth()->user();
        $user->tokens->each(function($token, $key){
            $token->delete();
        });
        return response()->json([
            'res' => true,
            'message' => 'Goodbye'
        ], 200);
    }
}
