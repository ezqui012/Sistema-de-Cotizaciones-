<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Exception;

class QuotationController extends Controller
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
}
