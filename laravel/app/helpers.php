<?php

    function formatDecimal($string)
    {
        return str_replace(',', '.', str_replace('.', '', $string));
    }

    function formatDate($string = null, $format = 'EN')
    {
        if($string) {
            if($format === 'EN') {
                return date('Y-m-d', strtotime(str_replace('/', '-', $string)));
            } else {
                return date('d/m/Y', strtotime(str_replace('-', '/', $string)));
            }
        }
    }

    function getYear($string, $format = 'EN')
    {
        if($format === 'EN') {
            return date('Y', strtotime(str_replace('/', '-', $string)));
        } else {
            return date('Y', strtotime(str_replace('-', '/', $string)));
        }
    }

    function getMonth($string, $format = 'EN')
    {
        if($format === 'EN') {
            return date('m', strtotime(str_replace('/', '-', $string)));
        } else {
            return date('m', strtotime(str_replace('-', '/', $string)));
        }
    }

    function getDay($string, $format = 'EN')
    {
        if($format === 'EN') {
            return date('d', strtotime(str_replace('/', '-', $string)));
        } else {
            return date('d', strtotime(str_replace('-', '/', $string)));
        }
    }
    
    function arrayToJson($array)
    {
        return json_encode($array);
    }