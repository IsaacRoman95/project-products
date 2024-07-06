<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(GroupSeeder::class);
        $this->call(SubGroupSeeder::class);
        $this->call(ProductSeeder::class);
    }
}
