'use client'

import { useEffect, useState } from "react";
import Filter from "./filter";
import ProductCollection from "./productCollection";
import { useParams } from "next/navigation";
import { COLLECTION_GRAPHQL_QUERY } from "../collections/[handle]/page";
import { ServerSideStroreFront } from "../shopify-server";

export default function CollectionsPage({content}){
    const [data,setData] = useState(content)
    const [filter,setFilter] = useState(false)
    const params = useParams()

    // console.log(data)

    useEffect(() => {
        async function fetchCollection(){
            const body = JSON.stringify({
                query: COLLECTION_GRAPHQL_QUERY,
                variables:{
                    "handle":params.handle
                }
            })
        
            const gid = await ServerSideStroreFront({body})
            const id = gid.data.collectionByHandle.id.split('/').pop()

            let filterQuery = ''
            if(filter.length>0){
                filterQuery = '&event_type=filter'
                filter.map(filter => {
                    filter = filter.split("=")
                    filterQuery += '&'+filter[0]+'[]='+encodeURIComponent(filter[1])
                })
            }

            console.log(filterQuery)
            
            const res = await fetch('https://services.mybcapps.com/bc-sf-filter/filter?shop='+process.env.storeDomain+'.myshopify.com&page=1&limit=32&collection_scope='+id+'&product_available=true&variant_available=true&build_filter_tree=true&check_cache=true&locale='+params.locale+'&sid='+process.env.boostSid+filterQuery)

            // Recommendation: handle errors
            if (!res.ok) {
                // This will activate the closest `error.js` Error Boundary
                throw new Error('Failed to fetch data')
            }

            setData(await res.json())
        }
        if(filter){
            fetchCollection()
        }
    },[filter])

    return(
        <div className='collection-page flex flex-row'>
            <div className='basis-1/4'><Filter data={data} filter={filter} setFilter={setFilter}/></div>
            <div className='basis-3/4'><ProductCollection data={data}/></div>
        </div>
    )
}