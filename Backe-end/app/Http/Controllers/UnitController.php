<?php

namespace App\Http\Controllers;

use App\Unit;
use App\Http\Requests\CreateUnitRequest;
use Illuminate\Http\Request;
use Exception;

class UnitController extends Controller
{

    public function index()
    {
        //
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
        //
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
