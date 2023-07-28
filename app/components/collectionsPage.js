'use client'

import { useEffect, useState } from "react";
import Filter from "./filter";
import ProductCollection from "./productCollection";
import { useRouter } from "next/navigation";

export default function CollectionsPage({content}){
    const [data,setData] = useState(content)
    const [filter,setFilter] = useState(false)
    const router = useRouter()

    console.log(router)

    useEffect(async () => {
        if(filter){
            // const data = await fetch('https://services.mybcapps.com/bc-sf-filter/filter?shop='+process.env.storeDomain+'.myshopify.com&page=1&limit=32&collection_scope='+id+'&product_available=true&variant_available=true&build_filter_tree=true&check_cache=true&locale='+lang+'&sid='+process.env.boostSid)

            // // Recommendation: handle errors
            // if (!data.ok) {
            //     // This will activate the closest `error.js` Error Boundary
            //     throw new Error('Failed to fetch data')
            // }
        }
    },[filter])
    return(
        <div className='collection-page flex flex-row'>
            <div className='basis-1/4'><Filter data={data} filter={filter} setFilter={setFilter}/></div>
            <div className='basis-3/4'><ProductCollection data={data}/></div>
        </div>
    )
}