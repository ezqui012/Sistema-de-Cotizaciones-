<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class Assigned_PermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $now = Carbon::now();

        DB::table('assigned_permissions')->insert([
            [
                'id_permission' => 9,
                'id_role' => 1,
                'assigned_date' => $now->format('Y-m-d')
            ]
        ]);
    }
}
