<?php

namespace App\Http\Controllers;

use App\Models\Group;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GroupController extends Controller
{
    public function index()
    {
        $groups = Group::with('subgroups')->get();
        return Inertia::render('Groups/Index', [
            'auth' => auth()->user(),
            'groups' => $groups,
        ]);
    }

    public function create()
    {
        return Inertia::render('Groups/Create', [
            'auth' => auth()->user(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        Group::create($request->all());

        return redirect()->route('groups.index');
    }

    public function edit($id)
    {
        $group = Group::findOrFail($id);
        return Inertia::render('Groups/Edit', [
            'auth' => auth()->user(),
            'group' => $group,
        ]);
    }
    
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);
    
        $group = Group::findOrFail($id);
        $group->update($request->all());
    
        return redirect()->route('groups.index');
    }
    
    public function destroy($id)
    {
        $group = Group::findOrFail($id);
        $group->delete();
    
        return redirect()->route('groups.index');
    }
}
