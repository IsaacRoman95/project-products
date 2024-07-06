<?php

namespace App\Http\Controllers;

use App\Models\Subgroup;
use App\Models\Group;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubgroupController extends Controller
{
    public function index()
    {
        $subgroups = Subgroup::with('group')->get();
        return Inertia::render('Subgroups/Index', [
            'auth' => auth()->user(),
            'subgroups' => $subgroups,
        ]);
    }

    public function create()
    {
        $groups = Group::all();
        return Inertia::render('Subgroups/Create', [
            'auth' => auth()->user(),
            'groups' => $groups,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'group_id' => 'required|exists:groups,id',
        ]);

        Subgroup::create([
            'name' => $request->name,
            'group_id' => $request->group_id,
        ]);

        return redirect()->route('subgroups.index');
    }

    public function edit(Subgroup $subgroup)
    {
        $groups = Group::all();
        return Inertia::render('Subgroups/Edit', [
            'auth' => auth()->user(),
            'subgroup' => $subgroup,
            'groups' => $groups,
        ]);
    }

    public function update(Request $request, Subgroup $subgroup)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'group_id' => 'required|exists:groups,id',
        ]);

        $subgroup->update([
            'name' => $request->name,
            'group_id' => $request->group_id,
        ]);

        return redirect()->route('subgroups.index');
    }

    public function destroy(Subgroup $subgroup)
    {
        $subgroup->delete();
        return redirect()->route('subgroups.index');
    }
}
