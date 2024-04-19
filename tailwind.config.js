/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'selector',
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

            //for actions button
            primary: '#ff5252',
            darkPrimary: '#FF204E',
            secondary: '#666',
            darkSecondary: '#EEEEEE',
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
            },
            red: {
                100: '#fff5f5',
                200: '#fed7d7',
                300: '#feb2b2',
                400: '#fc8181',
                500: '#f56565',
                600: '#e53e3e',
                700: '#c53030',
                800: '#9b2c2c',
                900: '#742a2a'
              },
              orange: {
                100: '#fffaf0',
                200: '#feebc8',
                300: '#fbd38d',
                400: '#f6ad55',
                500: '#ed8936',
                600: '#dd6b20',
                700: '#c05621',
                800: '#9c4221',
                900: '#7b341e'
              },
              yellow: {
                100: '#fffff0',
                200: '#fefcbf',
                300: '#faf089',
                400: '#f6e05e',
                500: '#ecc94b',
                600: '#d69e2e',
                700: '#b7791f',
                800: '#975a16',
                900: '#744210'
              },
              green: {
                100: '#f0fff4',
                200: '#c6f6d5',
                300: '#9ae6b4',
                400: '#68d391',
                500: '#48bb78',
                600: '#38a169',
                700: '#2f855a',
                800: '#276749',
                900: '#22543d'
              },
              teal: {
                100: '#e6fffa',
                200: '#b2f5ea',
                300: '#81e6d9',
                400: '#4fd1c5',
                500: '#38b2ac',
                600: '#319795',
                700: '#2c7a7b',
                800: '#285e61',
                900: '#234e52'
              },
              blue: {
                100: '#ebf8ff',
                200: '#bee3f8',
                300: '#90cdf4',
                400: '#63b3ed',
                500: '#4299e1',
                600: '#3182ce',
                700: '#2b6cb0',
                800: '#2c5282',
                900: '#2a4365'
              },
              indigo: {
                100: '#ebf4ff',
                200: '#c3dafe',
                300: '#a3bffa',
                400: '#7f9cf5',
                500: '#667eea',
                600: '#5a67d8',
                700: '#4c51bf',
                800: '#434190',
                900: '#3c366b'
              },
              primary: '#0747A6',
              tertiary: '#e6e9f0',
              textDarkest: '#172b4d',
              textDark: '#42526E',
              textMedium: '#5E6C84',
              textLight: '#8993a4',
              textLink: '#0052cc',
              textLogo: '#DEEBFF',
        
              backgroundDarkPrimary: '#0747A6',
              backgroundMedium: '#dfe1e6',
              backgroundLight: '#ebecf0',
              backgroundLightest: '#F4F5F7',
              backgroundLightPrimary: '#D2E5FE',
              backgroundLightSuccess: '#E4FCEF',
        
              borderLightest: '#dfe1e6',
              borderLight: '#C1C7D0',
              borderInputFocus: '#4c9aff'
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
                iconSidebar: '64px',
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
