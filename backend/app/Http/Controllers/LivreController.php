<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Log;


use App\Models\Livre;
use Illuminate\Http\Request;

class LivreController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $livres = Livre::with(['auteur', 'specialite', 'editeur'])->get();
            return response()->json($livres);
        } catch (\Exception $e) {
            return response()->json("Problème de récupération de la liste des livres");
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
{
    try {
        $livre = new Livre([
            "titre" => $request->input("titre"),
            "annedition" => $request->input("annedition"),
            "prix" => $request->input("prix"),
            "qtestock" => $request->input("qtestock"),
            "couverture" => $request->input("couverture"),
            "specialite_id" => $request->input("specialite_id"),
            "maised_id" => $request->input("maised_id"),
            "auteur_id" => $request->input("auteur_id"),
        ]);
        $livre->save();
        return response()->json($livre);
    } catch (\Exception $e) {
        Log::error('Insertion failed: ' . $e->getMessage());  // Log the error message
        return response()->json("Insertion impossible");
    }
}

    /**
     * Display the specified resource.
     */
    public function show($id)
    {

            $livre = Livre::with(['auteur', 'specialite', 'editeur'])->findOrFail($id);
            return response()->json($livre);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        try {
            $livre = Livre::findOrFail($id);
            $livre->update($request->all());
            return response()->json($livre);
        } catch (\Exception $e) {
            return response()->json("Problème de modification");
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $livre = Livre::findOrFail($id);
            $livre->delete();
            return response()->json("Livre supprimé avec succès");
        } catch (\Exception $e) {
            return response()->json("Problème de suppression du livre");
        }
    }
}
