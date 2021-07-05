<?php

namespace App\Http\Controllers;

//use App\Permit;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Exception;
use Ramsey\Uuid\Codec\OrderedTimeCodec;

class PersonalController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        try{
            $personals = DB::select('SELECT us.id, us.name, r.name_role, un.name_unit, us.phone, us.ci, us.email, us.address
            FROM roles r, units un, users us
            WHERE us.id_role = r.id_role
            AND us.id_unit = un.id_unit
            AND us.id_role <> 1
            AND us.data_status = ?
            ORDER BY us.name');

            return $personals;
        }catch(Exception $ex){
            return response()->json([
                'res' => false,
                'message' => $ex
            ], 404);
        }
    }
    public function getUsers($statusData)
    {

        try{
            $personals = DB::select('SELECT us.id, us.name, r.name_role, un.name_unit, us.phone, us.ci, us.email, us.address
            FROM roles r, units un, users us
            WHERE us.id_role = r.id_role
            AND us.id_unit = un.id_unit
            AND us.id_role <> 1
            AND us.data_status = ?
            ORDER BY us.name' ,[$statusData]);

            return $personals;
        }catch(Exception $ex){
            return response()->json([
                'res' => false,
                'message' => $ex
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
            User::create($input);
            return response()->json([
                'res' => true,
                'message' => 'Registered Personal'
            ], 200);
        }catch(Exception $ex){
            return response()->json([
                'res' => false,
                'message' => $ex
            ], 404);
        }
    }
    public function updateStatusUser($id, $status)
    {
        try {

            DB::update('UPDATE users
            SET data_status = ?
            WHERE id = ?', [$status, $id]);;
            return response()->json([
                'res' => true,
                'message' => 'Update status data'
            ], 200);
        } catch (Exception $ex) {
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
