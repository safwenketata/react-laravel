<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Editeur extends Model
{
    protected $fillable = [
        'maisonedit',
        'siteweb',
        'email'
    ];

    public static function boot()
    {
        parent::boot();

        static::deleting(function ($editeur) {
            Livre::whereIn('maised', [$editeur->id])->delete();
        });
    }
}
