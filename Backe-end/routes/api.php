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
    Route::ApiResource('roles','RolesController');
    Route:: get('listId/{id}','UnitController@getUnitSelect');
    Route:: get('roleId/{id}','RolesController@getRoleSelect');
});
Route::get('user/{id}', 'UserController@getUserById');
Route::put('updateUser/{id}', 'UserController@updateUser');
Route::put('updatePassword/{id}', 'UserController@updatePassword');

Route::apiResource('enterprise', 'EnterpriseController');
Route:: get('items-rq/{id}','ExpenseItemController@getItemRequest');
Route:: get('quot-infoStatus/{id}','QuotationController@getInfo');
Route::apiResource('insertQuote', 'QuoteDetailController');

/* Controladores historia Creacion de solicitud de compra */
//lista de solicitudes
Route:: get('list-request','RequestQuotationController@listRequestQuot');

Route::apiResource('request-quotation', 'RequestQuotationController');

Route::get('items-request/{id}', 'RequestDetailsController@detailItem');
