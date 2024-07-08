<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cliente;

class ClienteController extends Controller
{
    public function index()
    {
        return Cliente::all();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'razao_social' => 'required|string',
            'cnpj' => 'required|string|unique:clientes',
            'email' => 'required|email|unique:clientes',
        ]);

        $cliente = Cliente::create($data);

        return response()->json($cliente, 201);
    }

    public function show($id)
    {
        return Cliente::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $cliente = Cliente::findOrFail($id);

        $data = $request->validate([
            'razao_social' => 'required|string',
            'cnpj' => 'required|string|unique:clientes,cnpj,'.$cliente->id,
            'email' => 'required|email|unique:clientes,email,'.$cliente->id,
        ]);

        $cliente->update($data);

        return response()->json($cliente, 200);
    }

    public function destroy($id)
    {
        $cliente = Cliente::findOrFail($id);
        $cliente->delete();

        return response()->json(null, 204);
    }
}
