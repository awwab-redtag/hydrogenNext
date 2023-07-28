export const ServerSideStroreFront = async ({body}) => {
    const headers = {
        "X-Shopify-Storefront-Access-Token": process.env.privateStorefrontToken,
        "Content-Type": "application/json"
    };

    const res = await fetch('https://'+process.env.storeDomain+'.myshopify.com/api/'+process.env.storefrontApiVersion+'/graphql.json', {headers:headers, body, method: 'POST'})

    // Recommendation: handle errors
    if (!res.ok) {
      console.log(res)
      return false
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }

    return res.json()
}