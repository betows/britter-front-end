module.exports = {
    darkMode: 'class', // Enable dark mode using a class
    theme: {
      extend: {
        colors: {
          green: {
            DEFAULT: '#006400', // Dark Green as default
            dark: '#004d00', // Darker shade for hover or active states
          },
          primary: '#006400', // Primary color for the default theme
        },
      },
    },
    variants: {
      extend: {
        backgroundColor: ['dark'], // Enable dark mode for background colors
        textColor: ['dark'],
      },
    },
    plugins: [],
  };
  