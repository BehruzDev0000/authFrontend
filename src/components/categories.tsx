import { useEffect, useState, type ChangeEvent } from "react";
import instance from "../hooks/instance";
import type { CategoryType } from "../@types/CategoryType";
import { SearchIcon } from "../assets/icons";

const AllCategories = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
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
      ).then((updated) => {
        setCategories(updated);
      });
    });
  }, []);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredCategories = categories.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-[80%] mx-auto pt-[40px] pb-[40px]">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Categories</h2>

        <div className="relative">
          <div className="absolute left-3 top-3">
            <SearchIcon />
          </div>
          <input
            type="text"
            placeholder="Search categories..."
            value={search}
            onChange={handleSearch}
            className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-full text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCategories.map((item) => (
          <div
            key={item.id}
            className="relative h-64 rounded-3xl overflow-hidden group border border-gray-100 shadow-sm"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 p-4 text-center  w-full bg-slate-500/20">
              <h3 className="text-white font-medium text-[20px]">{item.name}</h3>
              <p className="text-sm">{item.itemsCount ?? 0} items</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCategories;
