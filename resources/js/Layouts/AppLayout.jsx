import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function AppLayout({ children }) {
    const { user } = usePage().props.auth;
    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                        <Link href="/dashboard" className="text-xl font-bold text-indigo-600">
                            SpeedCheck
                        </Link>
                        <div className="space-x-4">
                            {usePage().props.auth.user ? (
                                <>
                                    <Link href="/dashboard" className="text-gray-600 hover:text-indigo-600">
                                        Dashboard
                                    </Link>
                                    <Link
                                        href="/logout"
                                        method="post"
                                        as="button"
                                        className="text-gray-600 hover:text-indigo-600"
                                    >
                                        Logout
                                    </Link>
                                </>
                            ) : (
                            <>
                                <Link href="/login" className="text-gray-600 hover:text-indigo-600">
                                    Login
                                </Link>
                                <span className="text-gray-400 mx-2">|</span>
                                <Link href="/register" className="text-gray-600 hover:text-indigo-600">
                                    Register
                                </Link>
                            </>

                            )}
                        </div>
                    </div>
                </div>
            </nav>

            <main className="py-8">
                <div className="max-w-7xl mx-auto px-4">
                    {children}
                </div>
            </main>
        </div>
    );
}
