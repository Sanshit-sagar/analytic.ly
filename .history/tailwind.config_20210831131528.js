
module.exports = {
    mode: 'jit',
    purge: [
      './pages/**/*.{js,ts,jsx,tsx}',
      './sections/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: 'class',
    theme: {
      typography: (theme) => ({}),
      extend: {},
    },
    plugins: [
      require('@tailwindcss/forms'), 
      require('@tailwindcss/typography')
    ],
  };