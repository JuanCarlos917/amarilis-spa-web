/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class', // Enable dark mode via class
    theme: {
        extend: {
            colors: {
                // Elegant Palette
                oro: {
                    principal: '#D4AF37',
                    oscuro: '#B8860B',
                },
                blanco: {
                    crema: '#F5F5DC',
                    puro: '#FFFFFF',
                },
                marron: {
                    profundo: '#5C4033',
                    claro: '#8B4513',
                },
                terracota: {
                    suave: '#A0522D',
                },
                // Functional Mappings
                primary: {
                    DEFAULT: '#D4AF37', // oro-principal
                    dark: '#B8860B',    // oro-oscuro
                },
                secondary: {
                    DEFAULT: '#A0522D', // terracota-suave
                    dark: '#8B4513',    // marron-claro
                },
                background: {
                    DEFAULT: '#F5F5DC', // blanco-crema
                    light: '#F5F5DC',   // blanco-crema
                    dark: '#5C4033',    // marron-profundo
                },
                surface: {
                    DEFAULT: '#FFFFFF', // blanco-puro
                    light: '#FFFFFF',   // blanco-puro
                    dark: '#8B4513',    // marron-claro
                },
                text: {
                    DEFAULT: '#5C4033', // marron-profundo
                    light: '#5C4033',   // marron-profundo
                    dark: '#F5F5DC',    // blanco-crema
                },
                accent: {
                    DEFAULT: '#D4AF37', // oro-principal
                    hover: '#B8860B',   // oro-oscuro
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
            },
            borderRadius: {
                'xl': '20px',
                '2xl': '24px', // Keeping some rounding but can be adjusted if needed
                'lg': '16px',
                'md': '12px',
                'sm': '8px',
                'DEFAULT': '4px', // Base border radius for buttons
            },
            boxShadow: {
                'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', // Standard shadow
            }
        },
    },
    plugins: [],
}
