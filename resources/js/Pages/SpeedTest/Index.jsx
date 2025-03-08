import React from 'react';
import { Link, usePage, useForm } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard({ tests, stats, results }) {
    const { post, processing } = useForm();

    const startTest = () => post('/speed-test');

    return (
        <AppLayout>
            <div className="space-y-8">
                {/* Test Button */}
                <div className="bg-white rounded-lg p-6 shadow">
                    <button
                        onClick={startTest}
                        disabled={processing}
                        className="w-full py-4 px-6 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition"
                    >
                        {processing ? 'Testing...' : 'Start Speed Test'}
                    </button>
                    {!usePage().props.auth.user && (
                        <p className="mt-4 text-sm text-gray-500 text-center">
                            Want to save your test history?{' '}
                            <Link href="/login" className="text-indigo-600 hover:underline">
                                Log in
                            </Link>
                        </p>
                    )}
                </div>

                {/* Real-Time Results */}
                <div className="bg-white rounded-lg p-6 shadow">
                    <h2 className="text-xl font-semibold mb-4">Latest Results</h2>
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="bg-gray-50 p-4 rounded">
                            <p className="text-sm text-gray-500">Ping</p>
                            <p className="text-2xl font-bold">{(tests[0]?.ping || results?.ping) || '--'} ms</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded">
                            <p className="text-sm text-gray-500">Download</p>
                            <p className="text-2xl font-bold">{(tests[0]?.download || results?.download) || '--'} Mbps</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded">
                            <p className="text-sm text-gray-500">Upload</p>
                            <p className="text-2xl font-bold">{(tests[0]?.upload || results?.upload) || '--'} Mbps</p>
                        </div>
                    </div>
                </div>

                {/* History Chart */}
                <div className="bg-white rounded-lg p-6 shadow">
                    <h2 className="text-xl font-semibold mb-4">Performance Over Time</h2>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={tests}>
                                <XAxis dataKey="created_at" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="download" stroke="#4f46e5" />
                                <Line type="monotone" dataKey="upload" stroke="#10b981" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-3 gap-4">
                    <StatCard title="Average Ping" value={stats.average_ping} unit="ms" color="indigo" />
                    <StatCard title="Average Download" value={stats.average_download} unit="Mbps" color="green" />
                    <StatCard title="Average Upload" value={stats.average_upload} unit="Mbps" color="purple" />
                </div>
            </div>
        </AppLayout>
    );
}

function StatCard({ title, value, unit, color }) {
    const colors = {
        indigo: 'bg-indigo-100 text-indigo-600',
        green: 'bg-green-100 text-green-600',
        purple: 'bg-purple-100 text-purple-600',
    };

    return (
        <div className="bg-white rounded-lg p-4 shadow">
            <p className="text-sm text-gray-500">{title}</p>
            <div className="mt-2 flex items-baseline">
                <span className={`${colors[color]} rounded-full px-3 py-1 text-sm`}>
                    {value?.toFixed(1)} {unit}
                </span>
            </div>
        </div>
    );
}
