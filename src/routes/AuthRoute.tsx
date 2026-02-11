import { Route, Routes } from "react-router-dom"
import { PathPages } from "../components/PathPages"
import Login from "../pages/Auth/Login"
import Register from "../pages/Auth/Register"
import NotFound from "../pages/NotFound"

const AuthRouteList=[
    {
        id:1,
        path:PathPages.login,
        element:<Login />
    },
    {
        id:2,
        path:PathPages.register,
        element:<Register />
    },
    {
        id:3,
        path:PathPages.notFound,
        element:<NotFound />
    }
]
const AuthRoute = () => {
  return (
     <Routes>
      {AuthRouteList.map((route)=>(
        <Route key={route.id} path={route.path} element={route.element} />
      ))}
  </Routes>
  )
}

export default AuthRoute