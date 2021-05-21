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
    Route::ApiResource('permit', 'PermitController');
    Route::ApiResource('personal','PersonalController');
    Route::ApiResource('unit', 'UnitController');
    Route::ApiResource('assignedPermit', 'AssignedPermitController');
    Route::get('unitDropdown','UnitController@getUnit');
    Route::get('rolDropdown', 'RolController@getRol');
    Route::post('registerUser', 'UserController@addData');
    Route::post('email','UserController@getEmail');
    Route::post('ci', 'UserController@getCi');
    Route::ApiResource('assignedPermit', 'AssignedPermitController');
    Route::get('list','UnitController@getUnitList');
    Route::get('user/{id}', 'UserController@getUserById');
    Route::put('updateUser/{id}', 'UserController@updateUser');
    Route::put('updatePassword/{id}', 'UserController@updatePassword');
});
Route::get('processQuote/{id}', 'QuoteController@getProcessQuote');
Route::get('finalizedQuote/{id}', 'QuoteController@getFinalizedQuote');
Route::delete('processQuote/{id}', 'QuoteController@deleteProcessQuote');

//Route::get('user/{id}', 'UserController@getUserById');
//Route::put('updateUser/{id}', 'UserController@updateUser');

    //Route:: get('listId/{id}','UnitController@getUnitSelect');
    Route::ApiResource('roles','RolesController');
    Route:: get('listId/{id}','UnitController@getUnitSelect');
    Route:: get('roleId/{id}','RolesController@getRoleSelect');

//Route::ApiResource('unit', 'UnitController');



