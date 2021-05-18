<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEnterpriseTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('enterprise', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id('id_enterprise');
            $table->string('name_enterprise', 100)->unique();
            $table->string('sector_enterprise', 75);
            $table->string('nit_enterprise', 15)->unique();
            $table->string('legal_representative', 100);
            $table->string('phone_enterprise', 8);
            $table->string('address_enterprise', 100);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('enterprise');
    }
}
