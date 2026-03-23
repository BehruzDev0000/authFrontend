import { Route, Routes } from "react-router-dom";
import { useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import { PathPages } from "../components/PathPages";
import Home from "../pages/Dashboard/Home";
import Products from "../pages/Dashboard/Products";
import Category from "../pages/Dashboard/Category";
import NotFound from "../pages/NotFound";

import { Context } from "../context/GlobalContext";
import { Header, Sidebar } from "../modules";
import { LogOutModal, Modal } from "../components";
import BottomNav from "../components/BottomNav";
import CrudProduct from "../pages/Dashboard/CrudProduct";
import ProductMore from "../pages/Dashboard/ProductMore";

const DashboardRoute = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setToken } = useContext(Context);

  const handleLogOut = () => {
    setIsOpen(false);
    localStorage.clear();
    setToken("");
    toast.success("Logged out successfully");
  };

  const dashBoardList = [
    { id: 1, path: PathPages.dashboard, element: <Home /> },
    { id: 2, path: PathPages.category, element: <Category /> },
    { id: 3, path: PathPages.products, element: <Products /> },
    { id: 4, path: PathPages.notFound, element: <NotFound /> },
    { id: 5, path: PathPages.create, element: <CrudProduct /> },
    { id: 6, path: PathPages.update, element: <CrudProduct /> },
    { id: 7, path: PathPages.productMore, element: <ProductMore /> },
  ];

  return (
    <div className="flex min-h-screen bg-[var(--color-background)] transition-colors duration-300">
      <Toaster position="top-center" reverseOrder={false} />

      {/* Sidebar - Hidden on mobile */}
      <Sidebar />

      {/* Main Content */}
      <div className="w-full md:ml-[260px] min-h-screen">
        <Header onLogoutClick={() => setIsOpen(true)} />

        {/* Page Content */}
        <main className="p-4 md:p-6 pb-24 md:pb-6 page-transition">
          <Routes>
            {dashBoardList.map((route) => (
              <Route key={route.id} path={route.path} element={route.element} />
            ))}
          </Routes>
        </main>
      </div>

      {/* Bottom Navigation - Mobile only */}
      <BottomNav />

      {/* Logout Modal */}
      <Modal showModal={isOpen} setShowModal={setIsOpen}>
        <LogOutModal handleLogOut={handleLogOut} setIsOpen={setIsOpen} />
      </Modal>
    </div>
  );
};

export default DashboardRoute;
