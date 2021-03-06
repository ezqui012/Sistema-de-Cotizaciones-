<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EnterpriseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('enterprise')->insert([
            [
                'name_enterprise' => 'World Computer',
                'sector_enterprise' => 'Tecnologia',
                'nit_enterprise' => '8455166598',
                'legal_representative' => 'Daniel Enrique Leaño Silva',
                'phone_enterprise' => '4115587',
                'address_enterprise' => 'Av. America Esq. Santa Cruz #154'
            ],
            [
                'name_enterprise' => 'Ambiente',
                'sector_enterprise' => 'Material de oficina',
                'nit_enterprise' => '5211458752',
                'legal_representative' => 'Valeria Delgadillo',
                'phone_enterprise' => '4471752',
                'address_enterprise' => 'Av. mariscal santa Cruz Esq. Calle Oruro S/N'
            ],
            [
                'name_enterprise' => 'Muebleria Perez',
                'sector_enterprise' => 'Muebles',
                'nit_enterprise' => '955845525',
                'legal_representative' => 'Emiliano Perez',
                'phone_enterprise' => '4885159',
                'address_enterprise' => 'Calle Juan Capriles #654'
            ],
            [
                'name_enterprise' => 'Electrodomesticos B&C',
                'sector_enterprise' => 'Electrodomesticos',
                'nit_enterprise' => '4875220585',
                'legal_representative' => 'Mariana Villaroel Herbas',
                'phone_enterprise' => '4255858',
                'address_enterprise' => 'Calle Juan Capriles #484 entre Pantaleon Dalence y AV. Santa Cruz'
            ],
            [
                'name_enterprise' => 'La Papelera',
                'sector_enterprise' => 'Productos plasticos',
                'nit_enterprise' => '452147852',
                'legal_representative' => 'Lucio Martinez',
                'phone_enterprise' => '4255441',
                'address_enterprise' => 'Calle Juan Capriles #484 entre Pantaleon Dalence y AV. Santa Cruz'
            ],
            [
                'name_enterprise' => 'Controlp',
                'sector_enterprise' => 'Tecnologia',
                'nit_enterprise' => '525188489',
                'legal_representative' => 'David Paes Lopez',
                'phone_enterprise' => '4251008',
                'address_enterprise' => 'Calle Juan Capriles #484 entre Pantaleon Dalence y AV. Santa Cruz'
            ]
        ]);
    }
}
