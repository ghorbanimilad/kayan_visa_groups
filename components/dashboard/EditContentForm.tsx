"use client";

import { useState, useEffect } from "react";
import { ContentSection, VisaType } from "@prisma/client";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Editor from "./Ckeditor";

type ContentFormData = {
  title: string;
  body: string;
  section: ContentSection | null | "";
  imageUrl: string;
  order: number;
  countryId: string;
  visaTypeIds: string[];
};

type Props = {
  contentId: string;
};

export default function EditContentForm({ contentId }: Props) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [section, setSection] = useState<ContentSection | "">("");
  const [imageUrl, setImageUrl] = useState("");
  const [order, setOrder] = useState(0);
  const [countryId, setCountryId] = useState("");
  const [selectedVisaId, setSelectedVisaId] = useState<string>(""); // فقط یک مقدار

  const [countries, setCountries] = useState<{ id: string; name: string }[]>([]);
  const [visaTypes, setVisaTypes] = useState<VisaType[]>([]);

  const router = useRouter();
  const inputClass = "w-full border border-gray-300 p-2 mt-1 rounded";

  // 📌 گرفتن داده اولیه محتوا و options
  useEffect(() => {
  async function fetchData() {
    try {
      // 1️⃣ ابتدا content
      const contentRes = await fetch(`/api/contents/${contentId}`).then(res => res.json());
      if (!contentRes.success) throw new Error(contentRes.message);
      const data: ContentFormData = contentRes.data;

      setTitle(data.title);
      setBody(data.body);
      setSection(data.section || "");
      setImageUrl(data.imageUrl || "");
      setOrder(data.order || 0);
      setCountryId(data.countryId || "");

      setSelectedVisaId(
        Array.isArray(data.visaTypeIds) && data.visaTypeIds.length > 0
          ? data.visaTypeIds[0]
          : ""
      );

      // 2️⃣ countries
      const countriesRes = await fetch("/api/countries").then(res => res.json());
      setCountries(Array.isArray(countriesRes.data) ? countriesRes.data : []);

      // 3️⃣ visa-types بر اساس countryId
      if (data.countryId) {
        const visaRes = await fetch(`/api/visa-types?country=${data.countryId}`).then(res => res.json());
        console.log("visaRes (برای تست):", visaRes); // 👈 تست دیتا
        setVisaTypes(Array.isArray(visaRes.data) ? visaRes.data : []);
      }
    } catch (err: any) {
      toast.error(err.message || "خطا در دریافت داده‌ها");
    } finally {
      setLoading(false);
    }
  }

  fetchData();
}, [contentId]);


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setSaving(true);

  try {
    const res = await fetch(`/api/contents/${contentId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        body,
        section: section || null,
        imageUrl,
        order,
        countryId,
        visaTypeIds: selectedVisaId ? [selectedVisaId] : [], // ✅ ارسال به صورت آرایه
      }),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("محتوا با موفقیت آپدیت شد!");
      router.push("/dashboard/contents");
    } else {
      toast.error(data.message || "خطا در آپدیت محتوا");
    }
  } catch {
    toast.error("خطا در ارتباط با سرور");
  } finally {
    setSaving(false);
  }
};

if (loading) return <p>در حال بارگذاری...</p>;

return (
  <div className="p-4 max-w-2xl mx-auto">
    <h2 className="text-xl font-bold mb-6">ویرایش محتوا</h2>

    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-medium">عنوان متن</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={inputClass}
          required
        />
      </div>

      

      <div className="relative">
                <label className="block font-medium mb-1">متن</label>
                {/* <textarea value={body} onChange={(e) => setBody(e.target.value)} className={`${inputClass} min-h-[120px]`} maxLength={2000} required /> */}
                <Editor value={body} onChange={setBody} />
                <span className="absolute bottom-1 left-2 text-gray-500 text-sm">{body.length}/2000</span>
              </div>

      <div>
        <label className="block font-medium">بخش</label>
        <select
          value={section}
          onChange={(e) => setSection(e.target.value as ContentSection)}
          className={inputClass}
        >
          <option value="">انتخاب بخش</option>
          {Object.values(ContentSection).map((sec) => (
            <option key={sec} value={sec}>
              {sec}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-medium">نوع ویزا</label>
        <select
          value={selectedVisaId}
          onChange={(e) => setSelectedVisaId(e.target.value)}
          className={inputClass}
          required
        >
          <option value="">انتخاب نوع ویزا</option>
          {Array.isArray(visaTypes) &&
            visaTypes.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name}
              </option>
            ))}
        </select>
      </div>

      <div>
        <label className="block font-medium">کشور</label>
        <select
          value={countryId}
          onChange={(e) => setCountryId(e.target.value)}
          className={inputClass}
          required
        >
          <option value="">انتخاب کشور</option>
          {Array.isArray(countries) &&
            countries.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>

      <div>
        <label className="block font-medium">آدرس تصویر</label>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label className="block font-medium">ترتیب</label>
        <input
          type="number"
          value={order}
          onChange={(e) => setOrder(parseInt(e.target.value))}
          className={inputClass}
        />
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={saving}
          className={`w-full cursor-pointer p-2 mt-4 rounded text-white ${saving ? "bg-gray-400" : "bg-gray-800 hover:bg-gray-900"
            }`}
        >
          {saving ? "در حال ذخیره..." : "بروز رسانی"}
        </button>
        <Link
          href="/dashboard/contents"
          className="bg-gray-800 hover:bg-gray-900 text-center w-full cursor-pointer p-2 mt-4 rounded text-white"
        >
          بازگشت به لیست محتوا
        </Link>
      </div>
    </form>
  </div>
);
}
