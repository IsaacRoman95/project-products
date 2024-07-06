<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with('orderdetails')->get(); 

        return Inertia::render('Orders/Index', [
            'orders' => $orders
        ]);
    }

    public function create()
    {
        $products = Product::all();

        return Inertia::render('Orders/Create', [
            'auth' => auth()->user(),
            'products' => $products,
        ]);
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'order_details' => 'required|array',
                'order_details.*.product_id' => 'required|exists:products,id',
                'order_details.*.quantity' => 'required|integer|min:1',
                'total' => 'required|numeric|min:0',
            ]);

            $order = Order::create([
                'total' => $request->total,
            ]);

            foreach ($request->order_details as $detail) {
                $order->orderDetails()->create([
                    'product_id' => $detail['product_id'],
                    'quantity' => $detail['quantity'],
                    'price' => $detail['price'],
                    'subtotal' => $detail['subtotal'],
                ]);
            }

            return Redirect::route('orders.index')->with('success', 'Orden creada correctamente.');
        } catch (\Exception $e) {
            Log::error('Error al guardar orden:', ['message' => $e->getMessage()]);
            return redirect()->back()->with('error', 'Error al guardar la orden.');
        }
    }

    public function show(Order $order)
    {
        $order->load('orderdetails.product');

        return Inertia::render('Orders/Show', [
            'order' => $order
        ]);
    }

    public function edit(Order $order)
    {
        $order->load('details');

        return Inertia::render('Orders/Edit', [
            'order' => $order
        ]);
    }

    public function update(Request $request, Order $order)
    {
        $request->validate([
            'total' => 'required|numeric|min:0.01',
        ]);

        $order->total = $request->total;
        $order->save();

        // Actualiza los detalles de la orden si es necesario

        return redirect()->route('orders.index')->with('success', 'La orden se ha actualizado exitosamente.');
    }

    public function destroy(Order $order)
    {
        $order->delete();

        return redirect()->route('orders.index')->with('success', 'La orden se ha eliminado exitosamente.');
    }
}
