<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Rejected;
use App\Http\Requests\CreateRejectedRequest;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class RejectedController extends Controller
{
    public function index()
    {
        //
    }

    public function store(CreateRejectedRequest $request)
    {
        try{
            $now = Carbon::now();
            $input = $request->all();
            $input['date_rejected'] = $now->format('Y-m-d');
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

    public function getReason($id){
        try{
            $res = DB::table('rejected')->select('reason')->where('id_request', '=', $id)->get();
            return json_decode($res, true)[0];
        }catch(Exception $ex){
            return response()->json([
                'res' => false,
                'message' => $ex
            ], 404);
        }
    }
}
