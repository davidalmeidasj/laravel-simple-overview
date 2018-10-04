@extends('layouts.master.master')
@section('head')
    <link href="{{ URL::asset('css/ddmenu.css') }}" rel="stylesheet" type="text/css" />
    <style>
        /*The following are for this demo page only (not required for the ddmenu).*/
        body { padding-top:90px;}
    </style>
@stop

@section('body')
    <nav id="ddmenu">
        <ul>
            <li class="full-width nav-select">
                <span class="top-heading">Unde Omnis</span>
                <i class="caret"></i>
                <div class="dropdown">
                    <div class="dd-inner">
                        <ul class="column">
                            <li><h3>Lorem Ipsum</h3></li>
                            <li><a href="#">Dolor sit amet</a></li>
                            <li><a href="#">Consectetur elit</a></li>
                            <li><a href="#">Etiam massa</a></li>
                            <li><a href="#">Suscipit sapien</a></li>
                            <li><a href="#">Quis turpis</a></li>
                        </ul>
                        <ul class="column">
                            <li><h3>Etiam Massa</h3></li>
                            <li><a href="#">Sed interdum</a></li>
                            <li><a href="#">Fringilla congue</a></li>
                            <li><a href="#">Dolor nisl auctor</a></li>
                            <li><a href="#">Quisque dictum</a></li>
                            <li><a href="#">Porttitor</a></li>
                        </ul>
                        <ul class="column mayHide">
                            <li><br /><img src="{{ URL::asset('img/img1.jpg') }}" /></li>
                        </ul>
                    </div>
                </div>
            </li>
            <li class="no-sub nav-select"><a class="top-heading" href="http://www.google.com">Quisque</a></li>
            <li>
                <a class="top-heading" href="http://www.microsoft.com">Link</a>
                <i class="caret"></i>
                <div class="dropdown">
                    <div class="dd-inner">
                        <ul class="column">
                            <li><h3>Vestibulum Ut</h3></li>
                            <li><a href="#">Nunc pharetra</a></li>
                            <li><a href="#">Vestibulum ante</a></li>
                            <li><a href="#">Nulla id laoreet</a></li>
                            <li><a href="#">Elementum blandit</a></li>
                        </ul>
                    </div>
                </div>
            </li>
            <li class="nav-select">
                <span class="top-heading">Accusantium</span>
                <i class="caret"></i>
                <div class="dropdown offset300">
                    <div class="dd-inner">
                        <ul class="column">
                            <li><h3>Pellentesque</h3></li>
                            <li><a href="#">Fermentum ut nulla</a></li>
                            <li><a href="#">Duis ut mauris</a></li>
                            <li><h3>Volutpat</h3></li>
                            <li><a href="#">Quisque dictum</a></li>
                            <li><a href="#">Nulla scelerisque</a></li>
                        </ul>
                        <ul class="column">
                            <li><h3>Suspendisse</h3></li>
                            <li><a href="#">Suspendisse potenti</a></li>
                            <li><a href="#">Curabitur in mauris</a></li>
                            <li><a href="#">Phasellus ultrices</a></li>
                            <li><a href="#">Quisque ornare</a></li>
                            <li><a href="#">Vestibulum</a></li>
                            <li><a href="#">Vitae tempus risus</a></li>
                        </ul>
                        <ul class="column mayHide">
                            <li><br /><img src="{{ URL::asset('img/img2.jpg') }}" /></li>
                        </ul>
                    </div>
                </div>
            </li>
            <li class="no-sub nav-select">
                <a class="top-heading" href="#">Dignissim</a>
            </li>
            <li class="nav-select">
                <span class="top-heading nav-select">Laudantium</span>
                <i class="caret"></i>
                <div class="dropdown right-aligned">
                    <div class="dd-inner">
                        <ul class="column">
                            <li><h3>Nam a leo</h3></li>
                            <li><a href="#">Vel faucibus leo</a></li>
                            <li><a href="#">Duis ut mauris</a></li>
                            <li><a href="#">In tempus semper</a></li>
                            <li><a href="#">laoreet erat</a></li>
                        </ul>
                        <ul class="column">
                            <li><h3>Proin iaculis</h3></li>
                            <li><a href="#">In tempus semper</a></li>
                            <li><a href="#">Hendrerit tincidunt</a></li>
                            <li><a href="#">Duis ut mauris</a></li>
                            <li><a href="#">pretium amet</a></li>
                        </ul>
                    </div>
                </div>
            </li>
        </ul>
    </nav>

    <div class="container">
        @yield('content')
    </div>
@stop

@section('footer')
    <script src="{{ URL::asset('js/ddmenu.js') }}" type="text/javascript"></script>
@stop
