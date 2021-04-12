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
            $table->bigInteger('id_permission')->unsigned();
            $table->foreign('id_permission')->references('id_permission')->on('permissions');
            $table->bigInteger('id_role')->unsigned();
            $table->foreign('id_role')->references('id_role')->on('roles');
            $table->date('assigned_date');
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
