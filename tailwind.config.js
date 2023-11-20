/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [],
    theme: {
        extend: {},
    },
    plugins: [],
    purge: {
        enabled: false, // Set to false to disable purging
        content: [
            './index.html',
            './src/**/*.vue',
        ],
    },
}

