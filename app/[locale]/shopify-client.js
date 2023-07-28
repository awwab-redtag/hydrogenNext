import {createStorefrontClient} from '@shopify/hydrogen-react';

const client = createStorefrontClient({
  privateStorefrontToken: process.env.privateStorefrontToken,
  storeDomain: 'https://'+process.env.storeDomain+'.myshopify.com',
  storefrontApiVersion: process.env.storefrontApiVersion,
});

export const getStorefrontApiUrl = client.getStorefrontApiUrl;
export const getPrivateTokenHeaders = client.getPrivateTokenHeaders;
