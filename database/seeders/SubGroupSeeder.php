<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\SubGroup;
use App\Models\Group;

class SubGroupSeeder extends Seeder
{
    public function run()
    {
        $groupA = Group::where('name', 'Grupo A')->first();

        SubGroup::create(['name' => 'SubGrupo 1', 'group_id' => $groupA->id]);
        SubGroup::create(['name' => 'SubGrupo 2', 'group_id' => $groupA->id]);
    }
}
