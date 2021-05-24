<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Exception;
use App\Http\Requests\CreateQuotationRequest;
use App\Quotation;

class QuotationController extends Controller
{
    public function index()
    {
        //
    }

    public function store(CreateQuotationRequest $request)
    {
        try{
            $input = $request->all();
            $input['status_quotation'] = 'Proceso';
            Quotation::create($input);
            return response()->json([
                'res' => true,
                'message' => 'Registered quotation'
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

    public function getInfo($id){
        try{
            $quot = DB::select('SELECT q.status_quotation, rq.business_name
                                 FROM request_quotation rq, quotation q
                                 WHERE q.id_request=rq.id_request AND q.id_quotation=?', [$id]);
            return $quot;
        }catch(Exception $ex){
            return response()->json([
                'res' => false,
                'message' => $ex
            ], 404);
        }
    }

    public function getListQuoteUser($id){
        try{
            $list = DB::table('quotation')
                        ->join('request_quotation', 'quotation.id_request', '=', 'request_quotation.id_request')
                        ->select('request_quotation.id_request', 'request_quotation.business_name', 'quotation.status_quotation')
                        ->where('quotation.id', '=', $id)
                        ->where('request_quotation.status', '=', 'Cotización')
                        ->get();
            return $list;
        }catch(Exception $ex){
            return response()->json([
                'res' => false,
                'message' => $ex
            ], 404);
        }
    }

}
