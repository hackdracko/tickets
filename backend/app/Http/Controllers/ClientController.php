<?php

namespace App\Http\Controllers;

use App\Client;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    public function __construct()
    {
        $this->middleware('jwt.auth');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $clients = Client::paginate();
        return response()->json($clients);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'empresa' => 'required|alpha|min:3|max:50',
            'nombre' => 'required|alpha|min:3|max:50',
            'correo' => 'required|email|min:3|',
            'municipio' => 'required|alpha',
            'estado' => 'required|alpha',
            'codigo_postal' => 'required|numeric',
            'numero_exterior' => 'required|numeric',
            'telefono' => 'required|numeric',
            'celular' => 'required|numeric',
        ]);

        $client = new Client();
        $client->empresa = $request->get('empresa');
        $client->nombre = $request->get('nombre');
        $client->apellido = $request->get('apellido');
        $client->correo = $request->get('correo');
        $client->direccion = $request->get('direccion');
        $client->municipio = $request->get('municipio');
        $client->estado = $request->get('estado');
        $client->codigo_postal = $request->get('codigo_postal');
        $client->numero_interior = $request->get('numero_interior');
        $client->numero_exterior = $request->get('numero_exterior');
        $client->telefono = $request->get('telefono');
        $client->celular = $request->get('celular');
        $client->save();
        return response()->json($client);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'empresa' => 'required|alpha|min:3|max:50',
            'nombre' => 'required|alpha|min:3|max:50',
            'correo' => 'required|email|min:3|',
            'municipio' => 'required|alpha',
            'estado' => 'required|alpha',
            'codigo_postal' => 'required|numeric',
            'numero_exterior' => 'required|numeric',
            'telefono' => 'required|numeric',
            'celular' => 'required|numeric',
        ]);

        $client = Client::find($id);
        $client->empresa = $request->get('empresa');
        $client->nombre = $request->get('nombre');
        $client->apellido = $request->get('apellido');
        $client->correo = $request->get('correo');
        $client->direccion = $request->get('direccion');
        $client->municipio = $request->get('municipio');
        $client->estado = $request->get('estado');
        $client->codigo_postal = $request->get('codigo_postal');
        $client->numero_interior = $request->get('numero_interior');
        $client->numero_exterior = $request->get('numero_exterior');
        $client->telefono = $request->get('telefono');
        $client->celular = $request->get('celular');
        $client->save();
        return response()->json($client);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $client = Client::find($id)->delete();
        return response()->json($client);
    }
}
