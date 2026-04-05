<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;

class CvController extends Controller
{
    public function generate(Request $request)
    {
        $data = $request->validate([
            'prenom'       => 'required|string|max:100',
            'nom'          => 'required|string|max:100',
            'titre'        => 'nullable|string|max:150',
            'email'        => 'nullable|email|max:150',
            'telephone'    => 'nullable|string|max:30',
            'localisation' => 'nullable|string|max:100',
            'portfolio'    => 'nullable|string|max:200',
            'resume'       => 'nullable|string|max:1000',
            'experiences'  => 'nullable|array',
            'formations'   => 'nullable|array',
            'competences'  => 'nullable|array',
            'langues'      => 'nullable|array',
            'theme'        => 'required|in:classic,modern,dark,minimal',
        ]);

        $data['experiences'] = $data['experiences'] ?? [];
        $data['formations']  = $data['formations']  ?? [];
        $data['competences'] = $data['competences'] ?? [];
        $data['langues']     = $data['langues']     ?? [];

        $view = "cv.{$data['theme']}";
        $filename = 'CV-' . strtolower(str_replace(' ', '-', $data['prenom'] . '-' . $data['nom'])) . '.pdf';

        $pdf = Pdf::loadView($view, compact('data'))
            ->setPaper('a4', 'portrait')
            ->setOptions([
                'isHtml5ParserEnabled' => true,
                'isRemoteEnabled'      => false,
                'defaultFont'          => 'sans-serif',
                'dpi'                  => 150,
            ]);

        return $pdf->download($filename);
    }
}
