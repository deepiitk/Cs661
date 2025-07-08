/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'saffron': '#FF9933',
        'white': '#FFFFFF',
        'green': '#138808',
        'navy': '#000080',
        'parliament': '#2c3e50',
        'gold': '#FFD700'
      },
      fontFamily: {
        'serif': ['Georgia', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif']
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(255, 153, 51, 0.5)' },
          '100%': { boxShadow: '0 0 30px rgba(255, 153, 51, 0.8)' }
        }
      }
    },
  },
  plugins: [],
}