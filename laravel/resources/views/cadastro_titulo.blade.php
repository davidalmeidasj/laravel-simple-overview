@extends('layouts.sistema.master')

@section('title', 'Titulos')

@section('sidebar')
    {{--@parent--}}

@stop

@section('head-sistema')
    <link rel="stylesheet" href="{{URL::asset('css/demo.css')}}">
    <link rel="stylesheet" href="{{URL::asset('css/form-register.css')}}">
@stop

@section('menu-lateral-attr')
    style="display: none"
@stop
@section('content')
    <div class="main-content">

        <!-- You only need this form and the form-register.css -->


        {!! Form::open(array('url' => '/cadastro', 'method' => 'POST', 'class' => 'form-horizontal')) !!}
            {{Form::hidden('id', $titulo->id)}}
            {{Form::hidden('message', $message)}}
            <div class="form-register-with-email">

                <div class="form-white-background">

                    <div class="form-title-row">
                        <h1>{{$tituloPagina}}</h1>
                    </div>
                    {{--$titulos->id = $id;--}}
                    <div class="row">

                        @if (count($errors) > 0)
                            <div class="alert alert-danger">
                                <ul>
                                    @foreach ($errors->all() as $error)
                                        <li>{{ $error }}</li>
                                    @endforeach
                                </ul>
                            </div>
                        @endif

                        <div class="form-group">
                            <label class="col-md-2 control-label" for="nome">Título:</label>
                            <div class="col-md-10">
                                {{Form::text('titulo', $titulo->nome, array('class' => ' form-control', 'id' => 'nome'))}}
                            </div>
                        </div>
                        <div class="form-group form-field">
                            <label class="col-md-2 control-label" for="info">Data cadastro:</label>
                            <div class="col-md-4">
                                {{--<span>Data de cadastro</span>--}}
                                {{Form::text('data_cadastro', formatDate($titulo->data_info, "PT"), array('class' => 'datepicker form-control', 'id' => 'info'))}}
                            </div>
                            <label class="col-md-2 control-label" for="vencimento">Data vencimento:</label>
                            <div class="col-md-4">
                                {{Form::text('data_vencimento', formatDate($titulo->data_vencimento, "PT"), array('class' => 'datepicker form-control', 'id' => 'vencimento'))}}
                            </div>
                        </div>
                        <div class="form-group form-field">
                            <label class="col-md-2 control-label" for="compra">Valor de compra:</label>
                            <div class="col-md-4">
                                {{--<span>Data de cadastro</span>--}}
                                {{Form::text('valor_compra', $titulo->valor_compra, array('class' => 'money form-control', 'id' => 'compra'))}}
                            </div>
                            <label class="col-md-2 control-label" for="venda">Valor de venda:</label>
                            <div class="col-md-4">
                                {{Form::text('valor_venda', $titulo->valor_venda, array('class' => 'money form-control', 'id' => 'venda'))}}
                            </div>
                        </div>
                        <div class="form-group form-field">
                            <label class="col-md-2 control-label" for="taxaAno">Taxa % a.a:</label>
                            <div class="col-md-4">
                                {{Form::text('porcentagem', $titulo->porcentagem, array('class' => 'form-control money', 'id' => 'taxaAno'))}}
                            </div>
                        </div>
                        <div class="form-row">
                            {{Form::button($txtBotao, array('type' => 'submit', 'class' => 'btn btn-success'))}}
                        </div>
                    </div>
                </div>

            </div>


            {{--<div class="form-register-with-email">--}}

                {{--<div class="form-white-background">--}}

                    {{--<div class="form-title-row">--}}
                        {{--<h1>Cadastro de titulos</h1>--}}
                    {{--</div>--}}

                    {{--<div class="form-row">--}}
                        {{--<label>--}}
                            {{--<span>Titulo</span>--}}
                            {{--{{Form::text('nome', '', array('class' => 'input-nome', 'id' => 'nome'))}}--}}
                        {{--</label>--}}
                    {{--</div>--}}

                    {{--<div class="form-row">--}}
                        {{--<label>--}}
                            {{--<span>Data de cadastro</span>--}}
                            {{--{{Form::text('data_info', '', array('class' => 'input datepicker', 'id' => 'info'))}}--}}
                        {{--</label>--}}
                        {{--<label>--}}
                            {{--<span>Data do vencimento</span>--}}
                            {{--{{Form::text('data_vencimento', '', array('class' => 'input datepicker', 'id' => 'vencimento'))}}--}}
                        {{--</label>--}}
                    {{--</div>--}}

                    {{--<div class="form-row">--}}
                        {{--<label>--}}
                            {{--<span>Valor da compra</span>--}}
                            {{--{{Form::text('valor_compra', '', array('class' => 'input money'))}}--}}
                        {{--</label>--}}
                        {{--<label>--}}
                            {{--<span>Valor de venda</span>--}}
                            {{--{{Form::text('valor_venda', '', array('class' => 'input money'))}}--}}
                        {{--</label>--}}
                    {{--</div>--}}
                    {{--<div class="form-row">--}}
                        {{--<label>--}}
                            {{--<span>Taxa % a.a</span>--}}
                            {{--{{Form::text('porcentagem', '', array('class' => 'input money'))}}--}}
                        {{--</label>--}}
                    {{--</div>--}}

                    {{--<div class="form-row">--}}
                        {{--{{Form::button('Cadastrar', array('type' => 'submit'))}}--}}
                    {{--</div>--}}

                {{--</div>--}}
            {{--</div>--}}

        {!! Form::close() !!}
    </div>
@stop

@section('footer-sistema')
    <script>
        // setMascara @see public/Lib/jquery/jquery.util.js
        // datepicker @see public/Lib/bootstrap-datepicker/bootstrap-datepicker.js
        $('.datepicker').setMascara('##/##/####').datepicker({
            format: 'dd/mm/yyyy',
            language: 'pt-BR',
            orientation: 'left',
            clearBtn: true,
            todayHighlight: true,
            autoclose: true
        }).on('blur', function () {
            // dataValida @see public/Lib/jquery/jquery.util.js
            if (!$.dataValida(this.value)) {
                this.value = '';
            }
        });

        var currentDate = new Date();
        $(".datepicker-today").datepicker("setDate",currentDate);

        $('.money').mask('000.000.000.000.000,00', {reverse: true});

        $(function()
        {
            $("#nome").autocomplete({
                source: "search/autocomplete",
                minLength: 3,
                select: function(event, ui) {
                    $('#nome').val(ui.item.value);
                    $('#vencimento').datepicker("setDate",ui.item.vencimento);
                    //$('#info').val(ui.item.info);
                }
            });
        });
    </script>
@stop