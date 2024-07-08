<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Produto extends Model
{
    use HasFactory;

    protected $fillable = [
        'descricao',
        'valor_venda',
        'estoque',
        'imagens',
    ];

    protected $casts = [
        'imagens' => 'array',
    ];

    public function getImagensUrlsAttribute()
    {
        return array_map(function ($path) {
            return Storage::url($path);
        }, $this->imagens ?? []);
    }
    
    public function pedidos()
    {
        return $this->belongsToMany(Pedido::class);
    }
}
