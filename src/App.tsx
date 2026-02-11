import { useContext } from "react"
import { Context } from "./context/GlobalContext"
import { AuthRoute, DasboardRoute } from "./routes"
function App() {

const {token}=useContext(Context)

return token?(
 <DasboardRoute />
):(
 <AuthRoute />
)
 
}

export default App
