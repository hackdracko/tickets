<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Office extends Model
{
    use SoftDeletes;
    protected $table = "cat_offices";
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

    public function client()
    {
        return $this->belongsTo('App\Client');
    }

    public function tickets()
    {
        return $this->hasMany('App\Ticket', 'office_id');
    }
}
