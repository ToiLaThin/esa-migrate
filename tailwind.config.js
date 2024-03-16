/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js}'],
    theme: {
        screens: {
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px'
        },
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            black: '#000',
            primary: '#ff5252',
            secondary: '#666',
            tenery: '#ffffff',
            white: '#fff',
            gray: {
                50: '#e5e5e5',
                100: '#f4f5f7',
                200: '#e5e7eb',
                300: '#d2d6dc',
                400: '#9fa6b2',
                500: '#6b7280',
                600: '#4b5563',
                700: '#374151',
                800: '#252f3f',
                900: '#161e2e'
            }
        },
        fontFamily: {
            sans: ['Roboto', 'Arial', 'Helvetica', 'sans-serif'],
            serif: ['Merriweather', 'serif']
        },
        fontWeight: {
            thin: 100,
            extralight: 200,
            light: 300,
            normal: 400,
            medium: 500,
            semibold: 600,
            bold: 700,
            extrabold: 800,
            black: 900
        },
        letterSpacing: {
            tighter: '-0.05em',
            tight: '-0.025em',
            normal: '0',
            wide: '0.025em',
            wider: '0.05em',
            widest: '0.1em'
        },
        borderRadius: {
            none: '0',
            sm: '0.125rem',
            DEFAULT: '5px',
            md: '0.375rem',
            lg: '0.5rem',
            xl: '0.75rem',
            '2xl': '1rem',
            '3xl': '1.5rem',
            full: '9999px'
        },
        extend: {
            spacing: {
                0: '0',
                1: '0.25rem', // 4px
                2: '0.5rem', // 8px
                3: '0.75rem', // 12px
                4: '1rem', // 16px
                5: '1.25rem', // 20px
                6: '1.5rem', // 24px
                128: '32rem',
                144: '36rem',
                18: '4.5rem', // 72px,
                20: '5rem', // 80px
                22: '5.5rem', // 88px
                24: '6rem' // 96px
            },
            borderRadius: {
                '4xl': '2rem'
            },
            fontSize: {
                xs: ['0.75rem', { lineHeight: '1rem' }], // 12px
                sm: ['0.875rem', { lineHeight: '1.25rem' }], // 14px
                base: ['1rem', { lineHeight: '1.5rem' }], // 16px
                lg: ['1.125rem', { lineHeight: '1.75rem' }], // 18px
                xl: ['1.25rem', { lineHeight: '1.75rem' }], // 20px
                '2xl': ['1.5rem', { lineHeight: '2rem' }], // 24px
                '3xl': ['2.5rem', { lineHeight: '2.25rem' }] // 30px
            }
        },
        plugins: []
    }
};
