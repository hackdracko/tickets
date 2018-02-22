<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Ticket extends Model
{
    use SoftDeletes;
    protected $table = "tickets";
    protected $primaryKey = "id";
    protected $fillable = [
        '*'
    ];
    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = ['deleted_at'];

    public function office()
    {
        return $this->belongsTo('App\Office');
    }

    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
