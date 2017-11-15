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
        Schema::create('cat_clients', function (Blueprint $table) {
            $table->increments('id');
            $table->string('empresa', 30);
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
        /*
        * CREATE TABLE CAT_SUCURSALES
        * */
        Schema::create('cat_offices', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('client_id')->unsigned();
            $table->string('nombre', 80);
            $table->timestamps();
            $table->softDeletes();
        });
        Schema::table('cat_offices', function($table) {
            $table->foreign('client_id')->references('id')->on('cat_clients');
        });
        /*
         * CREATE TABLE TICKETS
         * */
        Schema::create('tickets', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('office_id')->unsigned();
            $table->integer('user_id')->unsigned();
            $table->string('titulo', 250);
            $table->string('problema', 250);
            $table->string('solucion', 250)->nullable();
            $table->integer('prioridad');
            $table->integer('estatus');
            $table->dateTime('close_at')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
        Schema::table('tickets', function($table) {
            $table->foreign('office_id')->references('id')->on('cat_offices');
        });
        Schema::table('tickets', function($table) {
            $table->foreign('user_id')->references('id')->on('users');
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
         * DROP TICKETS
         * */
        /*Schema::table('tickets', function($table)
        {
            $table->dropForeign('client_id');
            $table->dropForeign('user_id');
        });*/
        Schema::dropIfExists('tickets');
        /*
         * DROP CAT_CLIENTES
         * */
        Schema::dropIfExists('cat_offices');
        /*
         * DROP CAT_CLIENTES
         * */
        Schema::dropIfExists('cat_clients');
    }
}
