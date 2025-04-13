import { Search } from "lucide-react"
import Link from "next/link"

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm">
    <div className="flex-1">
     
    </div>
    <div className="flex-none">
      <Link href={"/search"} className="btn btn-square btn-ghost">
      <Search />
      </Link>
    </div>
  </div>
  )
}
export default Navbar