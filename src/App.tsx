// import { useContext } from "react"
// import { Route, Routes } from "react-router-dom"
// import { Context } from "./context/GlobalContext"
// import Home from "./pages/Dashboard/Home"
// import Products from "./pages/Dashboard/Products"
// import Category from "./pages/Dashboard/Category"
// import NotFound from "./pages/NotFound"
import Login from "./pages/Auth/Login"
// import Register from "./pages/Auth/Register"

function App() {
  return <Login/>

// const {token}=useContext(Context)

// return token?(
//   <Routes>
//     <Route path="/" element={<Home />} />
//     <Route path="/products" element={<Products />} />
//     <Route path="/category" element={<Category />} />
//     <Route path="*" element={<NotFound/>} />
//   </Routes>
// ):(
//   <Routes>
//     <Route path="/" element={<Login />} />
//     <Route path="/register" element={<Register />} />
//     <Route path="*" element={<NotFound />} />
//   </Routes>
// )
 
}

export default App
