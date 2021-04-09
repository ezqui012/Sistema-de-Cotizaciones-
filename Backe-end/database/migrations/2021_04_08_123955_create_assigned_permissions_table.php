<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAssignedPermissionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('assigned_permissions', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->bigInteger('idpermission')->unsigned();
            $table->foreign('idpermission')->references('idpermission')->on('permissions');
            $table->bigInteger('idrole')->unsigned();
            $table->foreign('idrole')->references('idrole')->on('roles');
            $table->date('assigneddate');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('assigned_permissions');
    }
}
