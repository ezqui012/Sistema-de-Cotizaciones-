<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Exception;

class RequestQuotationController extends Controller
{
    public function index()
    {
        //
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

    public function listRequestQuot(){
        try{
            $list = DB::table('request_quotation')
                        ->join('request_details','request_quotation.id_request', '=', 'request_details.id_request')
                        ->select('request_quotation.id_request', 'request_quotation.business_name', DB::raw('SUM(request_details.total_cost) AS total'), 'request_quotation.status')
                        ->groupBy('request_quotation.id_request', 'request_quotation.business_name', 'request_quotation.status')
                        ->orderBy('request_quotation.business_name')
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
