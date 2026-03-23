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
  SearchIcon,
} from "../assets/icons";
import Button from "./Button";
import { Link } from "react-router-dom";
import Modal from "./modal";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { handleLike, handleUnlike } from "../store/ProductClice";
import { ProductsGridSkeleton } from "./Skeleton";

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

  const toggleLike = async (e: MouseEvent<HTMLButtonElement>, id: number) => {
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
        setProducts((prev) => prev.filter((p) => p.id !== deleteId));
        setDeleteId(null);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="w-full max-w-7xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)]">
            All Products
          </h2>
          <p className="text-[var(--color-text-secondary)] mt-1">
            Manage your catalog
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Category Filter */}
          <div className="px-4 py-2.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] transition-colors">
            <select
              name="category"
              className="outline-none border-none bg-transparent text-[var(--color-text-primary)] text-sm cursor-pointer"
              onChange={handleFilterByCategory}
              value={selected}
            >
              <option value="all">All Categories</option>
              {categories.map((item) => (
                <option key={item.id} value={String(item.id)}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* Search */}
          <div className="relative flex-1 sm:flex-none">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={handleSearch}
              className="w-full sm:w-64 pl-10 pr-4 py-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 transition-all"
            />
          </div>

          {/* Create Button */}
          <Link to="/products/create">
            <Button
              type="button"
              extraClass="w-full sm:w-auto py-2.5 px-6 !bg-[var(--color-primary)] hover:!bg-[var(--color-primary-hover)] text-white text-sm font-semibold cursor-pointer rounded-xl btn-press transition-colors"
            >
              Create Product
            </Button>
          </Link>
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <ProductsGridSkeleton count={6} />
      ) : products.length === 0 ? (
        <div className="py-20 text-center card">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--color-surface)] flex items-center justify-center">
            <SearchIcon />
          </div>
          <p className="text-[var(--color-text-secondary)] text-lg">
            No products found
          </p>
          <p className="text-[var(--color-text-muted)] text-sm mt-1">
            Try adjusting your search or filters
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((item, index) => {
            const isLiked = likedProductIds.includes(item.id);

            return (
              <div
                key={item.id}
                className="stagger-item group relative card p-3 hover-lift"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Image Container */}
                <div className="relative aspect-square rounded-xl overflow-hidden mb-4 bg-[var(--color-surface)]">
                  <img
                    src={item.images?.[0] || "https://via.placeholder.com/400"}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Price Badge */}
                  <span className="absolute bottom-3 right-3 px-4 py-2 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-slate-900 font-bold text-sm rounded-full shadow-lg shadow-emerald-500/30 backdrop-blur-md transition-all duration-300 hover:scale-105">
                    ${item.price}
                  </span>

                  {/* Action Buttons */}
                  <div className="absolute top-3 right-3 flex gap-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      type="button"
                      onClick={(e) => toggleLike(e, item.id)}
                      className={`cursor-pointer w-9 h-9 flex items-center justify-center rounded-full backdrop-blur-md border border-white/40 shadow-lg shadow-black/20 transition-all duration-300 hover:scale-110 active:scale-95 ${
                        isLiked
                          ? "bg-emerald-500 text-white"
                          : "bg-white/30 text-white hover:bg-emerald-500"
                      }`}
                    >
                      <LikeIcon />
                    </button>

                    <Link to={`/products/${item.id}/update`}>
                      <button className="cursor-pointer text-white w-9 h-9 flex items-center justify-center rounded-full bg-white/30 backdrop-blur-md border border-white/40 shadow-lg shadow-black/20 transition-all duration-300 hover:scale-110 active:scale-95 hover:bg-[var(--color-primary)]">
                        <EditIcon />
                      </button>
                    </Link>

                    <Link to={`/products/${item.id}`}>
                      <button
                        type="button"
                        className="cursor-pointer w-9 h-9 flex items-center justify-center rounded-full bg-white/30 backdrop-blur-md border border-white/40 text-white shadow-lg shadow-black/20 transition-all duration-300 hover:bg-slate-900 hover:scale-110 active:scale-95"
                      >
                        <MoreIcon />
                      </button>
                    </Link>

                    <button
                      type="button"
                      className="hover:bg-[var(--color-danger)] cursor-pointer text-white w-9 h-9 flex items-center justify-center rounded-full bg-white/30 backdrop-blur-md border border-white/40 shadow-lg shadow-black/20 transition-all duration-300 hover:scale-110 active:scale-95"
                      onClick={() => setDeleteId(item.id)}
                    >
                      <DeleteIcon />
                    </button>
                  </div>

                  {/* Gradient Overlay */}
                  <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/30 to-transparent" />
                </div>

                {/* Content */}
                <div className="px-2 pb-2 space-y-2">
                  <h3 className="text-base font-semibold text-[var(--color-text-primary)] truncate transition-colors duration-300 group-hover:text-[var(--color-primary)]">
                    {item.title}
                  </h3>

                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Delete Modal */}
      <Modal showModal={deleteId !== null} setShowModal={() => setDeleteId(null)}>
        <div className="flex flex-col items-center justify-center p-2">
          <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4">
            <DeleteIcon />
          </div>
          <h1 className="text-xl font-bold text-[var(--color-text-primary)]">
            Delete Product
          </h1>
          <p className="text-[var(--color-text-secondary)] text-center mt-2">
            Are you sure you want to delete this product? This action cannot be
            undone.
          </p>
          <div className="flex items-center gap-3 w-full mt-6">
            <button
              className="flex-1 px-4 py-3 rounded-xl bg-[var(--color-surface)] text-[var(--color-text-primary)] font-medium hover:bg-[var(--color-border)] transition-colors btn-press"
              onClick={() => setDeleteId(null)}
            >
              Cancel
            </button>
            <button
              className="flex-1 px-4 py-3 rounded-xl bg-[var(--color-danger)] text-white font-medium hover:bg-red-600 transition-colors btn-press"
              onClick={handleRemoveProduct}
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AllProducts;
