<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\AssignedPermit;
use Exception;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class AssignedPermitController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try{
            $res = AssignedPermit::all();
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
            $now = Carbon::now();
            $input = $request->all();
            $input['assigned_date'] = $now->format('Y-m-d');
            AssignedPermit::create($input);
            return response()->json([
                'res' => true,
                'message' => 'Registered Assigned Permit'
            ], 200);
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
        try{
            $assignedPermit = DB::select('SELECT p.id_permission, p.name_permission FROM permissions p, assigned_permissions ap WHERE p.id_permission = ap.id_permission AND ap.id_role = ?', [$id]);

            return $assignedPermit;
        }catch(Exception $ex){
            return response()->json([
                'res' => false,
                'message' => $ex
            ], 404);
        }
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
        //
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
