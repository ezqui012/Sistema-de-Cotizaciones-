<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRequestDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('request_details', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->bigInteger('id_request')->unsigned();
            $table->foreign('id_request')->references('id_request')->on('request_quotation');
            $table->bigInteger('id_item')->unsigned();
            $table->foreign('id_item')->references('id_item')->on('expense_item');
            $table->integer('quantity');
            $table->decimal('total_cost', 10,2);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('request_details');
    }
}
