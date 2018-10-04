@extends('layouts.master.master')
@section('head')
    <link rel="stylesheet" href="{{URL::asset('css/page.css')}}">
    <link rel="stylesheet" href="{{ URL::asset('css/accordion-menu.css') }}">
    @yield('head-sistema')
    <style>
        #scroll-to-menu {
            background-color: #004880;
            top: 0;
            color: #fff;
            cursor: pointer;
            display: none;
            position: fixed;
            left: 0;
            text-align: center;
            vertical-align: center;
            height: 30px;
            width: 27px;
            z-index: 1;
        }

        #scroll-to-menu h3 {
            color: #fff;
            font-size: 13pt;
            margin-right: 5%;
            margin-top: 23%;
        }

        #popup {
            display:none;
            z-index: 1;
            background-color: white;
        }
    </style>
@stop

@section('body')
    <header>
        <a class="logo" href="{{ URL::to('') }}">Listagem de títulos</a>
        <a class="logo" href="{{ URL::to('cadastro') }}">Novos títulos</a>
        <a class="logo" href="{{ URL::to('cadastro') }}">Listagem Produtos</a>
        {{--<span id="top-nav">--}}
            {{--<a style="margin-right: 10%;">Usuário</a>--}}
        {{--</span>--}}
    </header>
    <div id="scroll-to-menu" style="display: block;">
        <h3 class="glyphicon glyphicon-list-alt icone-primary"></h3>
    </div>
    <div id="popup">
        <a class="logo2" href="/">Listagem de títulos</a><br>
        <a class="logo2" href="/cadastro">Novos títulos</a>
    </div>
    <div style="margin: 0;" class="row">
        <div class="col-md-12">
            <div id="accordion" class="col-xs-2" @yield('menu-lateral-attr')>
                <ul>
                    <li>
                        <div>Home</div>
                        <ul>
                            <li><a href="?21">index</a></li>
                        </ul>
                    </li>
                    <li>
                        <div>Quis Porttitor</div>
                        <ul>
                            <li><a href="?21">Finibus Bonorum</a></li>
                            <li><a href="?22">Sed ut</a></li>
                            <li><a href="?23">Neque porro</a></li>
                        </ul>
                    </li>
                    <li>
                        <div>Quis Porttitor</div>
                        <ul>
                            <li><a href="?21">Finibus Bonorum</a></li>
                            <li><a href="?22">Sed ut</a></li>
                            <li><a href="?23">Neque porro</a></li>
                        </ul>
                    </li>
                    <li>
                        <div>Quis Porttitor</div>
                        <ul>
                            <li><a href="?21">Finibus Bonorum</a></li>
                            <li><a href="?22">Sed ut</a></li>
                            <li><a href="?23">Neque porro</a></li>
                        </ul>
                    </li>
                    <li>
                        <div>Quis Porttitor</div>
                        <ul>
                            <li><a href="?21">Finibus Bonorum</a></li>
                            <li><a href="?22">Sed ut</a></li>
                            <li><a href="?23">Neque porro</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="col-md-12">
                <div class="container">
                    @yield('content')
                </div>
            </div>
        </div>
    </div>
    <div style="width:40%;">

    </div>

    <div style="max-width:820px;margin:0 auto;">
        <div style="max-width:430px;padding-left:70px;">

            <div class="container">
                @yield('grafico')
            </div>
        </div>
        <div style="height:80px;clear:both;"></div>
    </div>
@stop

@section('footer')
    <script type="text/javascript" src="{{ URL::asset('js/accordion-menu.js') }}"></script>
    @yield('footer-sistema')
    <script>
        function hideDiv(){

            if ($(window).width() < 591) {
                $("#scroll-to-menu").show();
            }else{
                $("#scroll-to-menu").hide();
                $("#popup").hide();
            }

        };

        //run on document load and on window resize
        $(document).ready(function () {
            $('#scroll-to-menu').click(function (e) {
                if($('#popup').css('display') == 'none') {
                    $("#popup").css({
                        'position': 'absolute',
                        'left': $(this).offset().left,
                        'top': $(this).offset().top + $(this).height() + 5
                    }).show(400);
                    $('.container').css({
                        'background-color': '#e3e3e3',
                        'opacity': '0.5',
                    });
                } else {
                    hidePopup(400);
                };
            });

            function hidePopup(delay) {
                $("#popup").hide(delay);
                $('.container').css({
                    'background-color': 'white',
                    'opacity': '1',
                });
            };

            $('.container').click(function (e) {
                hidePopup(400);
            });

            //on load
            hideDiv();

            //on resize
            $(window).resize(function(){
                hideDiv();
            });

            $(window).scroll(function () {
                hidePopup(0);
            });

        });
    </script>
@stop
