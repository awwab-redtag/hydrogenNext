import ProductCard from "./productCard"

export default function ProductCollection({data}){
    console.log(data.products[0])
    return(
        <div className="flex flex-wrap">
            {data.products.map((product) => {
                return(
                    <ProductCard product={product} key={'product-'+product.id} />
                )
            })}
        </div>
    )
}