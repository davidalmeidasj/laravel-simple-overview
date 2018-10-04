<html>
    <head>
        <title>@yield('title')</title>
        <link rel="stylesheet" href="http://www.atlasestateagents.co.uk/css/tether.min.css">
        <script src="http://www.atlasestateagents.co.uk/javascript/tether.min.js"></script>
        <link rel="stylesheet" href="{{URL::asset('css/page.css')}}">
        <link rel="stylesheet" href="{{ URL::asset('css/accordion-menu.css') }}">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.2/css/bootstrap.min.css" integrity="sha384-y3tfxAZXuh4HwSYylfB+J125MxIs6mR5FOHamPBG064zB+AFeWH94NdvaCBm8qnd" crossorigin="anonymous">
        <script type="text/javascript" src="{{ URL::asset('js/accordion-menu.js') }}"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.2/js/bootstrap.min.js" integrity="sha384-vZ2WRJMwsjRMW/8U7i6PWi6AlO1L79snBrmgiDpgIWJ82z8eA5lenwvxbMV1PAh7" crossorigin="anonymous"></script>

    </head>
    <body>
    <header>
        <a class="logo" href="analito">Home</a>
        <span id="top-nav">
            <a style="margin-right: 10%;">Usuário</a>
        </span>
    </header>
    <div class="row">
        <div class="col-md-12">
            <div id="accordion" class="col-xs-4">
                    <ul>
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
            <div class="col-xs-6">.col-xs-6<br>Subsequent columns continue along the new line.</div>
        </div>
    </div>
        <div style="width:40%;">

        </div>

        <div style="max-width:820px;margin:0 auto;">
            <div style="max-width:430px;padding-left:70px;">

                @section('sidebar')
                    This is the master sidebar.
                @show

                <div class="container">
                    @yield('content')
                </div>
            </div>
            <div style="height:80px;clear:both;"></div>
        </div>
    </body>
</html>