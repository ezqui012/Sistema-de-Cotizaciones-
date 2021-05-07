<?php

namespace App\Http\Controllers;

use App\Faculty;
use App\Http\Requests\CreateFacultyRequest;
use Illuminate\Http\Request;
use Exception;

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


    public function update(Request $request, $id)
    {
        //
    }


    public function destroy($id)
    {
        //
    }
}
