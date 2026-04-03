/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://rehabvet.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ['/admin*', '/api*'],
}
