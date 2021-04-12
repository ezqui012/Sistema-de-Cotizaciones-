<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class UnitsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $now = Carbon::now();

        DB::table('units')->insert([
            [
                'id_faculty' => 1,
                'name_unit' => 'Administrador de sistema',
                'type' => 'Administrativa',
                'creation_date' => $now->format('Y-m-d')
            ]
        ]);
    }
}
