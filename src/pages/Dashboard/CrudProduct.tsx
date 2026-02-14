import { useEffect, useState, type SubmitEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import instance from "../../hooks/instance";
import type { ProductType } from "../../@types/ProductType";
import type { CategoryType } from "../../@types/CategoryType";
import { Button } from "../../components";

// type Controls = {
//   title: HTMLInputElement;
//   description: HTMLInputElement;
//   price: HTMLInputElement;
//   image: HTMLInputElement;
//   categoryId: HTMLSelectElement;
// };

const CrudProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductType>();
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    instance
      .get<CategoryType[]>("categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    instance
      .get<ProductType>(`products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleCrud = async (e:SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();


    

    const data = {
      title: e.target.productName.value,
      price: e.target.price.value,
      description: e.target.description.value,
      categoryId: e.target.categoryId.value,
      images: [e.target.image.value],
    };
    try {
      if (id) {
        await instance.put(`products/${id}`, data);
        navigate(`/products`);

      } else {
        await instance.post("products", data);
        navigate(`/products`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      <div className="relative w-full max-w-[560px]">
        <form
          onSubmit={handleCrud}
          className="flex flex-col gap-4 p-8 bg-white rounded-3xl shadow-2xl border border-slate-200"
        >
          <div className="text-center mb-2">
            <h2 className="text-2xl font-semibold text-slate-900">
              {id ? "Update Product" : "Create Product"}
            </h2>
            <p className="text-sm text-slate-500 mt-3">
              Fill in the product information below
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-700">Product Name</label>
            <input
              name="productName"
              type="text"
              defaultValue={product?.title ?? ""}
              placeholder="Enter product name"
              className="w-full rounded-xl border border-slate-300 bg-white px-5 py-4 text-sm text-slate-900 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200 transition"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-700">Description</label>
            <input
              name="description"
              type="text"
              defaultValue={product?.description ?? ""}
              placeholder="Enter product description"
              className="w-full rounded-xl border border-slate-300 bg-white px-5 py-4 text-sm text-slate-900 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200 transition"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-700">Price</label>
              <input
                name="price"
                type="number"
                defaultValue={product?.price ?? ""}
                placeholder="Enter product price"
                className="w-full rounded-xl border border-slate-300 bg-white px-5 py-4 text-sm text-slate-900 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200 transition"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-700">Category</label>
              <select
                name="categoryId"
                defaultValue={product?.categoryId ?? ""}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-4 text-sm text-slate-900 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200 transition"
                required
              >
                <option value="" disabled>
                  Select category
                </option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-700">Image URL</label>
            <input
              name="image"
              type="text"
              defaultValue={product?.images?.[0] ?? ""}
              placeholder="Enter product image"
              className="w-full rounded-xl border border-slate-300 bg-white px-5 py-4 text-sm text-slate-900 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200 transition"
              required
            />
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              extraClass={`w-full !text-white ${
                id ? "!bg-slate-900 hover:!bg-black" : "!bg-emerald-500 hover:!bg-emerald-600"
              } ${loading ? "opacity-70 pointer-events-none" : ""}`}
            >
              {loading ? "Loading..." : id ? "Update Product" : "Add Product"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrudProduct;
