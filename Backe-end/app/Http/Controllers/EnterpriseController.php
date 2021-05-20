<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Enterprise;
use Exception;

class EnterpriseController extends Controller
{
    public function index()
    {
        try{
            $res = Enterprise::orderBy('name_enterprise')->get();
            return $res;
        }catch(Exception $ex){
            return response()->json([
                'res' => false,
                'message' => $ex
            ], 404);
        }
    }

    public function store(Request $request)
    {
        //
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
