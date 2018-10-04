<?php
namespace app\Support;


class Helpers
{
    public static function formatDecimal($string)
    {
        return str_replace(',', '.', str_replace('.', '', $string));
    }

    public static function formatDate($string, $format = 'EN')
    {
        if($format === 'EN') {
            return date('Y-m-d', strtotime(str_replace('/', '-', $string)));
        } else {
            return date('d/m/Y', strtotime(str_replace('-', '/', $string)));
        }
    }
    
    public static function getYear($string, $format = 'EN')
    {
        if($format === 'EN') {
            return date('Y', strtotime(str_replace('/', '-', $string)));
        } else {
            return date('Y', strtotime(str_replace('-', '/', $string)));
        }
    }
    public static function getMonth($string, $format = 'EN')
    {
        if($format === 'EN') {
            return date('m', strtotime(str_replace('/', '-', $string)));
        } else {
            return date('m', strtotime(str_replace('-', '/', $string)));
        }
    }
    public static function getDay($string, $format = 'EN')
    {
        if($format === 'EN') {
            return date('d', strtotime(str_replace('/', '-', $string)));
        } else {
            return date('d', strtotime(str_replace('-', '/', $string)));
        }
    }
    public static function arrayToJson($array)
    {
        return json_encode($array);
    }
}