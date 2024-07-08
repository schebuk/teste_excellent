<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class CnpjService
{
    public function getDadosCnpj($cnpj)
    {
        $response = Http::get('https://www.cnpj.ws/api/' . $cnpj);
        return $response->json();
    }
}
