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
    <h1>Todos os títulos</h1>

    <!-- will be used to show any messages -->
    @if (Session::has('message'))
        <div class="alert alert-info">{{ Session::get('message') }}</div>
    @endif

    <table class="table table-striped table-bordered datatable">
        <thead>
        <tr>
            <td>Título</td>
            <td>Data vencimento</td>
            <td>Ação</td>
        </tr>
        </thead>
        <tbody>
        @foreach($titulos as $key => $value)
            <tr>
                {{--<td>{{ $value->id }}</td>--}}
                <td>{{ $value->nome }}</td>
                {{--<td>{{ $value->data_info }}</td>--}}
                <td>{{ formatDate($value->data_vencimento, 'PT') }}</td>

                <!-- we will also add show, edit, and delete buttons -->
                <td>
                <!-- show the nerd (uses the show method found at GET /nerds/{id} -->
                    <a class="btn btn-small btn-primary" href="{{ URL::to('historico/' . $value->nome) }}">Histórico</a>
                </td>
            </tr>
        @endforeach
        </tbody>
    </table>
@stop

@section('footer-sistema')
    <script>
        $('.datatable').DataTable({
            "bSort" : false,
            "language": {
                "sProcessing":    "Processando...",
                "sLengthMenu":    "Mostrar _MENU_ registros",
                "sZeroRecords":   "Não foi encontrado nenhum título",
                "sEmptyTable":    "Nenhum título cadastrado <div><a class='btn btn-success' href=\"{{ URL::to('cadastro') }}\"> Cadastrar título</a></div>",
                "sInfo":          "Total de _TOTAL_ títulos",
                "sInfoEmpty":     "Registros de 0 a 0 de um total de 0 registros",
                "sInfoFiltered":  "(filtrado de um total de _MAX_ registros)",
                "sInfoPostFix":   "",
                "sSearch":        "Buscar:",
                "sUrl":           "",
                "sInfoThousands":  ",",
                "sLoadingRecords": "Carregando...",
                "oPaginate": {
                    "sFirst":    "Primeiro",
                    "sLast":    "Último",
                    "sNext":    "Seguinte",
                    "sPrevious": "Anterior"
                },
                "oAria": {
                    "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
                    "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                }
            }
        });
    </script>

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