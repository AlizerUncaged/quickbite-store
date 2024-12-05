/** @type {import('tailwindcss').Config} */
export default {
        content: [
                "./index.html",
                "./src/**/*.{js,ts,jsx,tsx}",
        ],
        theme: {
                extend: {
                        colors: {
                                primary: '#FECD4C',
                                secondary: '#F05D36',
                        }
                },
        },
        plugins: [],
}