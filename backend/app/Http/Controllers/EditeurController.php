<?php

namespace App\Http\Controllers;

use App\Models\Editeur;
use Illuminate\Http\Request;

class EditeurController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $editeurs = Editeur::all();
            return response()->json($editeurs);
        } catch (\Exception $e) {
            return response()->json("Problème de récupération de la liste des éditeurs");
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $editeur = new Editeur([
                "maisonedit" => $request->input("maisonedit"),
                "siteweb" => $request->input("siteweb"),
                "email" => $request->input("email"),
            ]);
            $editeur->save();
            return response()->json($editeur);
        } catch (\Exception $e) {
            return response()->json("Insertion impossible");
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        try {
            $editeur = Editeur::findOrFail($id);
            return response()->json($editeur);
        } catch (\Exception $e) {
            return response()->json("Problème de récupération des données");
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        try {
            $editeur = Editeur::findOrFail($id);
            $editeur->update($request->all());
            return response()->json($editeur);
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
            $editeur = Editeur::findOrFail($id);
            $editeur->delete();
            return response()->json("Éditeur supprimé avec succès");
        } catch (\Exception $e) {
            return response()->json("Problème de suppression de l'éditeur");
        }
    }
}
