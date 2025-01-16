<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Livre extends Model
{
    protected $fillable = [
        'titre',
        'annedition',
        'prix',
        'qtestock',
        'couverture',
        'specialite_id',
        'maised_id',
        'auteur_id'
    ];

    public function specialite()
    {
        return $this->belongsTo(Specialite::class ,'specialite_id');
    }

    public function editeur()
    {
        return $this->belongsTo(Editeur::class, 'maised_id');
    }

    public function auteur()
    {
        return $this->belongsTo(Auteur::class,'auteur_id');
    }
}
