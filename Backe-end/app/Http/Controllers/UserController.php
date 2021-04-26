<?php

namespace App\Http\Controllers;
use App\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\CreateUserRequest;
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
                'name' => $user->name,
                'role' => $user->id_role
            ], 200);
        }else{
            return response()->json([
                'res' => false,
                //'token' => null,
                'message' => 'email or password incorrect',
                //'role' => null
            ], 401);
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

    public function addData(Request $request){

        DB::table('users')->insert([
            [
                'id_role' => 1,
                'id_unit' => 1,
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'ci' => $request->ci,
                'address' => $request->address,
                'password' => Hash::make($request->password),
            ]
        ]);
        return response()->json([
            'res' => true,
            'message' => 'Inserted data succesfull',
        ], 200);

    }
}
