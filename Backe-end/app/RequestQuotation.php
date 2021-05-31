<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RequestQuotation extends Model
{
    protected $table = 'request_quotation';

    public $updated_at = null;
    public $created_at = null;

    protected $fillable = [
        'id_request',
        'id',
        'business_name',
        'date',
        'status'
    ];

    protected $hidden = [
        'updated_at',
        'created_at'
    ];
}
