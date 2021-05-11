<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Unit extends Model
{
    protected $table = 'units';

    //public $timestamps = false;
    public $updated_at = null;
    public $created_at = null;

    protected $fillable = [
        'id_faculty',
        'name_unit',
        'type',
        'creation_date',
        'amount'
    ];

    protected $hidden = [
        'updated_at',
        'created_at'
    ];
}
