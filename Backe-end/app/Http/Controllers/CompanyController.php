<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class CompanyController extends Controller
{
    //
    public function addDataEnterprise(Request $request){

        DB::table('enterprise')->insert([
            [
                'name_enterprise' => $request->name_enterprise,
                'sector_enterprise' => $request->sector_enterprise,
                'nit_enterprise' => $request->nit_enterprise,
                'legal_representative' => $request->legal_representative,
                'phone_enterprise' => $request->phone_enterprise,
                'address_enterprise' => $request->address_enterprise
            ]
        ]);
        return response()->json([
            'res' => true,
            'message' => 'Inserted data succesfull',
        ], 200);

    }

    public function getListEnterprise(){
        $companies= DB::table('enterprise')->select('name_enterprise','sector_enterprise','nit_enterprise','legal_representative','phone_enterprise','address_enterprise')->get();
        return $companies;

    }
    public function getSectorEnterprise(){
        $sectorEnterprise = DB::table('enterprise')->select('id_enterprise','sector_enterprise')->get();
        return $sectorEnterprise;
    }





}
