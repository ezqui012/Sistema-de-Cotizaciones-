<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Binnacle extends Model
{
    protected $table = 'binnacle';

    public $updated_at = null;
    public $created_at = null;

    protected $fillable = [
        'id_binnacle',
        'table_name',
        'action',
        'date',
        'new_data',
        'old_data'
    ];

    protected $hidden = [
        'updated_at',
        'created_at'
    ];
}
