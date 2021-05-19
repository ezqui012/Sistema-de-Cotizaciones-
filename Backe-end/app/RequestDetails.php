<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RequestDetails extends Model
{
    protected $table = 'request_details';

    public $updated_at = null;
    public $created_at = null;

    protected $fillable = [
        'id_request',
        'id_item',
        'quantity',
        'total_cost'
    ];

    protected $hidden = [
        'updated_at',
        'created_at'
    ];
}
