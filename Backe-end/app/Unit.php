<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Unit extends Model
{
    protected $table = 'units';

    protected $fillable = [
        'id_faculty',
        'name_unit',
        'type',
        'amount',
    ];
}
