<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Exception;
use App\ExpensiveItem;

class ExpenseItemController extends Controller
{

    public function index()
    {
        try{
            $res = ExpensiveItem::orderBy('name_item')->get();
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

    public function getItemRequest($id){
        try{
            $items = DB::select('SELECT exi.id_item, exi.name_item
                                 FROM expense_item exi, request_details rd, request_quotation rq, quotation q
                                 WHERE q.id_request=rq.id_request AND rq.id_request=rd.id_request
                                 AND rd.id_item=exi.id_item AND q.id_quotation=?', [$id]);
            return $items;
        }catch(Exception $ex){
            return response()->json([
                'res' => false,
                'message' => $ex
            ], 404);
        }
    }
}
