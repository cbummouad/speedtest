import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/register');
    };

    return (
        <AppLayout>
            <div className="max-w-md mx-auto mt-10">
                <h1 className="text-2xl font-bold mb-6">Register</h1>
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            required
                        />
                        {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            required
                        />
                        {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            required
                        />
                        {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <input
                            type="password"
                            id="password_confirmation"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
                    >
                        {processing ? 'Registering...' : 'Register'}
                    </button>
                    <p className="mt-4 text-sm text-gray-600">
                        Already have an account? <Link href="/login" className="text-indigo-600 hover:underline">Login</Link>
                    </p>
                </form>
            </div>
        </AppLayout>
    );
}
