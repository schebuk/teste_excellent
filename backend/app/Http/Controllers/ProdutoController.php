<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Produto;

class ProdutoController extends Controller
{
    public function index()
    {
        $produtos = Produto::all();
        return response()->json($produtos);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'descricao' => 'required|string',
            'valor_venda' => 'required|numeric',
            'estoque' => 'required|integer',
        ]);

        $produto = Produto::create($data);

        return response()->json($produto, 201);
    }

    public function show($id)
    {
        $produto = Produto::findOrFail($id);
        return response()->json($produto);
    }

    public function update(Request $request, $id)
    {
        $produto = Produto::findOrFail($id);

        $data = $request->validate([
            'descricao' => 'required|string',
            'valor_venda' => 'required|numeric',
            'estoque' => 'required|integer',
        ]);

        $produto->update($data);

        return response()->json($produto, 200);
    }

    public function destroy($id)
    {
        $produto = Produto::findOrFail($id);
        $produto->delete();

        return response()->json(null, 204);
    }
}
