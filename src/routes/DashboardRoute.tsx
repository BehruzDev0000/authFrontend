import { Route, Routes } from "react-router-dom"
import { PathPages } from "../components/PathPages"
import Home from "../pages/Dashboard/Home"
import Products from "../pages/Dashboard/Products"
import Category from "../pages/Dashboard/Category"
import NotFound from "../pages/NotFound"

const DashboardRouteList=[
  {
    id:1,
    path:PathPages.dashboard,
    element:<Home />
  },
  {
    id:2,
    path:PathPages.products,
    element:<Products />
  },
  {
    id:3,
    path:PathPages.category,
    element:<Category />
  },
  {
    id:4,
    path:PathPages.notFound,
    element:<NotFound />
  }
]

const AuthRoute = () => {
  return (
     <Routes>
      {DashboardRouteList.map((route)=>(
        <Route key={route.id} path={route.path} element={route.element} />
      ))}
  </Routes>
  )
}

export default AuthRoute