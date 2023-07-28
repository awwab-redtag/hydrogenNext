import CollectionsPage from '@/app/[locale]/components/collectionsPage.js';
import {ServerSideStroreFront} from '../../shopify-server.js';

async function getData({context}) {
    const { handle, locale } = context.params
    const lang = locale=='ar' ? 'ar':'en'

    const body = JSON.stringify({
        query: COLLECTION_GRAPHQL_QUERY,
        variables:{
            "handle":handle
        }
    })

    const gid = await ServerSideStroreFront({body})
    const id = gid.data.collectionByHandle.id.split('/').pop()

    const data = await fetch('https://services.mybcapps.com/bc-sf-filter/filter?shop='+process.env.storeDomain+'.myshopify.com&page=1&limit=32&collection_scope='+id+'&product_available=true&variant_available=true&build_filter_tree=true&check_cache=true&locale='+lang+'&sid='+process.env.boostSid)

    // Recommendation: handle errors
    if (!data.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return data.json()
}
   
export default async function Collections(context){
    const content = await getData({context});
    return(
        <CollectionsPage content={content}/>
    )
}

// A Storefront API query, defined in a separate file where you make queries.
export const COLLECTION_GRAPHQL_QUERY = `#graphql
    query ($handle: String!) {
        collectionByHandle(handle: $handle) {
            id
        }
    }
`;