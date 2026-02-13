import { useEffect, useState, type ChangeEvent } from "react";
import instance from "../hooks/instance";
import type { ProductType } from "../@types/ProductType";
import type { CategoryType } from "../@types/CategoryType";

const AllProducts = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string>("all");

  // hamma productlarni olish uchun helper
  const loadAllProducts = () => {
    instance
      .get<ProductType[]>("products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadAllProducts();

    instance
      .get<CategoryType[]>("categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleFilterByCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelected(value);

    if (value === "all") {
      loadAllProducts();
      return;
    }

    instance.get<ProductType[]>(`categories/${value}/products`).then((res) => setProducts(res.data)).catch((err) => console.log(err));
  };

  const filteredProducts = products.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-[80%] mx-auto pt-[40px] pb-[40px]">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-5">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">All Products</h2>
            <p className="text-gray-500">Manage your catalog</p>
          </div>

          <div className="px-5 py-3 rounded-2xl bg-transparent border border-slate-300">
            <select
              name="category"
              className="outline-none border-none bg-transparent"
              onChange={handleFilterByCategory}
              value={selected}
            >
              <option value="all">All</option>

              {categories.map((item) => (
                <option key={item.id} value={String(item.id)}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={handleSearch}
          className="px-5 py-3 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
        />
      </div>

      {filteredProducts.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-gray-500 text-lg">Product not found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((item) => (
            <div
              key={item.id}
              className="group bg-white border border-gray-100 rounded-2xl p-3 shadow-sm hover:shadow-md transition-all"
            >
              <div className="relative aspect-square rounded-xl overflow-hidden mb-4 bg-gray-100">
                <img
                  src={item.images?.[0] || "https://via.placeholder.com/400"}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              <div className="px-1">
                <h3 className="font-bold text-gray-900 truncate mb-1">
                  {item.title}
                </h3>
                <p className="text-gray-900">$ {item.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProducts;
