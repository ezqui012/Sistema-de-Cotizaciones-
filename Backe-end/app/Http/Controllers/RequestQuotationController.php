<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Exception;
use Illuminate\Support\Carbon;
use App\Http\Requests\CreateRequestQuotationRequest;
use App\RequestQuotation;


class RequestQuotationController extends Controller
{
    public function index()
    {
        //
    }

    public function store(CreateRequestQuotationRequest $request)
    {
        try{
            $now = Carbon::now();
            $input = $request->all();
            $input['date'] = $now->format('Y-m-d');
            $input['status'] = 'Proceso';
            $data = RequestQuotation::create($input);
            return response()->json([
                'res' => true,
                'message' => 'Registered request quototation',
                'id' => $data->id
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
        try{

            $res = DB::table('request_quotation')
                        ->join('users', 'request_quotation.id', '=', 'users.id')
                        ->select('request_quotation.id_request', 'request_quotation.business_name', 'request_quotation.date', 'users.name')
                        ->where('request_quotation.id_request', '=', $id)
                        ->get();
            return json_decode($res, true)[0];
        }catch(Exception $ex){
            return response()->json([
                'res' => false,
                'message' => $ex
            ], 404);
        }
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

    public function changeStatus(Request $request, $id_request){
        try{
            $data = $request->all();
            DB::table('request_quotation')->where('id_request', $id_request)->update($data);
            return response()->json([
                'res' => true,
                'message' => 'Update status'
            ], 200);
        }catch(Exception $ex){
            return response()->json([
                'res' => false,
                'message' => $ex
            ], 404);
        }
    }
}
