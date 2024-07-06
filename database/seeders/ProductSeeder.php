<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Product::create([
            'name' => 'Producto 1',
            'price' => 10.50,
            'sub_group_id' => 1, 
        ]);

        Product::create([
            'name' => 'Producto 2',
            'price' => 25.75,
            'sub_group_id' => 2,
        ]);

        Product::create([
            'name' => 'Producto 3',
            'price' => 15.00,
            'sub_group_id' => 1,
        ]);
    }
}
