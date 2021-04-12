<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            [
                'id_role' => 1,
                'id_unit' => 1,
                'name' => 'Rylmar Quispe',
                'username' => 'admin',
                'phone' => '4215569',
                'ci' => '5541874',
                'address' => 'Av. Circunvalacion',
                'password' => Hash::make('admin1234'),
                'email' => 'adminumss@gmail.com'
            ]
        ]);
    }
}
