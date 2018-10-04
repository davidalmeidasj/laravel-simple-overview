<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Titulos extends Model
{
    protected $table = 'titulos';
    protected $fillable = array('id', 'nome',
        'data_info', 'data_vencimento', 'valor_compra', 'valor_venda', 'porcentagem');

    /**
     * Set the titulos's name.
     *
     * @param  string  $value
     * @return string
     */
    public function setNomeAttribute($value)
    {
        $this->attributes['nome'] = trim($value);
    }
}
