<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('permissions')->insert([
            [
                'name_permission' => 'Crear cotizacion'
            ],
            [
                'name_permission' => 'Editar cotizacion'
            ],
            [
                'name_permission' => 'Aprobar solicitudes'
            ],
            [
                'name_permission' => 'Crear solicitudes'
            ],
            [
                'name_permission' => 'Editar solicitudes'
            ],
            [
                'name_permission' => 'Ver lista de solicitudes'
            ],
            [
                'name_permission' => 'Registrar item de gasto'
            ],
            [
                'name_permission' => 'Registrar empresas'
            ],
            [
                'name_permission' => 'Super usuario'
            ]
        ]);
    }
}
