<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBinnacleTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('binnacle', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id('id_binnacle');
            $table->string('table_name', 30);
            $table->string('action', 15);
            $table->date('date');
            $table->text('new_data');
            $table->text('old_data')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('binnacle');
    }
}
