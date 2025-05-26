/**
 * tailwind.config.js
 * This file configures Tailwind CSS for the project.
 * It specifies the content paths for purging unused styles.
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

