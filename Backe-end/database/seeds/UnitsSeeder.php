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
                'idfaculty' => 1,
                'nameunit' => 'Administrador de sistema',
                'type' => 'Administrativa',
                'creationdate' => $now->format('Y-m-d')
            ]
        ]);
    }
}
