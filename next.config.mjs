/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  webpack: (config) => {
    config.resolve.fallback = {
      aws4: false,
    }
    config.module.rules.push({
      test: /\.node$/,
      use: 'node-loader',
    })
    return config
  },
}

export default nextConfig
