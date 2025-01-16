<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Auteur extends Model
{
    protected $fillable = [
        'nomauteur',
        'email',
        'numtel',
    ];

    public static function boot()
    {
        parent::boot();

        static::deleting(function ($auteur) {
            Livre::whereIn('auteurs', [$auteur->id])->delete();
        });
    }

}
