import Image from "next/image"

export default function ProductCard({product,col = 'basis-2/6'}){
    return(
        <div className={col}>
            <Image
            src={product.images[1]}
            width={500}
            height={500}
            alt="Picture of the author"
            />
            <p>{product.title}</p>
        </div>
    )
}