/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  distDir: 'build',
  env: {
    BASE_API: process.env.BASE_API,
    BASE_S3: process.env.BASE_S3,
  },
};
