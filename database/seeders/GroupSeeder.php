<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Group;

class GroupSeeder extends Seeder
{
    public function run()
    {
        Group::create(['name' => 'Grupo A']);
        Group::create(['name' => 'Grupo B']);
    }
}
