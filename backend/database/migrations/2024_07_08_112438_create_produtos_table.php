<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProdutosTable extends Migration
{
    public function up()
    {
        Schema::create('produtos', function (Blueprint $table) {
            $table->id();
            $table->string('descricao');
            $table->decimal('valor_venda', 10, 2);
            $table->integer('estoque')->default(0);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('produtos');
    }
}
