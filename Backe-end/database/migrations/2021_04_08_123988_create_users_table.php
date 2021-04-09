<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id('idUser');
            $table->bigInteger('idrole')->unsigned();
            $table->foreign('idrole')->references('idrole')->on('roles');
            $table->bigInteger('idunit')->unsigned();
            $table->foreign('idunit')->references('idunit')->on('units');
            $table->string('name', 100);
            $table->string('username', 50)->unique();
            $table->string('phone', 8);
            $table->string('ci', 9)->unique();
            $table->string('address', 100);
            $table->string('password', 70);
            $table->string('email', 100)->unique();
            $table->rememberToken();
            $table->timestamp('email_verified_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
