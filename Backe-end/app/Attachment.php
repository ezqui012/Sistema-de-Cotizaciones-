<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Attachment extends Model
{
    protected $table = 'attachment';

    public $updated_at = null;
    public $created_at = null;

    protected $fillable = [
        'id_attachment',
        'id_qd',
        'file_route',
    ];

    protected $hidden = [
        'updated_at',
        'created_at'
    ];
}
