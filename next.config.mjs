/** @type {import('next').NextConfig} */
const nextConfig = {
  // No `output: 'export'` here: Vercel serves this natively, so next/image
  // gets real resizing + WebP/AVIF conversion.
  images: { formats: ['image/avif', 'image/webp'] },
};

export default nextConfig;
