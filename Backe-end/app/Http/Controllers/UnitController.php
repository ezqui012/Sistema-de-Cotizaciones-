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

    public function getUnitList(Request $request)
    {
        try{
                //$unit = Unit::where('type', '=', $request->type)->get();
                $unit = DB::select('SELECT u.id_unit, u.name_unit, fa.name_faculty, u.type, u.amount

                FROM units u, faculties fa
                WHERE u.id_faculty = fa.id_faculty
                AND u.type = ? ORDER BY u.name_unit ASC', [$request->type]);

                return $unit;

        }catch(Exception $ex){
            return response()->json([
                'res' => false,
                'message' => $ex
            ], 404);
        }
    }

    public function getUnitSelect($id)
    {  try{
        $unit = Unit::where('id_unit', '=', $id)->first();
        return $unit;
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
        $unities = DB::table('units')->select('id_unit','name_unit')->where('name_unit', '<>', 'Administrador de sistema')->get();
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
        try{
            $input = $request->all();
            DB::table('units')->where('id_unit', $id)->update($input);
            return response()->json([
                'res' => true,
                'message' => 'Successfully upgraded faculty'
            ], 200);
        }catch(Exception $ex){
            return response()->json([
                'res' => false,
                'message' => $ex
            ], 404);
        }
    }


    public function destroy($id)
    {
        //
    }

    public function getAmount($id){
        try{
            $amountUnit = DB::table('units')->select('amount')
                                            ->where('id_unit', '=', $id)
                                            ->get();
            return json_decode($amountUnit, true)[0];
        }catch(Exception $ex){
            return response()->json([
                'res' => false,
                'message' => $ex
            ], 404);
        }

    }
}
