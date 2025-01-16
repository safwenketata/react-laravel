<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Specialite extends Model
{    use HasFactory;
    protected $fillable = [
        'nomspecialite',
    ];
    public static function boot()
    {
        parent::boot();

        static::deleting(function ($specialite) {
            Livre::whereIn('specialite_id', [$specialite->id])->delete();
        });
    }

}
 


