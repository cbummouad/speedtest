<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\SpeedTest;
use Illuminate\Support\Facades\Auth;

class SpeedTestController extends Controller
{
    public function index()
    {
        $tests = [];
        $stats = [];

        if (Auth::check()) {
            $tests = SpeedTest::where('user_id', Auth::id())->latest()->get();
            $stats = [
                'average_ping' => SpeedTest::where('user_id', Auth::id())->avg('ping'),
                'average_download' => SpeedTest::where('user_id', Auth::id())->avg('download'),
                'average_upload' => SpeedTest::where('user_id', Auth::id())->avg('upload'),
            ];
        }

        return Inertia::render('SpeedTest/Index', [
            'tests' => $tests,
            'stats' => $stats,
            'auth' => [
                'user' => Auth::user()
            ]
        ]);
    }

    public function store()
    {
        $results = $this->runSpeedTest();

        if (Auth::check()) {
            SpeedTest::create([
                'user_id' => Auth::id(),
                'ping' => $results['ping'],
                'download' => $results['download'],
                'upload' => $results['upload'],
                'server' => $results['server'],
            ]);
        }

        return redirect()->route('dashboard')->with('results', $results);
    }

    private function runSpeedTest()
    {
        // Test server URL
        $testUrl = 'https://speedtest.london.linode.com/100MB-london.bin';
        $testFileSize = 100000000; // 100MB

        // Measure ping
        $start = microtime(true);
        file_get_contents($testUrl, false, null, 0, 1);
        $ping = (microtime(true) - $start) * 1000; // Convert to milliseconds

        // Measure download speed
        $start = microtime(true);
        $data = file_get_contents($testUrl);
        $downloadTime = microtime(true) - $start;
        $download = ($testFileSize * 8) / ($downloadTime * 1000000); // Convert to Mbps

        // Measure upload speed (simulated)
        $upload = $download * 0.8; // Assume upload is 80% of download speed

        return [
            'ping' => round($ping, 2),
            'download' => round($download, 2),
            'upload' => round($upload, 2),
            'server' => 'Local Test Server',
        ];
    }
}
