import {ServerSideStroreFront} from '../../shopify-server.js';

async function getData(context) {
    const { slug } = context.params
    console.log(slug)
    const body = JSON.stringify({
        query: GRAPHQL_QUERY,
        variables:{
            "handle":slug
        }
    })

    const gid = await ServerSideStroreFront({body})

    const id = gid.data.collectionByHandle.id.split('/').pop()

    const data = await fetch('https://services.mybcapps.com/bc-sf-filter/filter?shop='+process.env.storeDomain+'.myshopify.com&page=1&limit=32&collection_scope='+id+'&product_available=true&variant_available=true&build_filter_tree=true&check_cache=true&locale=en&sid='+process.env.boostSid)

    // Recommendation: handle errors
    if (!data.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return data.json()
}
   
export default async function Collections(context){
    const data = await getData(context);
    // console.log(data)
    return(
        'Collections'
    )
}

// A Storefront API query, defined in a separate file where you make queries.
const GRAPHQL_QUERY = `#graphql
    query ($handle: String!) {
        collectionByHandle(handle: $handle) {
            id
        }
    }
`;