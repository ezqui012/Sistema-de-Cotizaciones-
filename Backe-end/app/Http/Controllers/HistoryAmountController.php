<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Exception;
use App\HistoryAmount;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class HistoryAmountController extends Controller
{

    public function index()
    {
        try{
            $list = DB::table('history_amount')
                        ->join('units', 'history_amount.id_unit', '=', 'units.id_unit')
                        ->join('faculties' , 'units.id_faculty', '=', 'faculties.id_faculty')
                        ->select('units.name_unit', 'faculties.name_faculty', 'history_amount.management', 'history_amount.amount',  'history_amount.id_unit')
                        ->orderBy('history_amount.management', 'desc')
                        ->get();
            return $list;
        }catch(Exception $ex){
            return response()->json([
                'res' => false,
                'message' => $ex,
            ], 404);
        }
    }

    public function store(Request $request)
    {
        try{
            $now = Carbon::now();
            $input = $request->all();
            $input['management'] = $now->year;
            HistoryAmount::create($input);
            $inputU['amount'] = $request->amount;
            DB::table('units')->where('id_unit', $request->id_unit)->update($inputU);
            return response()->json([
                'res' => true,
                'message' => 'Registered budget'
            ], 200);
        }catch(Exception $ex){
            return response()->json([
                'res' => false,
                'message' => $ex,
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

    public function listBudget($year){
        try{
            $list = DB::table('history_amount')
                        ->join('units', 'history_amount.id_unit', '=', 'units.id_unit')
                        ->join('faculties' , 'units.id_faculty', '=', 'faculties.id_faculty')
                        ->select('units.name_unit', 'faculties.name_faculty', 'history_amount.management', 'history_amount.amount', 'history_amount.id_unit')
                        ->where('history_amount.management', '=' ,$year)
                        ->get();
            return $list;
        }catch(Exception $ex){
            return response()->json([
                'res' => false,
                'message' => $ex,
            ], 404);
        }
    }

    public function listNotAssigned($year){
        try{
            $list = DB::table('units')
                        ->join('faculties' , 'units.id_faculty', '=', 'faculties.id_faculty')
                        ->select('units.name_unit', 'faculties.name_faculty', DB::raw('YEAR(CURRENT_TIMESTAMP) AS management'), DB::raw('0 AS amount'), 'units.id_unit')
                        ->where('units.amount', '<>', 'null')
                        ->whereNotIn('units.id_unit', DB::table('history_amount')->select('history_amount.id_unit')->where('history_amount.management', '=' ,$year))
                        ->get();
            return $list;
        }catch(Exception $ex){
            return response()->json([
                'res' => false,
                'message' => $ex,
            ], 404);
        }
    }
}
