<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Rejected;
use App\Http\Requests\CreateRejectedRequest;
use Exception;

class RejectedController extends Controller
{
    public function index()
    {
        //
    }

    public function store(CreateRejectedRequest $request)
    {
        try{
            $input = $request->all();
            Rejected::create($input);
            return response()->json([
                'res' => true,
                'message' => 'Registered reson rejected'
            ], 200);
        }catch(Exception $ex){
            return response()->json([
                'res' => false,
                'message' => $ex
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
