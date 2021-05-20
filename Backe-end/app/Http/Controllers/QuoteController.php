<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Exception;

use Illuminate\Http\Request;

class QuoteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try{
            $status = 'Finalizado';
            $personals = DB::select('SELECT q.id_quotation, rq.id_request, rq.business_name, us.name, q.status_quotation
            FROM quotation q, request_quotation rq, users us
            WHERE q.id = us.id
            AND q.id_request = rq.id_request
            AND q.status_quotation = ?
            ORDER BY us.name',[$status]);

            return $personals;
        }catch(Exception $ex){
            return response()->json([
                'res' => false,
                'message' => $ex
            ], 404);
        }
    }

    //otener los items del detalle de Solicitudes con el iD de solicitudes
    public function getItem($id)
    {
        try{

            $personals = DB::select('SELECT ei.id_item, ei.name_item
            FROM expense_item ei, request_details rd
            WHERE rd.id_item = ei.id_item
            AND rd.id_request = ?
            ORDER BY ei.name_item',[$id]);

            return $personals;
        }catch(Exception $ex){
            return response()->json([
                'res' => false,
                'message' => $ex
            ], 404);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
