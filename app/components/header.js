import Link from "next/link";

export default function Header(){
    return(
        <header>
            Header
            <Link href="/collections/womens-clothings" locale="en">
                English
            </Link>
        </header>
    )
}