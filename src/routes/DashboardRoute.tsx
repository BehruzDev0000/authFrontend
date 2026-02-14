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
import { LogOutModal,Modal } from "../components";
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
const dashBoardList=[
  {
    id:1,path:PathPages.dashboard,element:<Home/>},
    {
      id:2,path:PathPages.category,element:<Category/>,
    },
    {
      id:3,path:PathPages.products,element:<Products/>
    },
    {
      id:4,path:PathPages.notFound,element:<NotFound/>
    },
    {
      id:5, path:PathPages.create,element:<CrudProduct/>
    },
    {
      id:6, path:PathPages.update,element:<CrudProduct/>
    },
    {
      id:7, path:PathPages.productMore,element:<ProductMore/>
    }
  
]
  return (
    <div className="flex h-screen overflow-hidden bg-[#f8f9fb]">
      <Toaster position="top-center" reverseOrder={false} />

      <Sidebar />

      <div className="ml-[20%] w-[80%] h-screen overflow-y-auto bg-[#f8f9fb]">
        <Header onLogoutClick={() => setIsOpen(true)} />

        <div className="p-4">
          <Routes>
            {dashBoardList.map((route) => (
              <Route key={route.id} path={route.path} element={route.element} />
            ))}
          </Routes>
        </div>
      </div>

      <Modal showModal={isOpen} setShowModal={setIsOpen}>
        <LogOutModal handleLogOut={handleLogOut} setIsOpen={setIsOpen} />
      </Modal>
    </div>
  );
};

export default DashboardRoute;
