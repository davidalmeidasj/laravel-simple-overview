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


        {!! Form::open(array('url' => '/', 'method' => 'POST', 'class' => 'form-register')) !!}

            <div class="form-register-with-email">

                <div class="form-white-background">

                    <div class="form-title-row">
                        <h1>Cadastro de titulos</h1>
                    </div>

                    <div class="form-row">
                        <label>
                            <span>Titulo</span>
                            {{Form::text('nome', '', array('class' => 'input-nome'))}}
                        </label>
                    </div>

                    <div class="form-row">
                        <label>
                            <span>Data de cadastro</span>
                            {{Form::text('data_info', '', array('class' => 'input datepicker'))}}
                        </label>
                        <label>
                            <span>Data do vencimento</span>
                            {{Form::text('data_vencimento', '', array('class' => 'input datepicker'))}}
                        </label>
                    </div>

                    <div class="form-row">
                        <label>
                            <span>Valor da compra</span>
                            {{Form::text('valor_compra', '', array('class' => 'input money'))}}
                        </label>
                        <label>
                            <span>Valor de venda</span>
                            {{Form::text('valor_venda', '', array('class' => 'input money'))}}
                        </label>
                    </div>
                    <div class="form-row">
                        <label>
                            <span>Taxa % a.a</span>
                            {{Form::text('porcentagem', '', array('class' => 'input money'))}}
                        </label>
                    </div>

                    <div class="form-row">
                        {{Form::button('Cadastrar', array('type' => 'submit'))}}
                    </div>

                </div>
            </div>

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
    </script>
@stop