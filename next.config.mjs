/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async headers() {
        return [
          {
            source: '/public/:path*',
            headers: [
              {
                key: 'Cache-Control',
                value: 'no-store, no-cache, must-revalidate, proxy-revalidate',
              },
            ],
          },
        ];
      },
      
  };
  
  export default nextConfig;
  