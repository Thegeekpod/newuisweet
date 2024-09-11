/** @type {import('next').NextConfig} */
const nextConfig = {
    
      async headers() {
        return [
          {
            source: '/blogimage/:path*',
            headers: [
              {
                key: 'Cache-Control',
                value: 'no-store',
              },
            ],
          },
        ];
      },
    
  };
  
  export default nextConfig;
  