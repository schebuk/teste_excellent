<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClientesTable extends Migration
{
    public function up()
    {
        Schema::create('clientes', function (Blueprint $table) {
            $table->id();
            $table->string('razao_social');
            $table->string('cnpj')->unique();
            $table->string('email')->unique();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('clientes');
    }
}
