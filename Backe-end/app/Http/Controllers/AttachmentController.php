<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Attachment;
use Exception;

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
