<?php

namespace App\Http\Controllers;

use App\Models\Auteur;
use Illuminate\Http\Request;

class AuteurController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $auteurs = Auteur::all();
            return response()->json($auteurs);
        } catch (\Exception $e) {
            return response()->json("Problème de récupération de la liste des auteurs.");
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $auteur = new Auteur([
                'nomauteur' => $request->input('nomauteur'),
                'email' => $request->input('email'),
                'numtel' => $request->input('numtel'),
            ]);
            $auteur->save();
            return response()->json($auteur);
        } catch (\Exception $e) {
            return response()->json("Insertion impossible.");
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        try {
            $auteur = Auteur::findOrFail($id);
            return response()->json($auteur);
        } catch (\Exception $e) {
            return response()->json("Problème de récupération des données.");
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        try {
            $auteur = Auteur::findOrFail($id);
            $auteur->update($request->all());
            return response()->json($auteur);
        } catch (\Exception $e) {
            return response()->json("Problème de modification.");
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $auteur = Auteur::findOrFail($id);
            $auteur->delete();
            return response()->json("Auteur supprimé avec succès.");
        } catch (\Exception $e) {
            return response()->json("Problème de suppression.");
        }
    }


    public function auteurPagination()
{
    try {
        $perPage = request()->input('pageSize', 2); // Récupère la valeur dynamique pour la pagination
        $auteurs = Auteur::paginate($perPage); // Exécute la requête de pagination
        // Retourne le résultat en format JSON API
        return response()->json([
            'auteurs' => $auteurs->items(), // Les auteurs paginés
            'totalPages' => $auteurs->lastPage(), // Le nombre de pages
        ]);
    } catch (\Exception $e) {
        return response()->json("Selection impossible {$e->getMessage()}");
    }
}

}
