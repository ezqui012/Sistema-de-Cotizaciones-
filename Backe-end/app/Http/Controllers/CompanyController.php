<?php

namespace App\Http\Controllers;

use App\Enterprise;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Exception;
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
                'address_enterprise' => $request->address_enterprise,
                'email_enterprise'=> $request->email_enterprise
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
        $sectorEnterprise = DB::table('enterprise')->select('id_enterprise','sector_enterprise')->groupby('sector_enterprise')->orderby('sector_enterprise')->get();
        return $sectorEnterprise;
    }

    public function getEnterpriseById($id){
        $company = Enterprise::find($id);
        if(is_null($company)){
            return response()->json(['message' => 'User Not found'], 404);
        }
        return response()->json($company::find($id),200);
    }

    public function getSector(){
        try{
            $types = Enterprise::select('sector_enterprise')->groupby('sector_enterprise')->orderby('sector_enterprise')->get();
            return $types;
        }catch(Exception $ex){
            return response()->json([
                'res' => false,
                'message' => $ex
            ], 404);
        }
    }





}
