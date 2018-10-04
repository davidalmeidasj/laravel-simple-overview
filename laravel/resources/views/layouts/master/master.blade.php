<!doctype html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="_token" content="{!! csrf_token() !!}"/>
        <title>@yield('title')</title>
        <link rel="stylesheet" href="{{URL::asset('Lib/bootstrap/css/bootstrap.min.css')}}">
        <link rel="stylesheet" href="{{URL::asset('Lib/bootstrap-datepicker/datepicker3.css')}}">
        <link rel="stylesheet" href="{{URL::asset('css/autocomplete.css')}}">
        <link rel="stylesheet" href="{{URL::asset('Lib/datatable/css/dataTables.bootstrap.min.css')}}">
        @yield('head')

        <link rel="stylesheet" href="{{URL::asset('angular/angular-csp.css')}}">
    </head>
    <body>
        @yield('body')
    </body>
    <footer>
        <script src="{{ URL::asset('Lib/jquery/jquery.min.js') }}" type="text/javascript"></script>
        <script src="{{ URL::asset('Lib/bootstrap/js/bootstrap.min.js') }}" type="text/javascript"></script>
        <script src="{{ URL::asset('Lib/jquery/jquery.util.min.js') }}" type="text/javascript"></script>
        <script src="{{ URL::asset('Lib/jquery.mask.min.js') }}" type="text/javascript"></script>
        <script src="{{ URL::asset('Lib/jquery-ui/js/jquery-ui-1.10.4.custom.js') }}" type="text/javascript"></script>
        <script src="{{ URL::asset('Lib/bootstrap-datepicker/bootstrap-datepicker.js') }}" type="text/javascript"></script>
        <script src="{{ URL::asset('Lib/bootstrap-datepicker/bootstrap-datepicker.pt-BR.js') }}" type="text/javascript"></script>
        <script src="{{ URL::asset('Lib/datatable/js/jquery.dataTables.min.js') }}" type="text/javascript"></script>
        <script src="{{ URL::asset('Lib/datatable/js/dataTables.bootstrap.min.js') }}" type="text/javascript"></script>
        @yield('footer')
        <script type="text/javascript">
            $.ajaxSetup({
                headers: { 'X-CSRF-Token' : $('meta[name=_token]').attr('content') }
            });
        </script>
    </footer>
</html>