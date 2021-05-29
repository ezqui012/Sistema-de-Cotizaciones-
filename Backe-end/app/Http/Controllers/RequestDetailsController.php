<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\RequestDetails;
use Illuminate\Support\Facades\DB;
use Exception;
use App\Http\Requests\CreateRequestDetailsRequestst;
use App\Http\Requests\UpdateRequestDetailsRequest;
use App\Http\Requests\UpdateRequestDetailsRequestst;

class RequestDetailsController extends Controller
{
    public function index()
    {
        //
    }

    public function store(CreateRequestDetailsRequestst $request)
    {
        try{
            $input = $request->all();
            RequestDetails::create($input);
            return response()->json([
                'res' => true,
                'message' => 'Registered request deatil'
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

    public function update(UpdateRequestDetailsRequest $request, $id)
    {
        try{
            $input['id_item'] = $request->id_item;
            $input['quantity'] = $request->quantity;
            $input['total_cost'] = $request->total_cost;
            DB::table('request_details')->where('id_request', $id)->where('id_item', $request->id_itemOld)->update($input);
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

    public function requestApproved($id){
        try{
            $res = DB::table('accepted')
                        ->join('request_quotation', 'accepted.id_request', '=', 'request_quotation.id_request')
                        ->join('quote_detail', 'accepted.id_qd', '=', 'quote_detail.id_qd')
                        ->join('expense_item', 'quote_detail.id_item', '=', 'expense_item.id_item')
                        ->join('enterprise', 'quote_detail.id_enterprise', '=', 'enterprise.id_enterprise')
                        ->select('quote_detail.quantity', 'expense_item.unit_item', 'expense_item.name_item', 'enterprise.name_enterprise', 'quote_detail.unit_cost')
                        ->where('accepted.id_request', '=', $id)
                        ->get();
            if($res[0]){
                return $res;
            }else{
                return response()->json([
                    'res' => false,
                    'message' => 'Falided request'
                ], 404);
            }
        }catch(Exception $ex){
            return response()->json([
                'res' => false,
                'message' => $ex
            ], 404);
        }
    }
}
