<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUnitsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('units', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id('idunit');
            $table->bigInteger('idfaculty')->unsigned();
            $table->foreign('idfaculty')->references('idfaculty')->on('faculties');
            $table->string('nameunit', 100)->unique();
            $table->string('type', 14);
            $table->date('creationdate');
            $table->decimal('amount', 10,2)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('units');
    }
}
