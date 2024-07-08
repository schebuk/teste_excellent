<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class CnpjController extends Controller
{
    public function show($cnpj)
    {
        $response = Http::get("https://www.receitaws.com.br/v1/cnpj/{$cnpj}");

        if ($response->failed()) {
            return response()->json(['error' => 'CNPJ not found'], 404);
        }

        return $response->json();
    }
}
