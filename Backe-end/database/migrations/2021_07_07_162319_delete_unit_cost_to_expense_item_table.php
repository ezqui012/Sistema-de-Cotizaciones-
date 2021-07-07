<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class DeleteUnitCostToExpenseItemTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('expense_item', function (Blueprint $table) {
            $table->decimal('unit_cost', 10,2)->default(0.0)->change();
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
            $table->decimal('unit_cost', 10,2)->change();
        });
    }
}
