module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        walmart: {
          blue: {
            50: '#E6F3FF',
            100: '#CCE7FF',
            200: '#99CFFF',
            300: '#66B7FF',
            400: '#339FFF',
            500: '#0071CE',
            600: '#004C91',
            700: '#003D75',
            800: '#002E59',
            900: '#001F3D'
          },
          yellow: {
            50: '#FFFDF0',
            100: '#FFFBE0',
            200: '#FFF7C2',
            300: '#FFF3A3',
            400: '#FFEF85',
            500: '#FFDE00',
            600: '#FFC220',
            700: '#E6A800',
            800: '#CC9500',
            900: '#B38200'
          },
          orange: {
            50: '#FFF4F0',
            100: '#FFE9E0',
            200: '#FFD3C2',
            300: '#FFBDA3',
            400: '#FFA785',
            500: '#FF6B35',
            600: '#E6522B',
            700: '#CC3920',
            800: '#B32016',
            900: '#99070C'
          },
          gray: {
            50: '#F8F9FA',
            100: '#F1F3F4',
            200: '#E8EAED',
            300: '#DADCE0',
            400: '#BDC1C6',
            500: '#9AA0A6',
            600: '#80868B',
            700: '#5F6368',
            800: '#3C4043',
            900: '#232F3E'
          }
        }
      },
      fontFamily: {
        'walmart': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
        'pulse-walmart': 'pulseWalmart 2s infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseWalmart: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      boxShadow: {
        'walmart': '0 4px 6px -1px rgba(0, 76, 145, 0.1), 0 2px 4px -1px rgba(0, 76, 145, 0.06)',
        'walmart-lg': '0 10px 15px -3px rgba(0, 76, 145, 0.1), 0 4px 6px -2px rgba(0, 76, 145, 0.05)',
        'walmart-xl': '0 20px 25px -5px rgba(0, 76, 145, 0.1), 0 10px 10px -5px rgba(0, 76, 145, 0.04)',
      }
    },
  },
  plugins: [],
}