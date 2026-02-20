import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // Premium Palette
                primary: "#18181B", // Zinc 950 - Jet Black
                secondary: "#4A3B32", // Deep Brown - Earthy
                accent: "#C6A87C", // Rose Gold - Elegant
                "neutral-bg": "#FAFAF9", // Alabaster - Warm Off-white
                surface: "#FFFFFF",
                sand: "#F5F5F4", // Secondary Background
                "warm-gray": "#E7E5E4", // Soft Highlights

                // Functional
                success: "#10B981",
                error: "#EF4444",
                warning: "#F59E0B",
                info: "#3B82F6",
            },
            fontFamily: {
                sans: ["'Plus Jakarta Sans'", "sans-serif"],
                serif: ["'Playfair Display'", "serif"],
            },
            borderRadius: {
                xl: "12px",
                "2xl": "16px",
                pill: "9999px",
            },
            boxShadow: {
                "soft-sm": "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
                "soft-md": "0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)",
                "soft-lg": "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};
export default config;
