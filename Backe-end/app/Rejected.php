<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Rejected extends Model
{
    protected $table = 'rejected';

    public $updated_at = null;
    public $created_at = null;

    protected $fillable = [
        'id_rejected',
        'id_request',
        'reason',
        'date_rejected',
        'id'
    ];

    protected $hidden = [
        'updated_at',
        'created_at'
    ];
}
