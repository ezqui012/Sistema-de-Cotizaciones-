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
                'namepermission' => 'Crear cotizacion'
            ],
            [
                'namepermission' => 'Editar cotizacion'
            ],
            [
                'namepermission' => 'Aprobar solicitudes'
            ],
            [
                'namepermission' => 'Crear solicitudes'
            ],
            [
                'namepermission' => 'Editar solicitudes'
            ],
            [
                'namepermission' => 'Ver lista de solicitudes'
            ],
            [
                'namepermission' => 'Registrar item de gasto'
            ],
            [
                'namepermission' => 'Registrar empresas'
            ],
            [
                'namepermission' => 'Super usuario'
            ]
        ]);
    }
}
