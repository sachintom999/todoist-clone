/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                dark1: "#292928",
                dark2: "#212021",
                dark3: "#252525",
            },
        },
    },
    plugins: [require("@tailwindcss/forms")],
}
