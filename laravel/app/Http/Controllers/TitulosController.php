<?php

namespace App\Http\Controllers;

use App\Models\Titulos;
use app\Support\Helpers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use DB;

class TitulosController extends Controller
{
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $titulo = new Titulos();
        return view('cadastro_titulo')->with(
            [
                'titulo' => $titulo,
                'message' => 'Título cadastrado!',
                'tituloPagina' => 'Cadastro do título',
                'txtBotao'     => 'Cadastrar'
            ]
        );
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function inserir($nome, $dataVencimento)
    {
        $titulo = new Titulos();
        $titulo->nome = $nome;
        $titulo->data_vencimento = $dataVencimento;

        return view('cadastro_titulo')->with(
            [
                'titulo' => $titulo,
                'message' => 'Título cadastrado!',
                'tituloPagina' => 'Cadastro do título',
                'txtBotao'     => 'Cadastrar'
            ]
        );
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function editar($id)
    {
        $titulo = Titulos::find($id);
        return view('cadastro_titulo')->with(
            [
                'titulo' => $titulo,
                'message' => 'Título foi alterado!',
                'tituloPagina' => 'Edição do título',
                'txtBotao'     => 'Salvar alteração'
            ]
        );
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function listagem()
    {
        $titulos = DB::select('select nome, data_vencimento from titulos GROUP BY nome, data_vencimento ORDER BY data_vencimento', []);

        return view('listagem_titulos')->with('titulos', $titulos);
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function historico($nome)
    {
        $titulos = DB::table('titulos')
            ->where('nome', 'like', '%'.$nome.'%')
            ->orderBy('data_info', 'asc')
            ->get();

        $dataVencimento = '';
        $firstValue = array_first($titulos);
        if($firstValue) {
            $dataVencimento = $firstValue->data_vencimento;
        }

        return view('historico')->with(['titulos' => $titulos, 'nome' => $nome, 'dataVencimento' => $dataVencimento, 'array' => [], 'int' => 1]);
    }

    /**
     * Store a new user.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'titulo' => 'required',
            'data_cadastro' => 'required',
            'data_vencimento' => 'required',
            'valor_compra' => 'required',
            'valor_venda' => 'required',
        ]);

        $dados = collect($request->all());
        $message = $dados->get('message', 'Título foi cadastrado!');
        $id = $dados->get('id', null);
        $name = $dados->get('titulo');
        $dataInfo = Helpers::formatDate($dados->get('data_cadastro'));
        $dataVencimento = Helpers::formatDate($dados->get('data_vencimento'));
        $valorCompra = Helpers::formatDecimal($dados->get('valor_compra'));
        $valorVenda = Helpers::formatDecimal($dados->get('valor_venda'));
        $porcentagem = Helpers::formatDecimal($dados->get('porcentagem'));

        $titulos = new Titulos();
        if($id) {
            $titulos = Titulos::find($id);
        }
        $titulos->nome = $name;
        $titulos->data_info = $dataInfo ;
        $titulos->data_vencimento = $dataVencimento ;
        $titulos->valor_compra = $valorCompra ;
        $titulos->valor_venda = $valorVenda ;
        $titulos->porcentagem = $porcentagem;

        $titulos->save();

        // redirect
        Session::flash('message', $message);
        return Redirect::to('/historico/' . $name);
        //
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id, $nome)
    {
        // delete
        $nerd = Titulos::find($id);
        $nerd->delete();

        // redirect
        Session::flash('message', 'Título foi removido!');
        return Redirect::to('historico/'.$nome);
    }
}
