/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
        privateStorefrontToken: '79e3aa89c3923a1457cd16be9c6f768d',
        storeDomain: 'rtdevplus',
        storefrontApiVersion: '2023-07',
        boostSid: '5495b480-2dee-4bba-9a50-f4f14d3451cc'
    }
}

const withNextIntl = require('next-intl/plugin')(
    // This is the default (also the `src` folder is supported out of the box)
    './i18n.js'
);

module.exports = withNextIntl(nextConfig)
