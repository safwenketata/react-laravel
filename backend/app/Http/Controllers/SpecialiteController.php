<?php

namespace App\Http\Controllers;

use App\Models\Specialite;
use Illuminate\Http\Request;

class SpecialiteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $specialites = Specialite::all();
            return response()->json($specialites);
        } catch (\Exception $e) {
            return response()->json("Problème de récupération de la liste des spécialités");
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $specialite = new Specialite([
                "nomspecialite" => $request->input("nomspecialite"),
            ]);
            $specialite->save();
            return response()->json($specialite);
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
            $specialite = Specialite::findOrFail($id);
            return response()->json($specialite);
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
            $specialite = Specialite::findOrFail($id);
            $specialite->update($request->all());
            return response()->json($specialite);
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
            $specialite = Specialite::findOrFail($id);
            $specialite->delete();
            return response()->json("Spécialité supprimée avec succès");
        } catch (\Exception $e) {
            return response()->json("Problème de suppression de spécialité");
        }
    }
}
