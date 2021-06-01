<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangePropertyToExpenseItemTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('expense_item', function (Blueprint $table) {
            $table->string('type_item', 30)->change();
            $table->string('unit_item', 10)->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('expense_item', function (Blueprint $table) {
            $table->string('type_item', 75)->change();
            $table->string('unit_item', 5)->change();
        });
    }
}
