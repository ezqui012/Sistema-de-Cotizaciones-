<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Permit extends Model
{
    protected $table='permissions';

    public $updated_at = null;
    public $created_at = null;

    protected $fillable = [
        'id_permission',
        'name_permission'
    ];

    protected $hidden = [
        'updated_at',
        'created_at'
    ];
}
