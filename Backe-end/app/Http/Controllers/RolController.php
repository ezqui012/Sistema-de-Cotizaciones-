<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class RolController extends Controller
{
    //
    public function getRol(){
        $unities = DB::table('roles')->select('id_role','name_role')->get();
        return $unities;
    }
}
