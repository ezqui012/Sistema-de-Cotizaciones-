<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Faculty extends Model
{
    protected $table = 'faculties';

    protected $fillable = [
        'name_faculty'
    ];

    protected $hidden = [
        'updated_at',
        'created_at'
    ];
}
