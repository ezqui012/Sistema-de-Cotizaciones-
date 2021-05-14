<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateQuoteDetailTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('quote_detail', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id('id_qd');
            $table->bigInteger('id_enterprise')->unsigned();
            $table->foreign('id_enterprise')->references('id_enterprise')->on('enterprise');
            $table->bigInteger('id_item')->unsigned();
            $table->foreign('id_item')->references('id_item')->on('expense_item');
            $table->bigInteger('id_quotation')->unsigned();
            $table->foreign('id_quotation')->references('id_quotation')->on('quotation');
            $table->integer('quantity');
            $table->decimal('unit_cost', 10,2);
            $table->date('date');
            $table->integer('delivery_days');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('quote_detail');
    }
}
