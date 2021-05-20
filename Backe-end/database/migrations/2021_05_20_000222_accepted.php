<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Accepted extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('accepted', function (Blueprint $table) {
            $table->bigInteger('id_request')->unsigned();
            $table->foreign('id_request')->references('id_request')->on('request_quotation');
            $table->bigInteger('id_qd')->unsigned();
            $table->foreign('id_qd')->references('id_qd')->on('quote_detail');
            $table->date('date');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('accepted');
    }
}
