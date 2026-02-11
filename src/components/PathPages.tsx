import { Link } from "react-router-dom";

export const PathPages = {
  login: "/",
  register: "/register",
  dashboard: "/",
  category: "/category",
  products: "/products",
  notFound: "*",
};
export const PageDirectional = ({ path }: { path: "/" | "/register" }) => {
  return path === "/register" ? (
    <>
      <p className="pt-3 text-center text-sm text-white/60">
        Don’t have an account?{" "}
        <Link
          to={PathPages.register}
          className="text-white hover:underline underline-offset-4"
        >
          Create one
        </Link>
      </p>
    </>
  ) : (
    <>
      <p className="pt-3 text-center text-sm text-white/60">
        Do you have an account?{" "}
        <Link
          to={PathPages.login}
          className="text-white hover:underline underline-offset-4"
        >
          Log In
        </Link>
      </p>
    </>
  );
};
