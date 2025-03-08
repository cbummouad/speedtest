import './bootstrap';
import '../css/app.css';
import { createInertiaApp } from '@inertiajs/react';
import React from 'react';
import { createRoot } from 'react-dom/client';

createInertiaApp({
    resolve: async name => (await import(`./Pages/${name}`)).default,
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
});
