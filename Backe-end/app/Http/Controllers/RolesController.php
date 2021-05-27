<?php

namespace App\Http\Controllers;

use App\Roles;
use Illuminate\Http\Request;
use Exception;
use Illuminate\Support\Facades\DB;


class RolesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try{
            $res = Roles::orderBy('name_role')->where('name_role', '<>', 'Admin')->get();
            return $res;
        }catch(Exception $ex){
            return response()->json([
                'res' => false,
                'error' => $ex,
                'message' => 'There is been a problem'
            ], 404);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try{
            $input = $request->all();

           $data = Roles::create($input);
            //$id = $input['id_role'];
            //$id=Roles::lastest('id_role')->first();
            return response()->json([
                'res' => true,
                'message' => 'Registered new rol',
                'id' => $data->id
            ], 200);
        }catch(Exception $ex){
            return response()->json([
                'res' => false,
                'message' => $ex
            ], 404);
        }
    }

    public function getRoleSelect($id)
    {  try{
        $unit = Roles::where('id_role', '=', $id)->first();
        return $unit;
    }catch(Exception $ex){
        return response()->json([
            'res' => false,
            'message' => $ex
        ], 404);
    }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try{
            $input = $request->all();
            DB::table('roles')->where('id_role', $id)->update($input);
            return response()->json([
                'res' => true,
                'message' => 'Successfully upgraded Roles'
            ], 200);
        }catch(Exception $ex){
            return response()->json([
                'res' => false,
                'message' => $ex
            ], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
