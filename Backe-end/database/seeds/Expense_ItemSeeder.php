<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class Expense_ItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('expense_item')->insert([
            [
                'name_item' => 'Sillas de escritorio',
                'type_item' => 'Material de oficina',
                'unit_item' => 'unid',
                'unit_cost' => 300,
                'description_item' => 'Silla ergonomica giratoria para escritorios'
            ],
            [
                'name_item' => 'Papel bond tamaño carta',
                'type_item' => 'Material de oficina',
                'unit_item' => 'unid',
                'unit_cost' => 60,
                'description_item' => 'Paquete de 500 hojas blancas bond tamaño carta'
            ],
            [
                'name_item' => 'Monitores 20 pulgadas',
                'type_item' => 'Electrodomestico',
                'unit_item' => 'unid',
                'unit_cost' => 600,
                'description_item' => 'Monitor LG de 20 pulgadas color negro con una entrada HDMI'
            ],
            [
                'name_item' => 'Reloj de oficina',
                'type_item' => 'Material de oficina',
                'unit_item' => 'unid',
                'unit_cost' => 95,
                'description_item' => 'Reloj digital marca Samsung para escritorios'
            ],
            [
                'name_item' => 'Mouse inalambrico',
                'type_item' => 'Equipo de computación',
                'unit_item' => 'unid',
                'unit_cost' => 120,
                'description_item' => 'Mouse optico inalambrico con un rango de alcance de 3 metros'
            ],
            [
                'name_item' => 'Imperesora',
                'type_item' => 'Material de oficina',
                'unit_item' => 'unid',
                'unit_cost' => 1200,
                'description_item' => 'Impresora marca EPSON Eco Tank serie L120'
            ],
            [
                'name_item' => 'Sillas de plastico trenzada',
                'type_item' => 'Muebles',
                'unit_item' => 'unid',
                'unit_cost' => 80,
                'description_item' => 'Silla trenzada marca la papelera'
            ]
        ]);
    }
}
