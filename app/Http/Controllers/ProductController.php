<?php

namespace App\Http\Controllers;

use App\Models\Group;
use App\Models\Product;
use App\Models\SubGroup;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with('subGroup.group')->get();
        return Inertia::render('Products/Index', ['products' => $products]);
    }

    public function create()
    {
        $groups = Group::with('subGroups')->get();
        return Inertia::render('Products/Create', [
            'auth' => auth()->user(),
            'groups' => $groups
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'sub_group_id' => 'required|exists:sub_groups,id',
        ]);

        Product::create($request->all());

        return redirect()->route('products.index');
    }

    public function show($id)
    {
        $product = Product::with('subGroup.group')->findOrFail($id);
        return Inertia::render('Products/Show', ['product' => $product]);
    }

    public function edit($id)
    {
        $product = Product::findOrFail($id);
        $groups = Group::with('subGroups')->get();

        return Inertia::render('Products/Edit', [
            'auth' => auth()->user(),
            'product' => $product,
            'groups' => $groups,
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'sub_group_id' => 'required|exists:sub_groups,id',
        ]);

        $product = Product::findOrFail($id);
        $product->update($request->all());

        return redirect()->route('products.index');
    }

    public function destroy($id)
    {
        Product::destroy($id);
        return redirect()->route('products.index');
    }
}
