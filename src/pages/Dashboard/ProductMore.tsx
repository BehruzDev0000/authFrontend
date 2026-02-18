import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {instance} from "../../hooks";
import type { ProductType } from "../../@types/ProductType";;

const ProductMore = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<ProductType | null>(null);
  const [activeImg, setActiveImg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!id) {
      setError("Product id is missing.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    instance
      .get<ProductType>(`products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setActiveImg(res.data.images?.[0] || "");
      })
      .catch(() => {
        setProduct(null);
        setError("Failed to load product.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
        <div className="flex items-center gap-3 rounded-2xl bg-white border border-slate-200 px-6 py-4 shadow-sm">
          <div className="w-6 h-6 border-2 border-slate-200 border-t-slate-900 rounded-full animate-spin" />
          <p className="text-slate-700 font-medium">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
        <div className="w-full max-w-lg rounded-3xl bg-white border border-slate-200 shadow-lg p-8">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-xl font-semibold text-slate-900">Oops</h1>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
              ID: {id ?? "—"}
            </span>
          </div>

          <p className="mt-3 text-slate-600">{error || "Product not found."}</p>

          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-full rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50 transition"
            >
              Go Back
            </button>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="w-full rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-black transition"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  const images = product.images?.length ? product.images : [];

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-6 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 shadow-sm hover:bg-slate-50 transition"
          >
            <span className="text-lg leading-none">←</span>
            Back
          </button>

          <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white text-slate-700 border border-slate-200 shadow-sm">
            Product ID: {product.id}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-3xl bg-white border border-slate-200 shadow-xl overflow-hidden">
            <div className="relative aspect-square bg-slate-100">
              <img
                src={activeImg || images[0]}
                alt={product.title}
                className="w-full h-full object-cover"
              />

              <div className="absolute bottom-4 right-4">
                <span className="px-4 py-2 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-slate-900 font-bold text-[15px] rounded-full shadow-lg shadow-emerald-500/25">
                  ${product.price}
                </span>
              </div>

              <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            <div className="p-4 flex gap-3 overflow-x-auto">
              {images.map((img, idx) => {
                return (
                  <button
                    type="button"
                    key={`${img}-${idx}`}
                    onClick={() => setActiveImg(img)}
                    className={`shrink-0 h-16 w-16 rounded-2xl overflow-hidden border transition ${
                      activeImg === img ? "border-slate-900" : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <img src={img} alt={`thumb-${idx}`} className="w-full h-full object-cover" />
                  </button>
                );
              })}
            </div>
          </div>
          <div className="rounded-3xl bg-white border border-slate-200 shadow-xl p-7">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-sm text-slate-500">
                  Category: <span className="font-semibold text-slate-700">{product.category?.name ?? "—"}</span>
                </p>
                <h1 className="mt-2 text-3xl font-bold text-slate-900 truncate">
                  {product.title}
                </h1>
              </div>

              <span className="shrink-0 px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold">
                {product.slug}
              </span>
            </div>

            <div className="mt-5 rounded-2xl bg-slate-50 border border-slate-200 p-4">
              <p className="text-sm font-semibold text-slate-800">Description</p>
              <p className="mt-2 text-slate-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-xs text-slate-500">Created</p>
                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {product.createdAt ? new Date(product.createdAt).toLocaleString() : "—"}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-xs text-slate-500">Updated</p>
                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {product.updatedAt ? new Date(product.updatedAt).toLocaleString() : "—"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductMore;
