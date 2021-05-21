<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\QuoteDetail;
use App\Http\Requests\CreateQuoteDetailRequest;
use Exception;

class QuoteDetailController extends Controller
{
    public function index()
    {
        //
    }

    public function store(CreateQuoteDetailRequest $request)
    {
        try{
            $input = $request->all();
            QuoteDetail::create($input);
            return response()->json([
                'res' => true,
                'message' => 'Registered quote'
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
