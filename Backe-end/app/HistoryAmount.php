<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class HistoryAmount extends Model
{
    protected $table = 'history_amount';

    public $updated_at = null;
    public $created_at = null;

    protected $fillable = [
        'id_history',
        'id_unit',
        'management',
        'amount'
    ];

    protected $hidden = [
        'updated_at',
        'created_at'
    ];
}
