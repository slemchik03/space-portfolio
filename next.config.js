/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        reactCompiler: true
    },
    transpilePackages: ["three"],
};

module.exports = nextConfig;
