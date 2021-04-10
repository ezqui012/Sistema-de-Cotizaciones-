<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FacultiesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('faculties')->insert([
            [
                'namefaculty' => 'Ciencias y tecnologia'
            ]
        ]);
    }
}
