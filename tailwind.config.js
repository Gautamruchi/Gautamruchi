const plugin = require('tailwindcss/plugin')

module.exports = {
    purge: { content: ['./public/**/*.html', './src/**/*.vue'] },
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            gridTemplateColumns: {
                // Simple 16 column grid
                '16': 'repeat(16, minmax(0, 1fr))',

                // Complex site-specific column configuration
                'footer': '200px minmax(900px, 1fr) 100px',
            }
        }
    },
    variants: {
        extend: {},
    },
    plugins: [
        require('@tailwindcss/forms'),

    ]
}