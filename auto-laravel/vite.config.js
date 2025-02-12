import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
    build: {
        outDir: 'public/build',  
    },
    server: {
        historyApiFallback: true, 
    },
    test: {
        environment: 'jsdom',
        globals: true,        
        setupFiles: './src/setupTests.js', 
    },
});