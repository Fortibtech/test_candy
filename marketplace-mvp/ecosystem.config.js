module.exports = {
    apps: [
        {
            name: "marketplace-backend",
            cwd: "./backend",
            script: "dist/main.js", // Assumes 'npm run build' has been run
            env: {
                NODE_ENV: "production",
                PORT: 3021,
                DATABASE_URL: "postgresql://neondb_owner:npg_z7FbaX0VslYk@ep-crimson-scene-aihcduux-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require", // Ensure this is set securely on VPS or here
                JWT_SECRET: "SECRET_KEY_MVP",
                STRIPE_SECRET_KEY: "sk_test_..." // REMPLACEZ PAR VOTRE CLE SECRETE SUR LE VPS
            },
        },
        {
            name: "marketplace-frontend",
            cwd: "./frontend",
            script: "npm",
            args: "start -- -p 3022",
            env: {
                NODE_ENV: "production",
                NEXT_PUBLIC_API_URL: "https://api.marketplace.com", // CHANGE THIS TO YOUR ACTUAL DOMAIN/IP
                NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: "pk_test_51SsTZyBMYHyDajB5AStoxOop2d9J05jb7zBwQlkPJTj1TXH9TLyGZrF86R7ZnvFFzs3GHz1uSx5mzVis3rESWu6t00ZhX4WIOH"
            },
        },
    ],
};
