<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\RequestDetails;
use Illuminate\Support\Facades\DB;
use Exception;

class RequestDetailsController extends Controller
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

    public function detailItem($id){
        try{
            $res = DB::table('request_details')
                    ->join('expense_item', 'request_details.id_item', '=', 'expense_item.id_item')
                    ->select('request_details.quantity', 'request_details.total_cost', 'expense_item.name_item', 'expense_item.unit_item', 'expense_item.unit_cost')
                    ->where('request_details.id_request', '=', $id)
                    ->get();
            return $res;
        }catch(Exception $ex){
            return response()->json([
                'res' => false,
                'message' => $ex
            ], 404);
        }
    }
}
