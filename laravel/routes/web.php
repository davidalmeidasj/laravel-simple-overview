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

Route::get('/cadastro', 'TitulosController@index');
Route::get('/inserir/{nome}/{dataVencimento}', 'TitulosController@inserir');
Route::get('editar/{id}', 'TitulosController@editar');
Route::get('excluir/{id}/{nome}', 'TitulosController@destroy');

Route::post('/cadastro', 'TitulosController@store');

Route::get('/', 'TitulosController@listagem');

Route::get('search/autocomplete', 'SearchController@autocomplete');

Route::get('historico/{name}', 'TitulosController@historico');

Route::get('/sistema', function () {
    return view('index_sistema');
});

Route::get('/site', function () {
    return view('index_site');
});

Route::get('/login', function () {
    return view('login');
});

Route::post('/login', 'AccountController@login');

Route::get('product/create', 'ProductController@create')->name('product.create');

Route::get('product/{product}', 'ProductController@show')->name('product.show');

Route::get('category/product/{product}', 'ProductController@removeCategory')->name('category.product.delete');