<?php

namespace App\Http\Controllers;

use App\Client;
use App\Office;
use App\Ticket;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    public function __construct()
    {
        //$this->middleware('jwt.auth', ['except' => ['index', 'store', 'edit', 'update', 'destroy', 'comboClients', 'comboOffices', 'comboUsers', 'test']]);
        $this->middleware('jwt.auth');
    }
    /**
     * Display a listing of the resource.
     *a
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tickets = Ticket::with('user', 'office', 'office.client')->paginate(2);
        return response()->json($tickets);
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
            'office_id' => 'required',
            'user_id' => 'required',
            'titulo' => 'required',
            'problema' => 'required',
            'prioridad' => 'required',
        ]);

        $ticket = new Ticket();
        $ticket->office_id = $request->get('office_id');
        $ticket->user_id = $request->get('user_id');
        $ticket->titulo = $request->get('titulo');
        $ticket->problema = $request->get('problema');
        $ticket->prioridad = $request->get('prioridad');
        $ticket->estatus = 0;
        $ticket->save();
        return response()->json($ticket);
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
            'office_id' => 'required',
            'user_id' => 'required',
            'titulo' => 'required',
            'problema' => 'required',
            'prioridad' => 'required',
            'solucion' => 'required',
        ]);

        $ticket = Ticket::find($id);
        $ticket->office_id = $request->get('office_id');
        $ticket->user_id = $request->get('user_id');
        $ticket->titulo = $request->get('titulo');
        $ticket->problema = $request->get('problema');
        $ticket->solucion = $request->get('solucion');
        $ticket->prioridad = $request->get('prioridad');
        $ticket->estatus = 1;
        $ticket->close_at = Carbon::now();
        $ticket->save();
        return response()->json($ticket);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $ticket = Ticket::find($id)->delete();
        return response()->json($ticket);
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

    /**
     * Combo Sucursales
     *
     * @return \Illuminate\Http\Response
     */
    public function comboOffices($id)
    {
        $office = Office::where('client_id', $id)->get();
        return response()->json($office);
    }

    /**
     * Combo Users
     *
     * @return \Illuminate\Http\Response
     */
    public function comboUsers()
    {
        $users = User::all();
        return response()->json($users);
    }


/*POST https://fcm.googleapis.com/v1/projects/myproject-b5ae1/messages:send HTTP/1.1

Content-Type: application/json
Authorization: Bearer ya29.c.El_9BEX_-hTWJTylqXu8FxPz7cDkBrStub-WfbXfExOXX7mGQ8F55vIC5q941VYmK9NixBnR8EmJTDRJDYznaOva5jYaIm3brkhwIk54dqKpbwB1ADdnM1md6C-XnWGo7w

{
"message":{
"token" : "bk3RNwTe3H0:CI2k_HHwgIpoDKCIZvvDMExUdFQ3P1...",
"notification" : {
"body" : "This is an FCM notification message!",
"title" : "FCM Message",
}
}
}*/


    public function test(){
        $url = 'https://fcm.googleapis.com/fcm/send';
        $headers = array(
            'Authorization: key=egoAzf8613g:APA91bGtyq_pmiaAN-P1P_9kTYvfxn8RP86c1rJy9PB93vipcMy8pSmrDh-wqgegnv7Mx0yKEB0T-ueyDjfP5YCe22fYLrQDnVO9KHjwnhgQFpaLUxLnRk_2qyQzjnLD8R9jl5F9iATJ',
            'Content-Type: application/json',
        );
        $data = '{
                    "message":{
                        "priority": "high",
                        "notification" : {
                            "body" : "This is an FCM notification message!",
                            "title": "Title from PHP",
                            "body": "Body from PHP",
                            "sound": "true",
                        }
                    }';

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_HEADER, $headers);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, false);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);

        curl_exec($ch);
        curl_close($ch);
    }

    /*private function curlRequest($headers, $fields){
        $ch = curl_init();
        curl_setopt( $ch,CURLOPT_URL, 'https://fcm.googleapis.com/fcm/send' );
        curl_setopt( $ch,CURLOPT_POST, true );
        curl_setopt( $ch,CURLOPT_HTTPHEADER, $headers );
        curl_setopt( $ch,CURLOPT_RETURNTRANSFER, true );
        curl_setopt( $ch,CURLOPT_SSL_VERIFYPEER, false );
        curl_setopt( $ch,CURLOPT_POSTFIELDS, json_encode( $fields ) );
        $result = curl_exec($ch );
        curl_close( $ch );

        return $result;
    }

    private function sendNotification(){
        $API_ACCESS_KEY = "AAAAp0fQoaQ:APA91bGpKMiqXphD80Rzdmg5BIc2SWL5YICqZgtV8VrJ0OJIrA8G6Ai5UY24_T7qxa1EM7XAtizmRwbyJ5irmSPqEtPLI433eg0m1Jr6Gt2yp4DjXnuGamzbaGmBJDTaPcwc6nvnAuyk";
        $registrationIds = [
            //"egoAzf8613g:APA91bGtyq_pmiaAN-P1P_9kTYvfxn8RP86c1rJy9PB93vipcMy8pSmrDh-wqgegnv7Mx0yKEB0T-ueyDjfP5YCe22fYLrQDnVO9KHjwnhgQFpaLUxLnRk_2qyQzjnLD8R9jl5F9iATJ",
            "eo6tC6nM4Pw:APA91bGM1lQVOLZU9o1S9tvo-jmpwzHygu89s_Z0-4K6qUI8Os0Be9UW-ThaG_etKP6HBA3fTs5culiT_EQJXr4R3sxvD63UQz9aGvhC5Yq0vRhtzJfA-Lo9GGIfcSGhoFfwNABAJw6X"
        ];

        $msg = [
            'body'  => 'Body  Of Notification',
            'title' => 'Title Of Notification',
            'icon' => 'myicon',
            'sound' => 'mySound'/
        ];

        $response = $this->curlRequest(
            [ 'Authorization: key=' . $API_ACCESS_KEY, 'Content-Type: application/json' ],
            [ 'registration_ids' => $registrationIds, 'notification' => $msg ]
        );

        $this->out($response);

    }*/
}