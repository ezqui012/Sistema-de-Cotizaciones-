<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Exception;
class QuoteController extends Controller
{
    //
    public function getProcessQuote($id)
    {

        try{
            $quotes = DB::select('SELECT qd.quantity, ex.unit_item,ex.name_item,rq.business_name, e.name_enterprise, qd.delivery_days, qd.unit_cost, qd.id_qd, rq.id_request
            FROM quotation as q,`request_quotation` as rq, quote_detail as qd,enterprise e , expense_item ex
            where q.id_quotation=qd.id_quotation AND q.id_request = rq.id_request AND qd.id_enterprise=e.id_enterprise AND ex.id_item =qd.id_item And q.id_quotation=? ',[$id]);

            return $quotes;
        }catch(Exception $ex){
            return response()->json([
                'res' => false,
                'message' => $ex
            ], 404);
        }
    }
    public function getFinalizedQuote($id)
    {

        try{
            $quotes = DB::select('SELECT qd.quantity, ex.unit_item,ex.name_item,rq.business_name, e.name_enterprise, qd.delivery_days, qd.unit_cost, q.status_quotation
            FROM quotation as q,`request_quotation` as rq, quote_detail as qd,enterprise e , expense_item ex
            where q.id_quotation=qd.id_quotation AND q.id_request = rq.id_request AND qd.id_enterprise=e.id_enterprise AND ex.id_item =qd.id_item And q.id_quotation=? ',[$id]);

            return $quotes;
        }catch(Exception $ex){
            return response()->json([
                'res' => false,
                'message' => $ex
            ], 404);
        }
    }
    public function deleteProcessQuote($id){
        try{
            DB::table('quote_detail')->where('id_qd',$id)->delete();
            return response()->json([
                'res' => true,
                'message' => 'Detalle eliminado'
            ], 200);
        }catch(Exception $ex){
            return response()->json([
                'res' => false,
                'message' => $ex
            ], 404);
        }

    }

    public function getQuoteById($id){
        try{
            $quotes = DB::select('SELECT qd.quantity, ex.unit_item,ex.name_item,rq.business_name, e.name_enterprise, qd.delivery_days, qd.unit_cost
            FROM quotation as q,`request_quotation` as rq, quote_detail as qd,enterprise e , expense_item ex
            where q.id_quotation=qd.id_quotation AND q.id_request = rq.id_request AND qd.id_enterprise=e.id_enterprise AND ex.id_item =qd.id_item And qd.id_qd=? And q.status_quotation="Proceso"',[$id]);

            return $quotes;
        }catch(Exception $ex){
            return response()->json([
                'res' => false,
                'message' => $ex
            ], 404);
        }
    }


}
