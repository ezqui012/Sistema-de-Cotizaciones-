<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class QuoteDetail extends Model
{
    protected $table = 'quote_detail';

    public $updated_at = null;
    public $created_at = null;

    protected $fillable = [
        'id_qd',
        'id_enterprise',
        'id_item',
        'id_quotation',
        'quantity',
        'unit_cost',
        'date',
        'delivery_days'
    ];

    protected $hidden = [
        'updated_at',
        'created_at'
    ];
}
