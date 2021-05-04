<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AssignedPermit extends Model
{
    protected $table='assigned_permissions';

    public $updated_at = null;
    public $created_at = null;

    protected $fillable = [

        'id_permission',
        'id_role',
        'assigned_date'
    ];

    protected $hidden = [
        'updated_at',
        'created_at',
        'assigned_date'
    ];
}
