<?php

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
    Route::get('list','UnitController@getUnitList');
    Route::ApiResource('roles','RolesController');
    Route:: get('listId/{id}','UnitController@getUnitSelect');
    Route:: get('roleId/{id}','RolesController@getRoleSelect');
    Route:: get('quoteItem/{id}','QuoteController@getItem');
    Route::ApiResource('quote', 'QuoteController');
    Route::get('list-personal/{id}', 'UserController@getListPersonalQuote');
    Route::get('user/{id}', 'UserController@getUserById');

    Route::delete('processQuoteDelete/{id}', 'QuoteController@deleteProcessQuote');
    Route::put('updatePassword/{id}', 'UserController@updatePassword');
    Route::get('processQuote/{id}', 'QuoteController@getProcessQuote');
    Route::get('finalizedQuote/{id}', 'QuoteController@getFinalizedQuote');
    Route::put('status-quotation-update/{id}','QuotationController@updateStatus');

    Route::apiResource('enterprise', 'EnterpriseController');
    Route::get('items-rq/{id}','ExpenseItemController@getItemRequest');
    Route::get('quot-infoStatus/{id}','QuotationController@getInfo');
    Route::apiResource('insertQuote', 'QuoteDetailController');

    /* Controladores historia Creacion de solicitud de compra */
    //lista de solicitudes
    Route::get('list-request','RequestQuotationController@listRequestQuot');
    Route::apiResource('request-quotation', 'RequestQuotationController');
    Route::get('items-request/{id}', 'RequestDetailsController@detailItem');
    Route::put('request_up/{id}/{request}', 'RequestDetailsController@updateRequestName');
    Route::apiResource('detail-request', 'RequestDetailsController');
    Route::apiResource('expense-item', 'ExpenseItemController');
    Route::get('request','RequestQuotationController@getListRequest');
    //metodos de ddetalle
    Route:: get('itemQuotes/{idQuote}/{idItem}','QuoteController@getItemQuotes');
    Route:: put('updateStatusQ/{id}/{status}','QuoteController@updateStatusQuote'); //mi api
    Route:: put('updateStatusR/{id}/{status}','QuoteController@updateStatusRequestQuote'); //mi api
    Route::put('update-status/{id_request}','RequestQuotationController@changeStatus');
    Route::apiResource('rejected', 'RejectedController');
    Route::get('unit-amount/{id}', 'UnitController@getAmount');

    /* lista de cotizaciones asignadas a un usuario */
    Route::get('quot-assigned/{id}','QuotationController@getListQuoteUser');
    Route::apiResource('quotation','QuotationController');
    /* ID de facultad */
    Route::get('get-facultyId/{id}', 'FacultyController@getIdFaculty');

    Route::get('get-numberQuotes/{id_quotation}/{id_item}', 'QuoteDetailController@numberQuotes');

    Route::get('reason-rejected-request/{id}', 'RejectedController@getReason');
    Route::get('personal-quote-name/{id}', 'QuotationController@namePersonalQuote');
    Route::get('get-request-accepted/{id}', 'RequestDetailsController@requestApproved');

    Route::put('updateUser/{id}', 'UserController@updateUser');
});

Route::get('companyList', 'FacultyController@allListCompany');
