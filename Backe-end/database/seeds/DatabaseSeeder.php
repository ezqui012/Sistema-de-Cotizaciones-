<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
     {
        $this->call(FacultiesSeeder::class);
        $this->call(UnitsSeeder::class);
        $this->call(PermissionsSeeder::class);
        $this->call(RolesSeeder::class);
        $this->call(Assigned_PermissionsSeeder::class);
        $this->call(UsersSeeder::class);
        $this->call(Expense_ItemSeeder::class);
        $this->call(EnterpriseSeeder::class);
    }
}
