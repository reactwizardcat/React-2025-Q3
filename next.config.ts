import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/search/1',
        permanent: true,
      },
      {
        source: '/search',
        destination: '/search/1',
        permanent: true,
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
