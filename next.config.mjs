/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    DOTENV_LOCAL_PATH: '.env.local'
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ybfrmhradztqizzobkvg.supabase.co',
      },
    ],
  },
};
  
export default nextConfig;