<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Attachment;
use Exception;
use Illuminate\Support\Facades\DB;

class AttachmentController extends Controller
{

    public function index()
    {
        //
    }

    public function store(Request $request)
    {
        try{
            $input = $request->all();
            Attachment::create($input);
            return response()->json([
                'res' => true,
                'message' => 'Registered attachment'
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
        try{
            $fileQ = Attachment::where('id_qd', '=', $id)->first();
            return $fileQ;
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
            DB::table('attachment')->where('id_qd', '=', $id)->update($input);
            return response()->json([
                'res' => true,
                'message' => 'Successfully upgraded attachment'
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
}
