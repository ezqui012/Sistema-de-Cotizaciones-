<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    protected $table = 'enterprise';

    public $updated_at = null;
    public $created_at = null;

    protected $fillable = [
        'name_enterprise',
        'sector_enterprise',
        'nit_enterprise',
        'legal_representative',
        'phone_enterprise',
        'address_enterprise',
        'email_enterprise'
    ];

    protected $hidden = [
        'updated_at',
        'created_at'
    ];
}
