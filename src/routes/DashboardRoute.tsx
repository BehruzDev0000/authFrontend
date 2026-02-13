import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { PathPages } from "../components/PathPages";
import Home from "../pages/Dashboard/Home";
import Products from "../pages/Dashboard/Products";
import Category from "../pages/Dashboard/Category";
import NotFound from "../pages/NotFound";
import {
  BuyIcon,
  CategoryIcon,
  HomeIcon,
  LeftArrowIcon,
  ProductIcon,
  SearchIcon,
  UserIcon,
} from "../assets/icons";
import { Button } from "../components";
import Modal from "../components/modal";
import {useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Context } from "../context/GlobalContext";

const DashboardRouteList = [
  {
    id: 1,
    path: PathPages.dashboard,
    element: <Home />,
  },
  {
    id: 2,
    path: PathPages.products,
    element: <Products />,
  },
  {
    id: 3,
    path: PathPages.category,
    element: <Category />,
  },
  {
    id: 4,
    path: PathPages.notFound,
    element: <NotFound />,
  },
];

const DashboardRoute = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {setToken}=useContext(Context)
  const navigate=useNavigate()
const handleLogOut=()=>{
  setIsOpen(false)
  localStorage.clear()
  
  setToken('')
  
  toast.success("Logged out successfully")
}
  return (
    <div className="flex h-screen overflow-hidden bg-[#f8f9fb]">
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
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

      <div className="ml-[20%] w-[80%] h-screen overflow-y-auto bg-[#f8f9fb]">
        <header className="px-8 py-6 flex items-center justify-between bg-white/50 backdrop-blur-sm sticky top-0 z-20">
          <div className="flex items-center justify-start gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="p-2 rounded-lg hover:bg-gray-100 active:scale-95 transition "
            >
              <LeftArrowIcon className="w-6 h-6" />
            </button>

            <p className="text-gray-500 text-sm">Welcome back. Guest</p>
          </div>

          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center transition-colors shadow-sm text-gray-600">
              <SearchIcon />
            </button>

            <button className="relative w-10 h-10 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center transition-colors shadow-sm text-gray-600">
              <BuyIcon />
            </button>

            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-sm flex items-center justify-center">
              <UserIcon />
            </div>
            <div >
              <Button type="submit" onClick={() => setIsOpen(true)}>Log Out</Button>
          
            </div>
          </div>
        </header>
        <div className="p-8">
          <Routes>
            {DashboardRouteList.map((item) => (
              <Route key={item.id} path={item.path} element={item.element} />
            ))}
          </Routes>
        </div>
      </div>
        <Modal showModal={isOpen} setShowModal={setIsOpen}>
  <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md m-4 overflow-hidden transform transition-all">
    
    <div className="p-6 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 mb-4">
        <svg 
          className="h-8 w-8 text-red-500" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth="2" 
          stroke="currentColor" 
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
        </svg>
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-2">
        Tizimdan chiqmoqchimisiz?
      </h3>
      <p className="text-sm text-gray-500 mb-6">
        Haqiqatan ham hisobingizdan chiqmoqchimisiz? Bu amalni ortga qaytarib bo'lmaydi.
      </p>

      <div className="flex gap-3 justify-center">
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="w-full px-4 py-2.5 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-4 focus:ring-gray-100 font-medium transition duration-200"
        >
          Yo'q, qolish
        </button>

        <button
          type="button"
          onClick={handleLogOut}
          className="w-full px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium shadow-lg shadow-red-500/30 transition duration-200"
        >
          Ha, chiqish
        </button>
      </div>
    </div>
  </div>
</Modal>
    </div>
  );
};

export default DashboardRoute;
