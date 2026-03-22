import {
  useEffect,
  useState,
  type ChangeEvent,
  type MouseEvent,
} from "react";
import { instance, debounce } from "../hooks";
import type { ProductType } from "../@types/ProductType";
import type { CategoryType } from "../@types/CategoryType";
import {
  DeleteIcon,
  EditIcon,
  LikeIcon,
  MoreIcon,
} from "../assets/icons";
import Button from "./Button";
import { Link } from "react-router-dom";
import Modal from "./modal";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { handleLike, handleUnlike } from "../store/ProductClice";

const AllProducts = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [search, setSearch] = useState<string>("");
  const title = debounce(search, 500);
  const [selected, setSelected] = useState<string>("all");
  const [loading, setLoading] = useState<boolean>(true);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const dispatch = useDispatch();
  const likedProductIds = useSelector(
    (state: { product: { likedProductIds: number[] } }) =>
      state.product.likedProductIds
  );

  useEffect(() => {
    instance
      .get<CategoryType[]>("categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setLoading(true);

    const params = new URLSearchParams();
    if (title.trim()) params.set("title", title.trim());
    if (selected !== "all") params.set("categoryId", selected);

    const url = params.toString()
      ? `products?${params.toString()}`
      : "products";

    instance
      .get<ProductType[]>(url)
      .then((res) => setProducts(res.data))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [title, selected]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleFilterByCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value);
  };

  const toggleLike = async (
    e: MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    e.preventDefault();

    const isLiked = likedProductIds.includes(id);

    if (isLiked) {
      dispatch(handleUnlike(id));
      return;
    }

    try {
      const res = await instance.get<ProductType>(`products/${id}`);
      dispatch(handleLike(res.data));
    } catch {
      toast.error("Failed to like product");
    }
  };

  const handleRemoveProduct = () => {
    if (!deleteId) return;

    setLoading(true);

    instance
      .delete(`products/${deleteId}`)
      .then(() => {
        toast.success("Product deleted successfully");
        setProducts((prev) =>
          prev.filter((p) => p.id !== deleteId)
        );
        setDeleteId(null);
      })
      .finally(() => setLoading(false));
  };


  return (
    <div className="w-[95%] mx-auto pt-[40px] pb-[40px]">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-5">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              All Products
            </h2>
            <p className="text-gray-500">
              Manage your catalog
            </p>
          </div>

          <div className="px-5 py-3 rounded-2xl bg-transparent border border-slate-300">
            <select
              name="category"
              className="outline-none border-none bg-transparent "
              onChange={handleFilterByCategory}
              value={selected}
            >
              <option value="all">All</option>
              {categories.map((item) => (
                <option
                  key={item.id}
                  value={String(item.id)}
                >
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Button
          type="button"
          extraClass="!w-[20%] py-[14px] !bg-blue-500 text-white text-sm font-semibold cursor-pointer"
        >
          <Link to="/products/create">
            Create Product
          </Link>
        </Button>

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={handleSearch}
          className="w-[30%] px-5 py-3 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-black rounded-full animate-spin" />
        </div>
      ) : products.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-gray-500 text-lg">
            No products found
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((item) => {
            const isLiked = likedProductIds.includes(item.id);

            return (
              <div
                key={item.id}
                className="group relative bg-white border border-gray-100 rounded-2xl p-3 shadow-sm hover:shadow-md transition-all"
              >
                <div className="relative aspect-square rounded-xl overflow-hidden mb-4 bg-gray-100">
                  <img
                    src={
                      item.images?.[0] ||
                      "https://via.placeholder.com/400"
                    }
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  <span className="absolute bottom-3 right-3 px-4 py-2 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-slate-900 font-bold text-[15px] rounded-full shadow-lg shadow-emerald-500/30 backdrop-blur-md transition-all duration-300 hover:scale-105">
                    ${item.price}
                  </span>

                  <div className="absolute top-4 right-4 flex gap-2 z-20">
                    <button
                      type="button"
                      onClick={(e) =>
                        toggleLike(e, item.id)
                      }
                      className={`cursor-pointer w-10 h-10 flex items-center justify-center rounded-full backdrop-blur-md border border-white/40 shadow-lg shadow-black/20 transition-all duration-300 hover:scale-110 active:scale-95 ${
                        isLiked
                          ? "bg-emerald-500 text-white"
                          : "bg-white/30 text-white hover:bg-emerald-500"
                      }`}
                    >
                      <LikeIcon />
                    </button>

                    <button className="cursor-pointer text-white w-10 h-10 flex items-center justify-center rounded-full backdrop-blur-md border border-white/40 shadow-lg shadow-black/20 transition-all duration-300 hover:scale-110 active:scale-95 hover:backdrop-blur-xl">
                      <Link
                        to={`/products/${item.id}/update`}
                      >
                        <EditIcon />
                      </Link>
                    </button>

                    <button
                      type="button"
                      className="cursor-pointer w-10 h-10 flex items-center justify-center rounded-full bg-white/30 backdrop-blur-md border border-white/40 text-white shadow-lg shadow-black/20 transition-all duration-300 hover:bg-slate-900 hover:text-white hover:scale-110 active:scale-95"
                    >
                      <Link
                        to={`/products/${item.id}`}
                      >
                        <MoreIcon />
                      </Link>
                    </button>

                    <button
                      type="button"
                      className="hover:bg-red-600 cursor-pointer text-white w-10 h-10 flex items-center justify-center rounded-full backdrop-blur-md border border-white/40 shadow-lg shadow-black/20 transition-all duration-300 hover:scale-110 active:scale-95 hover:backdrop-blur-xl"
                      onClick={() =>
                        setDeleteId(item.id)
                      }
                    >
                      <DeleteIcon />
                    </button>
                  </div>

                  <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/30 to-transparent" />
                </div>

                <div className="px-4 pb-4 space-y-2">
                  <h3 className="text-[18px] font-semibold text-slate-900 truncate transition-colors duration-300 group-hover:text-emerald-500">
                    {item.title}
                  </h3>

                  <p className="text-[14px] text-slate-600 leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Modal
        showModal={deleteId !== null}
        setShowModal={() => setDeleteId(null)}
      >
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold">
            Delete Product
          </h1>
          <p className="text-lg text-gray-500">
            Are you sure you want to delete this product?
          </p>
          <div className="flex items-center gap-4 w-full mt-4">
            <button
              className="w-full px-4 py-2 rounded bg-red-500 text-white rounded-2xl"
              onClick={handleRemoveProduct}
            >
              Delete
            </button>
            <button
              className="w-full px-4 py-2 rounded bg-gray-300 text-white rounded-2xl"
              onClick={() => setDeleteId(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AllProducts;
