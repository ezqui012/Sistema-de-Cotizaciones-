<?php

namespace App\Http\Controllers;

use App\Unit;
use App\Http\Requests\CreateUnitRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Exception;

class UnitController extends Controller
{

    public function index(Request $request)
    {
        try{
            if($request->has('type')){
                $unit = Unit::where('type', '=', $request->type)->get();
                return $unit;
            }else{
                return response()->json([
                    'res' => false,
                    'message' => 'There is been a problem, inser type to search'
                ], 404);
            }
        }catch(Exception $ex){
            return response()->json([
                'res' => false,
                'message' => $ex
            ], 404);
        }
    }


    public function store(CreateUnitRequest $request)
    {
        try{
            $now = Carbon::now();
            $input = $request->all();
            $input['creation_date'] = $now->format('Y-m-d');
            Unit::create($input);
            return response()->json([
                'res' => true,
                'message' => 'Registered unit'
            ], 200);
        }catch(Exception $ex){
            return response()->json([
                'res' => false,
                'error' => $ex,
                'message' => 'There is been a problem'
            ], 404);
        }
    }
    public function getUnit(){
        $unities = DB::table('units')->select('id_unit','name_unit')->get();
        return $unities;
    }

    public function show($id)
    {
        try{
            $unit = Unit::where('id_unit', '=', $id)->first();
            return $unit;
        }catch(Exception $ex){
            return response()->json([
                'res' => false,
                'message' => $ex
            ], 404);
        }
    }


    public function update(Request $request, $id)
    {
        //
    }


    public function destroy($id)
    {
        //
    }
}
