<?php

namespace App\Http\Controllers;

use App\Unit;
use App\Http\Requests\CreateUnitRequest;
use Illuminate\Http\Request;

class UnitController extends Controller
{

    public function index()
    {
        //
    }


    public function store(CreateUnitRequest $request)
    {
        $input = $request->all();
        Unit::create($input);
        return response()->json([
            'res' => true,
            'message' => 'Registered unit'
        ], 200);

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
