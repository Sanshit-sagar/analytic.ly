
module.exports = {
    mode: 'jit',
    purge: [
      './pages/**/*.{js,ts,jsx,tsx}',
      './layouts/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: 'false',
    theme: {
      typography: (theme) => ({}),
      extend: {},
    },
    plugins: [

    ],
  };