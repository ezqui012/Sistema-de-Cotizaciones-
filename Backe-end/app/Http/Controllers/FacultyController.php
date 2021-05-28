<?php

namespace App\Http\Controllers;

use App\Faculty;
use App\Http\Requests\CreateFacultyRequest;
use App\Http\Requests\UpdateFacultyRequest;
use Illuminate\Http\Request;
use Exception;
use Illuminate\Support\Facades\DB;

class FacultyController extends Controller
{

    public function index()
    {
        try{
            $res = Faculty::orderBy('name_faculty')->get();
            return $res;
        }catch(Exception $ex){
            return response()->json([
                'res' => false,
                'error' => $ex,
                'message' => 'There is been a problem'
            ], 404);
        }
    }


    public function store(CreateFacultyRequest $request)
    {
        try{
            $input = $request->all();
            Faculty::create($input);
            return response()->json([
                'res' => true,
                'message' => 'Registered faculty'
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
            $faculty = Faculty::where('id_faculty', '=', $id)->first();
            return $faculty;
        }catch(Exception $ex){
            return response()->json([
                'res' => false,
                'message' => $ex
            ], 404);
        }
    }


    public function update(UpdateFacultyRequest $request, $id)
    {
        try{
            $input = $request->all();
            DB::table('faculties')->where('id_faculty', $id)->update($input);
            return response()->json([
                'res' => true,
                'message' => 'Successfully upgraded faculty'
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

    public function getIdFaculty($id){
        try{
            $res = DB::table('faculties')
                        ->join('units', 'faculties.id_faculty', '=',  'units.id_faculty')
                        ->select('faculties.id_faculty')
                        ->where('units.id_unit', '=', $id)
                        ->get();
            return json_decode($res, true)[0];
        }catch(Exception $ex){
            return response()->json([
                'res' => false,
                'message' => $ex
            ], 404);
        }
    }
}
