<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function login(Request $request){
        $user = User::where('username', '=', $request->username)->first();
        if(!is_null($user) && Hash::check($request->password, $user->password)){
            return response()->json([
                'res' => true,
                'message' => 'Welcome to system',
            ], 200);
        }else{
            return response()->json([
                'res' => false,
                'message' => 'Username or password incorrect',
            ], 204);
        }
    }
}
