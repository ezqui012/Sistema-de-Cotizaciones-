<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Enterprise extends Model
{
    protected $table = 'enterprise';

    public $updated_at = null;
    public $created_at = null;

    protected $fillable = [
        'id_enterprise',
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
