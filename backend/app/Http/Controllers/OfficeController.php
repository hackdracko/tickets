<?php

namespace App\Http\Controllers;

use App\Client;
use App\Office;
use Illuminate\Http\Request;

class OfficeController extends Controller
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
        $clients = Office::with('client')->paginate();
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
            'client_id' => 'required',
            'nombre' => 'required|alpha|min:3|max:50',
        ]);

        $office = new Office();
        $office->client_id = $request->get('client_id');
        $office->nombre = $request->get('nombre');
        $office->save();
        return response()->json($office);
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
            'client_id' => 'required',
            'nombre' => 'required|alpha|min:3|max:50',
        ]);

        $office = Office::find($id);
        $office->client_id = $request->get('client_id');
        $office->nombre = $request->get('nombre');
        $office->save();
        return response()->json($office);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $office = Office::find($id)->delete();
        return response()->json($office);
    }

    /**
     * Combo Clients
     *
     * @return \Illuminate\Http\Response
     */
    public function comboClients()
    {
        $clients = Client::all();
        return response()->json($clients);
    }
}
