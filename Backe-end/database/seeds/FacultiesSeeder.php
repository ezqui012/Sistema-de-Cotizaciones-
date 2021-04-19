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
                'name_faculty' => 'Ciencias y tecnologia',
                'phone_faculty' => '4231765',
                'email_faculty' => 'decanato@fcyt.umss.edu.bo',
                'address_faculty' => 'Calle Sucre frente al Parque La Torre',
                'dean_faculty' => 'Alfredo Cosio Papadopolis'
            ],
            [
                'name_faculty' => 'Ciencias económicas',
                'phone_faculty' => '4540245',
                'email_faculty' => 'faces@umss.edu.bo',
                'address_faculty' => 'Edif. Prototipo I, final c. Calama Este, Campus Central UMSS',
                'dean_faculty' => 'José Elmer Peter Pérez Amador'
            ],
            [
                'name_faculty' => 'Humanidades y ciencias de educación',
                'phone_faculty' => '4544102',
                'email_faculty' => 'decano@hum.umss.edu.bo',
                'address_faculty' => 'Plazuela Sucre acera Sud, Campus Central UMSS',
                'dean_faculty' => 'Antonio Cabrerizo Ríos'
            ],
            [
                'name_faculty' => 'Arquitectura y ciencias del habitat',
                'phone_faculty' => '4540438',
                'email_faculty' => 'fach@umss.edu.bo',
                'address_faculty' => 'Calle Julián María López',
                'dean_faculty' => 'Antonio Cabrerizo Ríos'
            ],
            [
                'name_faculty' => 'Ciencias juridicas y politicas',
                'phone_faculty' => '4541263',
                'email_faculty' => 'derecho@umss.edu.bo ',
                'address_faculty' => 'Av. Oquendo esq. Sucre',
                'dean_faculty' => 'Irma Ivanovik Corrales'
            ]
        ]);
    }
}
