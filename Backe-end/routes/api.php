<?php

use App\Http\Controllers\RolController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('login', 'UserController@login');

Route::group(['middleware' => 'auth:api'], function(){
    Route::post('logout', 'UserController@logout');
    Route::ApiResource('faculties', 'FacultyController');
    Route::ApiResource('unit', 'UnitController');
    Route::ApiResource('roles','RolesController');
    //Route::ApiResource('permit', 'PermitController');

});
Route::post('registerUser', 'UserController@addData');
Route::get('unit', 'UnitController@getUnit');
Route::get('rol','RolController@getRol');
Route::get('list','UnitController@index');

//Route::ApiResource('permit', 'PermitController');
Route::ApiResource('permit', 'PermitController');
Route::ApiResource('assignedPermit', 'AssignedPermitController');
//Route::ApiResource('roles','RolesController');

//Route::ApiResource('faculties', 'FacultyController');
