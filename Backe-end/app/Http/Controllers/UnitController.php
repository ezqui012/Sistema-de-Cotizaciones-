<?php

namespace App\Http\Controllers;

use App\Unit;
use App\Http\Requests\CreateUnitRequest;
use Illuminate\Http\Request;
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
            $input = $request->all();
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
