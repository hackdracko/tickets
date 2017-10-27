<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        /*
        * CREATE TABLE CAT_CLIENTES
        * */
        Schema::create('cat_client', function (Blueprint $table) {
            $table->increments('id');
            $table->string('nombre', 30);
            $table->string('apellido', 30);
            $table->string('correo', 120);
            $table->string('direccion', 120);
            $table->string('municipio', 120);
            $table->string('estado', 120);
            $table->integer('codigo_postal');
            $table->integer('numero_interior');
            $table->integer('numero_exterior');
            $table->string('telefono', 120);
            $table->string('celular', 120);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        /*
         * DROP CAT_CLIENTES
         * */
        Schema::dropIfExists('cat_client');
    }
}
