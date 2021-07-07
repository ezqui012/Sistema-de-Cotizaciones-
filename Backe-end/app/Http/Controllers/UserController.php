<?php

namespace App\Http\Controllers;
use App\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\UpdateUserRequest;
use Exception;

class UserController extends Controller
{
    public function login(Request $request){
        $user = User::where('email', '=', $request->email)->where('data_status', '=', 'V')->first();
        if(!is_null($user) && Hash::check($request->password, $user->password)){

            $token = $user->createToken('Cotizacion')->accessToken;

            return response()->json([
                'res' => true,
                'token' => $token,
                'message' => 'Welcome to system',
                'name' => $user->name,
                'role' => $user->id_role,
                'unit' => $user->id_unit,
                'id' => $user->id
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
    public function updateUser(UpdateUserRequest $request, User $id){
        $user = User::find($id);

        if(is_null($user)){
            return response()->json(['message'=> 'User not found'], 404);
        }
        $data=$request->all();
        $id->update($data);
        return response()->json(['message'=> 'User updated'],200);
    }
    // public function update(UpdateUserRequest $request, User $user)
    // {
    //     $user->update($request->all());
    // }
    public function updatePassword(Request $request, User $id){
        $user = User::find($id);
        if(is_null($user)){
            return response()->json(['message'=> 'Password not updated'], 404);
        }
        $id->update(['password' => Hash::make($request->password)]);
        return response()->json(['message'=> 'Password updated'],200);
    }

    public function getListPersonalQuote($id){
        try{
            $res = DB::table('users')
                    ->join('units', 'users.id_unit', '=', 'units.id_unit')
                    ->join('faculties', 'units.id_faculty', '=', 'faculties.id_faculty')
                    ->join('roles', 'users.id_role', '=', 'roles.id_role')
                    ->join('assigned_permissions', 'roles.id_role', '=', 'assigned_permissions.id_role')
                    ->select('users.id', 'users.name')
                    ->where('assigned_permissions.id_permission', '=', 1)
                    ->where('faculties.id_faculty', '=', $id)
                    ->where('users.data_status', '=', 'V')
                    ->get();
            return $res;
        }catch(Exception $ex){
            return response()->json([
                'res' => false,
                'message' => $ex
            ], 404);
        }
    }
}
