import { useContext } from "react"
import { Context } from "./context/GlobalContext"
import { AuthRoute, DashboardRoute } from "./routes"
function App() {

const {token}=useContext(Context)

return token?(
 <DashboardRoute />
):(
 <AuthRoute />
)
 
}

export default App
