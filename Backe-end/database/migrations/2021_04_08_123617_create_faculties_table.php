<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFacultiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('faculties', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id('id_faculty');
            $table->string('name_faculty', 100)->unique();
            $table->string('phone_faculty', 8);
            $table->string('email_faculty', 100);
            $table->string('address_faculty', 100);
            $table->string('dean_faculty', 100);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('faculties');
    }
}
