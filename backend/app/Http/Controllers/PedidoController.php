<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pedido;
use App\Models\Produto;

class PedidoController extends Controller
{
    public function index()
    {
        $pedidos = Pedido::with('cliente')->get();
        return response()->json($pedidos);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'cliente_id' => 'required|exists:clientes,id',
        ]);

        $pedido = Pedido::create($data);

        return response()->json($pedido, 201);
    }

    public function show($id)
    {
        $pedido = Pedido::with('cliente')->findOrFail($id);
        return response()->json($pedido);
    }

    public function destroy($id)
    {
        $pedido = Pedido::findOrFail($id);
        $pedido->delete();

        return response()->json(null, 204);
    }
}
