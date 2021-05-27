<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class RolController extends Controller
{
    //
    public function getRol(){
        $roles = DB::table('roles')->select('id_role','name_role')
                                ->where('name_role', '<>', 'Admin')
                                ->get();
        return $roles;
    }
}
