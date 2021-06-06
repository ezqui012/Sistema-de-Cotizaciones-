<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Accepted extends Model
{
    protected $table = 'accepted';

    public $updated_at = null;
    public $created_at = null;

    protected $fillable = [
        'id_request',
        'id_qd',
        'date',
        'id'
    ];

    protected $hidden = [
        'updated_at',
        'created_at'
    ];
}
