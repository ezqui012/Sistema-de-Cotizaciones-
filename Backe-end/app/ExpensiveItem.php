<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ExpensiveItem extends Model
{
    protected $table = 'expense_item';

    public $updated_at = null;
    public $created_at = null;

    protected $fillable = [
        'id_item',
        'name_item',
        'type_item',
        'unit_item',
        'unit_cost',
        'description_item',
        'subtype_item'
    ];

    protected $hidden = [
        'updated_at',
        'created_at'
    ];
}
