<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Faculty extends Model
{
    protected $table = 'faculties';

    public $updated_at = null;
    public $created_at = null;

    protected $fillable = [
        'name_faculty',
        'phone_faculty',
        'email_faculty',
        'address_faculty',
        'dean_faculty'
    ];

    protected $hidden = [
        'updated_at',
        'created_at'
    ];
}
