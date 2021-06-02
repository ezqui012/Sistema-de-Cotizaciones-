<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Exception;
use App\ExpensiveItem;
use App\Http\Requests\CreateExpenseItemRequest;
use App\Http\Requests\UpdateExpenseItemRequest;

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

    public function store(CreateExpenseItemRequest $request)
    {
        try{
            $data = $request->all();
            ExpensiveItem::create($data);
            return response()->json([
                'res' => true,
                'message' => 'Registered item'
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
            $item = ExpensiveItem::where('id_item', '=', $id)->first();
            return $item;
        }catch(Exception $ex){
            return response()->json([
                'res' => false,
                'message' => $ex
            ], 404);
        }
    }

    public function update(UpdateExpenseItemRequest $request, $id)
    {
        try{
            $data = $request->all();
            DB::table('expense_item')->where('id_item', $id)->update($data);
            return response()->json([
                'res' => true,
                'message' => 'Successfully upgraded item'
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

    public function getUnit(){
        try{
            $units = ExpensiveItem::select('unit_item')->groupby('unit_item')->orderby('unit_item')->get();
            return $units;
        }catch(Exception $ex){
            return response()->json([
                'res' => false,
                'message' => $ex
            ], 404);
        }
    }

    public function getType(){
        try{
            $types = ExpensiveItem::select('type_item')->groupby('type_item')->orderby('type_item')->get();
            return $types;
        }catch(Exception $ex){
            return response()->json([
                'res' => false,
                'message' => $ex
            ], 404);
        }
    }
}
