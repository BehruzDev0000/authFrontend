import { Link, useLocation } from "react-router-dom"
import { CategoryIcon, HomeIcon, ProductIcon, SettingsIcon } from "./../assets/icons"

interface NavItem {
  path: string
  label: string
  icon: React.ReactNode
}

const navItems: NavItem[] = [
  { path: "/", label: "Home", icon: <HomeIcon /> },
  { path: "/products", label: "Products", icon: <ProductIcon /> },
  { path: "/category", label: "Categories", icon: <CategoryIcon /> },
]

const Sidebar = () => {
  const location = useLocation()

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/"
    }
    return location.pathname.startsWith(path)
  }

  return (
    <div className="hidden md:block fixed left-0 top-0 h-screen w-[260px] bg-[var(--color-sidebar)] border-r border-[var(--color-border)] transition-colors duration-300">
      <aside className="h-full w-full p-6 flex flex-col">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)] flex items-center justify-center shadow-lg shadow-blue-500/20">
            <span className="text-white font-bold text-lg">.S</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-[var(--color-text-primary)] uppercase">
            Store
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1.5 flex-1">
          <span className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-2 px-4">
            Menu
          </span>
          
          {navItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <button
                className={`
                  flex w-full items-center gap-3 text-left text-sm font-medium 
                  px-4 py-3 rounded-xl transition-all duration-200 group btn-press
                  ${
                    isActive(item.path)
                      ? "bg-[var(--color-primary)] text-white shadow-lg shadow-blue-500/25"
                      : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text-primary)]"
                  }
                `}
              >
                <span className={`transition-transform duration-200 ${!isActive(item.path) ? "group-hover:scale-110" : ""}`}>
                  {item.icon}
                </span>
                {item.label}
                {isActive(item.path) && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white/80" />
                )}
              </button>
            </Link>
          ))}
        </nav>

        {/* Bottom section */}
        <div className="pt-4 border-t border-[var(--color-border)]">
          <Link to="/settings">
            <button className="flex w-full items-center gap-3 text-left text-sm font-medium px-4 py-3 rounded-xl transition-all duration-200 text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text-primary)] btn-press">
              <SettingsIcon size={20} />
              Settings
            </button>
          </Link>
        </div>
      </aside>
    </div>
  )
}

export default Sidebar
