import { useEffect, useState, type ChangeEvent } from "react";
import { instance } from "../hooks";
import type { CategoryType } from "../@types/CategoryType";
import { SearchIcon } from "../assets/icons";
import { CategoriesGridSkeleton } from "./Skeleton";

const AllCategories = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    instance.get<CategoryType[]>("categories").then((res) => {
      const data = res.data;

      Promise.all(
        data.map((item) =>
          instance
            .get(`categories/${item.id}/products`)
            .then((productRes) => ({
              ...item,
              itemsCount: productRes.data.length,
            }))
        )
      )
        .then((updated) => {
          setCategories(updated);
        })
        .finally(() => setLoading(false));
    });
  }, []);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredCategories = categories.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full max-w-7xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)]">
            Categories
          </h2>
          <p className="text-[var(--color-text-secondary)] mt-1">
            Browse product categories
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]">
            <SearchIcon />
          </div>
          <input
            type="text"
            placeholder="Search categories..."
            value={search}
            onChange={handleSearch}
            className="w-full sm:w-64 pl-10 pr-4 py-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 transition-all"
          />
        </div>
      </div>

      {/* Categories Grid */}
      {loading ? (
        <CategoriesGridSkeleton count={6} />
      ) : filteredCategories.length === 0 ? (
        <div className="py-20 text-center card">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--color-surface)] flex items-center justify-center">
            <SearchIcon />
          </div>
          <p className="text-[var(--color-text-secondary)] text-lg">
            No categories found
          </p>
          <p className="text-[var(--color-text-muted)] text-sm mt-1">
            Try adjusting your search
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((item, index) => (
            <div
              key={item.id}
              className="stagger-item group relative h-64 rounded-2xl overflow-hidden cursor-pointer hover-lift card border-0"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-white font-bold text-xl mb-1 transition-transform duration-300 group-hover:translate-x-2">
                  {item.name}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium">
                    {item.itemsCount ?? 0} items
                  </span>
                </div>
              </div>

              {/* Hover Arrow */}
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllCategories;
