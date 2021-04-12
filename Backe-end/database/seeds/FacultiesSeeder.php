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
                'name_faculty' => 'Ciencias y tecnologia'
            ],
            [
                'name_faculty' => 'Ciencias económicas'
            ],
            [
                'name_faculty' => 'Humanidades y ciencias de educación'
            ],
            [
                'name_faculty' => 'Arquitectura y ciencias del habitat'
            ],
            [
                'name_faculty' => 'Ciencias juridicas y politicas'
            ]
        ]);
    }
}
