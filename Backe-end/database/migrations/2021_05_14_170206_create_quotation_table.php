<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateQuotationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('quotation', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id('id_quotation');
            $table->bigInteger('id_request')->unsigned();
            $table->foreign('id_request')->references('id_request')->on('request_quotation');
            $table->bigInteger('id')->unsigned();
            $table->foreign('id')->references('id')->on('users');
            $table->string('status_quotation', 12);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('quotation');
    }
}
