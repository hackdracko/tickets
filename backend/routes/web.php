<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::group(['prefix' => 'api'], function()
{
    Route::resource('authorize', 'AuthenticateController', ['only' => ['index']]);
    Route::post('authorize', 'AuthenticateController@authenticate');
    Route::resource('user', 'UserController');
    Route::resource('client', 'ClientController');
    Route::get('/office/clients', 'OfficeController@comboClients');
    Route::resource('office', 'OfficeController');
    Route::get('/ticket/clients', 'TicketController@comboClients');
    Route::get('/ticket/offices/{id}', 'TicketController@comboOffices');
    Route::get('/ticket/users', 'TicketController@comboUsers');
    Route::get('/ticket/test', 'TicketController@test');
    Route::resource('ticket', 'TicketController');
});