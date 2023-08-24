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



/*

000000
#1E1E1E
#282828
#292929
#333333
#363636
#3D3D3D
#777777
#808080
#9D9D9D
#A9A9A9
#B3B3B3
#E4E4E4

*/