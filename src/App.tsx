import { useContext } from "react"
import { Context } from "./context/GlobalContext"
import { ThemeProvider } from "./context/ThemeContext"
import { AuthRoute, DashboardRoute } from "./routes"

function App() {
  const { token } = useContext(Context)

  return (
    <ThemeProvider>
      {token ? <DashboardRoute /> : <AuthRoute />}
    </ThemeProvider>
  )
}

export default App
