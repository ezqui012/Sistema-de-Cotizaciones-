<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use App\Binnacle;
use Exception;

class BinnacleController extends Controller
{
    public function index()
    {
        try{
            $list = Binnacle::orderBy('date', 'desc')->get();
            return $list;
        }catch(Exception $ex){
            return response()->json([
                'res' => false,
                'message' => 'There is been a problem'
            ], 404);
        }
    }

    public function store(Request $request)
    {
        try{
            $now = Carbon::now();
            $input = $request->all();
            $input['date'] = $now->format('Y-m-d');
            Binnacle::create($input);
            return response()->json([
                'res' => true,
                'message' => 'Registered budget'
            ], 200);
        }catch(Exception $ex){
            return response()->json([
                'res' => false,
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
