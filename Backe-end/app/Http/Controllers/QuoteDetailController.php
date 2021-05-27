<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\QuoteDetail;
use App\Http\Requests\CreateQuoteDetailRequest;
use Exception;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\UpdateQuotationDetailRequest;

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

    public function update(UpdateQuotationDetailRequest $request, $id)
    {
        try{
            $input = $request->all();
            DB::table('quote_detail')->where('id_qd', $id)->update($input);
            return response()->json([
                'res' => true,
                'message' => 'Successfully upgraded request detail'
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

    public function numberQuotes($id_quotation, $id_item){
        try{
            $res = DB::table('quote_detail')
                    ->join('quotation', 'quote_detail.id_quotation', '=', 'quotation.id_quotation')
                    //->join('request_quotation', 'quotation.id_request', '=', 'request_quotation.id_request')
                    ->select(DB::raw('count(*) AS total'))
                    //->where('request_quotation.id_request', '=', $id_request)
                    ->where('quotation.id_quotation', '=', $id_quotation)
                    ->where('quote_detail.id_item', '=', $id_item)
                    ->get();
            return json_decode($res, true)[0];
        }catch(Exception $ex){
            return response()->json([
                'res' => false,
                'message' => $ex
            ], 404);
        }
    }
}
