<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Quotation extends Model
{
    protected $table = 'quotation';

    public $updated_at = null;
    public $created_at = null;

    protected $fillable = [
        'id_quotation',
        'id_request',
        'id',
        'status_quotation'
    ];

    protected $hidden = [
        'updated_at',
        'created_at'
    ];
}
