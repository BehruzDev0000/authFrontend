import { Link } from "react-router-dom"
import { CategoryIcon, HomeIcon, ProductIcon } from "./../assets/icons"

const Sidebar = () => {
  return (
     <div className="fixed left-0 top-0 h-screen w-[20%] bg-white/70 backdrop-blur-xl border-r border-white/40 shadow-xl">
        <aside className="h-full w-full p-6">
          <div className="flex items-center gap-2 mb-[40px]">
            <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center">
              <span className="text-white font-bold text-lg">.S</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-gray-900 uppercase">
              Store
            </h1>
          </div>

          <nav className="flex flex-col gap-2">
            <Link to="/">
              <button className="flex w-full items-center gap-3 text-left text-sm font-medium px-4 py-3 rounded-xl transition-all duration-300 group bg-black text-white shadow-lg shadow-black/20">
                <HomeIcon />
                Home
              </button>
            </Link>

            <Link to="/products">
              <button className="w-full flex items-center gap-3 text-left text-sm font-medium px-4 py-3 rounded-xl transition-all duration-300 group text-gray-600 hover:bg-white/50 hover:text-black">
                <ProductIcon />
                Products
              </button>
            </Link>

            <Link to="/category">
              <button className="flex w-full items-center gap-3 text-left text-sm font-medium px-4 py-3 rounded-xl transition-all duration-300 group text-gray-600 hover:bg-white/50 hover:text-black">
                <CategoryIcon />
                Categories
              </button>
            </Link>
          </nav>
        </aside>
      </div>
  )
}

export default Sidebar