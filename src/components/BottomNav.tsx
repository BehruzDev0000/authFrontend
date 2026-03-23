import { Link, useLocation } from "react-router-dom"
import { HomeIcon, ProductIcon, CategoryIcon, SettingsIcon } from "../assets/icons"

interface NavItem {
  path: string
  label: string
  icon: React.ReactNode
}

const navItems: NavItem[] = [
  { path: "/", label: "Home", icon: <HomeIcon /> },
  { path: "/products", label: "Products", icon: <ProductIcon /> },
  { path: "/category", label: "Categories", icon: <CategoryIcon /> },
  { path: "/settings", label: "Settings", icon: <SettingsIcon size={20} /> },
]

const BottomNav = () => {
  const location = useLocation()

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/"
    }
    return location.pathname.startsWith(path)
  }

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[var(--color-card)]/90 backdrop-blur-xl border-t border-[var(--color-border)] px-2 pb-safe transition-colors duration-300">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`
              flex flex-col items-center justify-center gap-1 
              w-16 h-14 rounded-2xl transition-all duration-200 btn-press
              ${
                isActive(item.path)
                  ? "bg-[var(--color-primary)] text-white shadow-lg shadow-blue-500/30"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
              }
            `}
          >
            <span className={`transition-transform duration-200 ${isActive(item.path) ? "scale-110" : ""}`}>
              {item.icon}
            </span>
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default BottomNav
