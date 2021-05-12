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
                'id_role' => $request->id_role,
                'id_unit' => $request->id_unit,
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
    public function getEmail(Request $request){

        $email= User::where('email', '=', $request->email)->first();
        return $email;
    }
    public function getCi(Request $request){
        $ci = User::where('ci', '=', $request->ci)->first();

        return $ci;
    }
    public function getUserById($id){
        $user = User::find($id);
        if(is_null($user)){
            return response()->json(['message' => 'User Not found'], 404);
        }
        return response()->json($user::find($id),200);
    }
    public function updateUser(Request $request, $id){
        $user = User::find($id);
        if(is_null($user)){
            return response()->json(['message'=> 'Usuario no encontrado'], 404);
        }
        $user->update($request->all());
        return response($user,200);
    }


}
