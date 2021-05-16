<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExpenseItemTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('expense_item', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id('id_item');
            $table->string('name_item', 75)->unique();
            $table->string('type_item', 75);
            $table->string('unit_item', 5);
            $table->decimal('unit_cost', 10,2);
            $table->string('description_item', 100);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('expense_item');
    }
}
