<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Roles extends Model
{
    protected $table='roles';

    public $updated_at = null;
    public $created_at = null;

    protected $fillable = [
        //'id_role',
        'name_role',
        'description_role'
    ];

    protected $hidden = [
        'updated_at',
        'created_at'
    ];
}
