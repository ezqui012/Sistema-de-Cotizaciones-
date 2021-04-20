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
            $table->id('id_unit');
            $table->bigInteger('id_faculty')->unsigned();
            $table->foreign('id_faculty')->references('id_faculty')->on('faculties');
            $table->string('name_unit', 100)->unique();
            $table->string('type', 14);
            $table->date('creation_date');
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
