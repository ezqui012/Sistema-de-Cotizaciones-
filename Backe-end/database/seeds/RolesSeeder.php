<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('roles')->insert([
            [
                'name_role' => 'Admin',
                'description_role' => 'Encargado de administrar los permisos y personal'
            ]
        ]);
    }
}
