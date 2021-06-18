<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHistoryAmountTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('history_amount', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id('id_history');
            $table->bigInteger('id_unit')->unsigned();
            $table->foreign('id_unit')->references('id_unit')->on('units');
            $table->string('management', 15);
            $table->decimal('amount', 10,2);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('history_amount');
    }
}
