import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BuyIcon,
  LeftArrowIcon,
  LikeIconNoFill,
  LogOutIcon,
  UserIcon,
  SunIcon,
  MoonIcon,
  MonitorIcon,
  BellIcon,
  ChevronDownIcon,
} from "../assets/icons";
import { useSelector } from "react-redux";
import { useTheme } from "../context/ThemeContext";

interface HeaderProps {
  onLogoutClick: () => void;
}

const Header = ({ onLogoutClick }: HeaderProps) => {
  const navigate = useNavigate();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const themeMenuRef = useRef<HTMLDivElement>(null);

  const likedCount = useSelector(
    (state: { product: { likedProductIds: number[] } }) =>
      state.product.likedProductIds.length
  );

  // Close theme menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (themeMenuRef.current && !themeMenuRef.current.contains(event.target as Node)) {
        setShowThemeMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const themeOptions = [
    { value: "light", label: "Light", icon: <SunIcon size={16} /> },
    { value: "dark", label: "Dark", icon: <MoonIcon size={16} /> },
    { value: "system", label: "System", icon: <MonitorIcon size={16} /> },
  ] as const;

  return (
    <header className="relative px-4 md:px-8 py-4 flex items-center justify-between bg-[var(--color-header)]/80 backdrop-blur-xl sticky top-0 z-20 border-b border-[var(--color-border)] transition-colors duration-300">
      {/* Left side */}
      <div className="flex items-center justify-start gap-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="p-2.5 rounded-xl bg-[var(--color-surface)] hover:bg-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-all duration-200 btn-press"
        >
          <LeftArrowIcon className="w-5 h-5" />
        </button>

        <div className="hidden sm:block">
          <p className="text-[var(--color-text-muted)] text-sm">Welcome back,</p>
          <p className="text-[var(--color-text-primary)] font-medium">Guest</p>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Theme Switcher */}
        <div className="relative" ref={themeMenuRef}>
          <button
            type="button"
            onClick={() => setShowThemeMenu(!showThemeMenu)}
            className="flex items-center gap-1.5 p-2.5 rounded-xl bg-[var(--color-surface)] hover:bg-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-all duration-200 btn-press"
          >
            {resolvedTheme === "dark" ? <MoonIcon size={18} /> : <SunIcon size={18} />}
            <ChevronDownIcon size={14} className={`transition-transform duration-200 ${showThemeMenu ? "rotate-180" : ""}`} />
          </button>

          {/* Theme Dropdown */}
          {showThemeMenu && (
            <div className="absolute right-0 top-full mt-2 w-40 bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl shadow-xl overflow-hidden animate-fade-in z-50">
              {themeOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    setTheme(option.value);
                    setShowThemeMenu(false);
                  }}
                  className={`flex items-center gap-3 w-full px-4 py-3 text-sm transition-colors duration-150 ${
                    theme === option.value
                      ? "bg-[var(--color-primary)] text-white"
                      : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text-primary)]"
                  }`}
                >
                  {option.icon}
                  {option.label}
                  {theme === option.value && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications */}
        <button
          type="button"
          className="relative p-2.5 rounded-xl bg-[var(--color-surface)] hover:bg-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-all duration-200 btn-press hidden sm:flex"
        >
          <BellIcon size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[var(--color-danger)] rounded-full" />
        </button>

        {/* Likes */}
        <button
          type="button"
          className="relative p-2.5 rounded-xl bg-[var(--color-surface)] hover:bg-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-all duration-200 btn-press"
        >
          <LikeIconNoFill />
          {likedCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 flex items-center justify-center text-[10px] font-bold text-white bg-gradient-to-r from-red-500 to-pink-500 rounded-full shadow-md shadow-red-500/30">
              {likedCount}
            </span>
          )}
        </button>

        {/* Cart */}
        <button
          type="button"
          className="relative p-2.5 rounded-xl bg-[var(--color-surface)] hover:bg-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-all duration-200 btn-press hidden sm:flex"
        >
          <BuyIcon />
        </button>

        {/* User */}
        <button
          type="button"
          className="w-10 h-10 rounded-xl bg-[var(--color-surface)] hover:bg-[var(--color-border)] flex items-center justify-center transition-all duration-200 btn-press overflow-hidden"
        >
          <UserIcon />
        </button>

        {/* Logout */}
        <button
          type="button"
          onClick={onLogoutClick}
          className="hidden md:flex items-center gap-2 rounded-xl bg-[var(--color-surface)] hover:bg-[var(--color-danger)] py-2.5 px-4 text-sm font-medium text-[var(--color-text-secondary)] hover:text-white transition-all duration-200 btn-press"
        >
          <span className="hidden lg:inline">Log Out</span>
          <LogOutIcon />
        </button>
      </div>
    </header>
  );
};

export default Header;
