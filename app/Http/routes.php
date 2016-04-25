<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('app');
});


Route::post('oauth/access_token', function() {
    return Response::json(Authorizer::issueAccessToken());
});


Route::group(['middleware'=>'oauth'], function(){

    Route::resource('client', 'ClientController', ['except' => ['create', 'edit']]);
    Route::resource('project', 'ProjectController', ['except' => ['create', 'edit']]);
    Route::resource('project.member', 'ProjectMemberController', ['except' => ['edit', 'create', 'update']]);
//    Route::group(['middleware'=> 'CheckProjectOwner'], function() {
//        Route::resource('project', 'ProjectController', ['except' => ['create', 'edit']]);
//    });

    Route::group(['middleware'=>'check.project.permission', 'prefix'=>'project'], function() {

        Route::resource('{project}/note', 'ProjectNoteController', ['except' => ['edit', 'create']]);
        Route::resource('{project}/task', 'ProjectTaskController', ['except' => ['edit', 'create']]);
        Route::resource('{project}/file', 'ProjectFileController', ['except' => ['edit', 'create']]);
        Route::get('{project}/file/{file}/download', 'ProjectFileController@showFile');



        Route::get('{projectId}/member', 'ProjectMemberController@index');
        Route::post('{projectId}/member', 'ProjectMemberController@store');
        Route::get('{projectId}/member/{id}', 'ProjectMemberController@show');
        Route::delete('{projectId}/member/{id}', 'ProjectMemberController@destroy');


    });

    Route::get('user/authenticated', 'UserController@authenticated');
    Route::get('user/allUsers', 'UserController@allUsers');
    Route::resource('user', 'UserController', ['except' => ['edit', 'create']]);

});



