@extends('layouts.master.master')
@section('head')
    <link href="{{ URL::asset('css/login.css') }}" rel="stylesheet" type="text/css" />
@stop

@section('body')
    <!-- Where all the magic happens -->
    <!-- LOGIN FORM -->
    <div id="login" class="text-center" style="padding:50px 0">
        <div class="logo">login</div>
        <!-- Main Form -->
        <div class="login-form-1">
            <form id="login-form" class="text-left">
                <div class="login-form-main-message"></div>
                <div class="main-login-form">
                    <div class="login-group">
                        <div class="form-group">
                            <label for="lg_username" class="sr-only">Username</label>
                            <input type="text" class="form-control" id="lg_username" name="lg_username" placeholder="username">
                        </div>
                        <div class="form-group">
                            <label for="lg_password" class="sr-only">Password</label>
                            <input type="password" class="form-control" id="lg_password" name="lg_password" placeholder="password">
                        </div>
                        <div class="form-group login-group-checkbox">
                            <input type="checkbox" id="lg_remember" name="lg_remember">
                            <label for="lg_remember">remember</label>
                        </div>
                    </div>
                    <button type="submit" class="login-button"><i class="fa fa-chevron-right"></i></button>
                </div>
                {{--<div class="etc-login-form">--}}
                    {{--<p>forgot your password? <a data-toggle="modal" data-target="#forgotPass" href="#">click here</a></p>--}}
                    {{--<p>new user? <a data-toggle="modal" data-target="#newAcc" href="#">create new account</a></p>--}}
                {{--</div>--}}
            </form>
        </div>
        <!-- end:Main Form -->
    </div>

    <!-- REGISTRATION FORM -->
    <!-- Modal -->
    @include('layouts.login.modal_novo_login')


    <!-- Modal -->
    @include('layouts.login.modal_esqueci_login')

@stop

@section('footer')
    <script src="{{ URL::asset('js/login.js') }}" type="text/javascript"></script>
@stop
