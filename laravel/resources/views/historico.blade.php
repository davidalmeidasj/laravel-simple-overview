@extends('layouts.sistema.master')

@section('title', 'Titulos')

@section('sidebar')
    {{--@parent--}}

@stop

@section('head-sistema')
    <link rel="stylesheet" href="{{URL::asset('css/demo.css')}}">
    <link rel="stylesheet" href="{{URL::asset('css/form-register.css')}}">
    {{--<link rel="stylesheet" href="{{URL::asset('')}}">--}}
    <style>
        #scroll-to-top-button {
            background-color: #004880;
            bottom: 0;
            color: #fff;
            cursor: pointer;
            display: none;
            position: fixed;
            right: 0;
            text-align: center;
            vertical-align: center;
            height: 30px;
            width: 27px;
        }

        #scroll-to-top-button h3 {
            color: #fff;
            font-size: 13pt;
            margin-left: 5%;
            margin-top: 23%;
        }

        .danger-tr{
            background-color: #F2DEDE !important;
            color: #AA0000;
        }
    </style>
@stop

@section('menu-lateral-attr')
    style="display: none"
@stop
@section('content')
    <h1>Historico do título : {{$nome}}</h1>

    <!-- Modal -->
    <div class="modal fade" id="modalConfirmDelete" role="dialog">
        <div class="modal-dialog">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-body">
                    <div>
                        <div style="margin: 0 30px 0 20px;color: #5bc0de;font-size: 50px;vertical-align: middle;" class="pull-left icon-big info"><i class="glyphicon glyphicon-question-sign"></i></div>
                        <h4 style="color: #004880; font-weight: bold;">Atenção!</h4>
                        <p>Deseja excluir esse título?</p>
                    </div>
                </div>
                <div style="background-color: #F0F0F0;border: 0 none;border-top-left-radius: 0;border-top-right-radius: 0;padding: 6px;text-align: right;" class="modal-footer">
                    <button data-dismiss="modal" id='btnYes' class="btn btn-primary" type="button">Sim</button>
                    <button data-dismiss="modal" id='btnNo' class="btn btn-default" type="button">Não</button>
                </div>
            </div>

        </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="modalCadastro" role="dialog">
        <div class="modal-dialog">
            <!-- Modal content-->
            <div class="modal-content">
                {{-- Modal Header--}}
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Variação do título: {{$nome}}</h4>
                </div>
                <div class="modal-body">
                    <div>
                        <div class="row">
                            {!! Form::open(array('url' => '/cadastro', 'method' => 'POST', 'class' => 'form-horizontal')) !!}
                                <div class="form-group">
                                    <label class="col-md-5 control-label" for="nome">Título:</label>
                                    <div class="col-md-4">
                                        {{Form::text('titulo', $nome, array('class' => ' form-control', 'id' => 'nome', 'readonly' => 'true'))}}
                                    </div>
                                </div>
                                <div class="form-group form-field">
                                    <label class="col-md-5 control-label" for="info">Data cadastro:</label>
                                    <div class="col-md-4">
                                        {{--<span>Data de cadastro</span>--}}
                                        {{Form::text('data_cadastro', '', array('class' => 'datepicker form-control clearinput', 'id' => 'info'))}}
                                    </div>
                                </div>
                                <div class="form-group form-field">
                                    <label class="col-md-5 control-label" for="vencimento">Data vencimento:</label>
                                    <div class="col-md-4">
                                        {{Form::text('data_vencimento', formatDate($dataVencimento, "PT"), array('class' => 'datepicker form-control', 'id' => 'vencimento', 'readonly' => 'true'))}}
                                    </div>
                                </div>
                                <div class="form-group form-field">
                                    <label class="col-md-5 control-label" for="compra">Valor de compra:</label>
                                    <div class="col-md-4">
                                        {{--<span>Data de cadastro</span>--}}
                                        {{Form::text('valor_compra', '', array('class' => 'money form-control clearinput', 'id' => 'compra' , 'required'))}}
                                    </div>
                                </div>
                                <div class="form-group form-field">
                                    <label class="col-md-5 control-label" for="venda">Valor de venda:</label>
                                    <div class="col-md-4">
                                        {{Form::text('valor_venda', '', array('class' => 'money form-control clearinput', 'id' => 'venda', 'required'))}}
                                    </div>
                                </div>
                                <div class="form-group form-field">
                                    <label class="col-md-5 control-label" for="taxaAno">Taxa % a.a:</label>
                                    <div class="col-md-4">
                                        {{Form::text('porcentagem', '', array('class' => 'form-control money clearinput', 'id' => 'taxaAno', 'required'))}}
                                    </div>
                                </div>
                                <div class="form-group form-field">
                                    <label class="col-md-5 control-label" for=""></label>
                                    <div class="col-md-4">
                                        {{Form::button('Cadastrar', array('type' => 'submit', 'class' => 'btn btn-success'))}}
                                    </div>
                                </div>
                            {!! Form::close() !!}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>

    <!-- will be used to show any messages -->
    @if (Session::has('message'))
        <div class="alert alert-info">{{ Session::get('message') }}</div>
    @endif

    <table id="example" class="table table-striped header-fixed">
        <thead class="thead-fixed">
            <tr>
                <th>Id</th>
                <th>Título</th>
                <th>Valor de compra</th>
                <th>Valor de venda</th>
                <th>Data cadastrado</th>
                <th>Data vencimento</th>
                <th>Ação</th>
            </tr>
        </thead>
        <tbody>
        @foreach($titulos as $key => $value)
            <tr>
                <td>{{ $value->id }}</td>
                <td>{{ $value->nome }}</td>
                <td>{{ $value->valor_compra }}</td>
                <td>{{ $value->valor_venda }}</td>
                <td>{{ formatDate($value->data_info, "PT") }}</td>
                <td>{{ formatDate($value->data_vencimento, "PT") }}</td>

                <!-- we will also add show, edit, and delete buttons -->
                <td>
                <!-- show the nerd (uses the show method found at GET /nerds/{id} -->
                    <a class="btn btn-small btn-warning" href="{{ URL::to('editar/' . $value->id) }}">Editar</a>
                    <button class="btn btn-small btn-danger delete" href="{{ URL::to('excluir/' . $value->id . '/' . $value->nome) }}">Excluir</button>
                </td>
            </tr>
            <div style="display: none">
                {{$array[$int]['ano'] = (getYear($value->data_info))}}
                {{$array[$int]['mes'] = (getMonth($value->data_info)) - 1}}
                {{$array[$int]['dia'] = (getDay($value->data_info))}}
                {{$array[$int]['venda'] = $value->valor_venda}}
                {{$int++}}
            </div>
        @endforeach
        </tbody>
    </table>

    <div id="chart_div"></div>

    <div id="jsonencode" style="display: none">{{ arrayToJson($array)}}</div>


    <div id="scroll-to-top-button" style="display: block;">
        <h3 class="glyphicon glyphicon-chevron-up icone-primary"></h3>
    </div>
@stop

@section('footer-sistema')
    <script src="{{ URL::asset('Lib/pluginsControl.js') }}" type="text/javascript"></script>

    <script>
        $('.datepicker').setMascara('##/##/####').datepicker({
            format: 'dd/mm/yyyy',
            language: 'pt-BR',
            orientation: "top left",
            clearBtn: true,
            todayHighlight: true,
            autoclose: true
        }).on('blur', function () {
            // dataValida @see public/Lib/jquery/jquery.util.js
            if (!$.dataValida(this.value)) {
                this.value = '';
            }
        });
    </script>

    <script>
        var href, tr;
        $('.delete').on('click', function () {
            $('#modalConfirmDelete').modal();
            tr = $(this).closest('tr');
            tr.addClass('danger-tr')
            href = $(this).attr('href');
        });

        function Yes() {
            $('#modalConfirmDelete').modal();
            window.location.href = href;
        }
        function No() {
            tr.removeClass('danger-tr');
            $('#modalConfirmDelete').modal();
        }
        $('#btnYes').on('click',Yes);
        $('#btnNo').on('click', No);

        $('#modalConfirmDelete').on('hide.bs.modal', function () {
            tr.removeClass('danger-tr');
        });
    </script>

    <script>
        $('#example').DataTable({
            "bSort" : false,
            "language": {
                "sProcessing":    "Processando...",
                "sLengthMenu":    "Mostrar _MENU_ registros",
                "sZeroRecords":   "Não foi encontrado nenhum título",
                "sEmptyTable":    "Nenhum título encontrado",
                "sInfo":          "Registros de _START_ a _END_ de um total de _TOTAL_ registros <button data-toggle=\"popover\" data-trigger=\"hover\" data-content=\"Inserir variação para o título\" class=\"btn btn-success btn-sm popoverlink\"><i class=\"glyphicon glyphicon-plus-sign\"></i></button>",
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

        var goToTop = {
            /**
             * Seletor do elemento HTML
             */
            selector: '#scroll-to-top-button',
            /**
             * Retorna o objeto jQuery do elemento HTML pelo seletor definido no objeto
             * @returns {jQuery} Objeto jQuery do elemento HTML
             */
            getDom: function () {
                return $(this.selector);
            },
            /**
             * Inicializa
             */
            init: function () {
                this.getDom().scrollToTopControl({refDom: $('#lista').get(0)});
            }
        };

        goToTop.init();
    </script>

    <script>
        $('[data-toggle="popover"]').popover();

        $('.money').mask('000.000.000.000.000,00', {reverse: true});

        $('.popoverlink').on('click', function () {
            $('.clearinput').datepicker('setDate', '');
            $('.clearinput').val('');
            $('#modalCadastro').modal();
        });
    </script>

    <script src="{{ URL::asset('Lib/googlecharts/loader.js') }}" type="text/javascript"></script>
    <script>
        google.charts.load('current', {packages: ['corechart', 'line'], 'language': 'pt'});
        google.charts.setOnLoadCallback(drawBasic);

        function drawBasic() {

            var data = new google.visualization.DataTable();

            data.addColumn('date', 'Month');
            data.addColumn('number', 'Valor do título (R$)');

            var jsonParse = JSON.parse($('#jsonencode').html());

            var array = [];

            $.each(jsonParse, function (a, b) {
                array.push(
                        [new Date(b.ano, b.mes, b.dia), parseFloat(b.venda)]
                );
            });

            data.addRows(array);

            var options = {
                hAxis: {
                    title: 'Data de cadastro',
                    format:'d/MM/y'
                },
                vAxis: {
                    title: 'Valor',
                    format: 'currency'
                },
                height: 400,
            };

            var chart = new google.visualization.LineChart(document.getElementById('chart_div'));

            chart.draw(data, options);
        }
    </script>
@stop