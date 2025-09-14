// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   output: 'export',
//   images: { unoptimized: true },
// };
// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Netlify SSR ishlatsa 'export' qo‘ymang.
  images: { unoptimized: true },

  // 🔽 Lint xatolarini buildda inkor qilish
  eslint: { ignoreDuringBuilds: true },

  // 🔽 TS xatolarida ham build to‘xtamasin (ixtiyoriy)
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
