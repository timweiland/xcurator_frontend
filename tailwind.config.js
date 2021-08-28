const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: colors.pink,
        error: colors.red,
      },
    },
    customForms: (theme) => ({
      default: {
        checkbox: {
          color: theme("colors.primary.800"),
          borderWidth: 1,
          borderColor: theme("colors.gray.500"),
        },
      },
    }),
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/custom-forms")],
};
