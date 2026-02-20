import { useNavigate } from "react-router-dom";
import {
  BuyIcon,
  LeftArrowIcon,
  LikeIconNoFill,
  LogOutIcon,
  UserIcon,
} from "../assets/icons";
import { useSelector } from "react-redux";

interface HeaderProps {
  onLogoutClick: () => void;
}

const Header = ({ onLogoutClick }: HeaderProps) => {
  const navigate = useNavigate();
  const likedCount = useSelector(
    (state: { product: { likedProductIds: number[] } }) =>
      state.product.likedProductIds.length
  );
  return (
    <header className="relative z-50 px-8 py-6 flex items-center justify-between bg-white/50 backdrop-blur-sm sticky top-0 z-20">
      <div className="flex items-center justify-start gap-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="p-2 rounded-lg hover:bg-gray-100 active:scale-95 transition"
        >
          <LeftArrowIcon className="w-6 h-6" />
        </button>

        <p className="text-gray-500 text-sm">Welcome back. Guest</p>
      </div>

      <div className="relative flex items-center gap-4">
        <div
          className="relative w-10 h-10 rounded-full 
                bg-white hover:bg-gray-100 
                flex items-center justify-center 
                transition-all duration-200
                shadow-sm hover:shadow-md
                text-gray-600"
        >
          <LikeIconNoFill />

          {likedCount > 0 && (
            <span
              className="absolute -top-1 -right-1 
                     min-w-[20px] h-[20px] 
                     px-1 
                     flex items-center justify-center 
                     text-[11px] font-semibold
                     text-white 
                     bg-gradient-to-r from-red-500 to-pink-500
                     rounded-full 
                     shadow-md shadow-red-500/40
                     animate-scaleIn"
            >
              {likedCount}
            </span>
          )}
        </div>

        <button
          type="button"
          className="relative w-10 h-10 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center transition-colors shadow-sm text-gray-600"
        >
          <BuyIcon />
        </button>

        <div className="relative w-10 h-10 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center transition-colors shadow-sm text-gray-600">
          <UserIcon />
        </div>

        <button
          type="button"
          onClick={onLogoutClick}
          className="rounded-2xl bg-white py-2.5 px-5 text-sm font-semibold text-slate-900
             flex items-center gap-2
             hover:bg-gray-100 transition-colors
             shadow-sm hover:shadow-sm
             border-none cursor-pointer"
        >
          Log Out <LogOutIcon />
        </button>
      </div>
    </header>
  );
};

export default Header;
