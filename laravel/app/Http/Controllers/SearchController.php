<?php
/**
 * Created by PhpStorm.
 * User: davidalmeida
 * Date: 11/07/16
 * Time: 15:33
 */

namespace App\Http\Controllers;

use app\Support\Helpers;
use DB;
use Response;
use Request;

class SearchController extends Controller
{
    public function autocomplete(){
        $term = Request::get('term');

        $results = array();

        $queries = DB::select('select nome, data_vencimento from titulos WHERE nome LIKE ? GROUP BY nome, data_vencimento', ['%'.$term.'%']);

        foreach ($queries as $query)
        {
            $results[] = ['value' => $query->nome, 'vencimento' => Helpers::formatDate($query->data_vencimento, 'pt')];
        }
        return Response::json($results);
    }
}