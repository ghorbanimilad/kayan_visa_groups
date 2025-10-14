"use client";

import { useState, useEffect } from "react";
import { ContentSection } from "@prisma/client";
import toast from "react-hot-toast";
import Link from "next/link";
import Editor from "@/components/dashboard/Ckeditor";


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
  countries: { id: string; name: string }[];
  visaTypes: { id: string; name: string }[];
  initialData?: Partial<ContentFormData>;
};

export default function ContentForm({ initialData }: Props) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [body, setBody] = useState(initialData?.body || "");
  const [section, setSection] = useState<ContentSection | "">(initialData?.section || "");
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || "");
  const [order, setOrder] = useState(initialData?.order || 0);
  const [countryId, setCountryId] = useState(initialData?.countryId || "");
  const [selectedVisaIds, setSelectedVisaIds] = useState<string[]>(initialData?.visaTypeIds || []);
  const [countries, setCountries] = useState<{ id: string; name: string }[]>([]);
  const [visaTypes, setVisaTypes] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // همیشه کشورها رو بگیر
        const countriesRes = await fetch("/api/countries").then((res) => res.json());
        setCountries(Array.isArray(countriesRes.data) ? countriesRes.data : countriesRes);

        // اگر کشور انتخاب شده بود، ویزاها رو بگیر
        if (countryId) {
          const visaRes = await fetch(`/api/visa-types?country=${countryId}`).then((res) => res.json());
          setVisaTypes(Array.isArray(visaRes.data) ? visaRes.data : visaRes);
        } else {
          setVisaTypes([]); // هنوز کشور انتخاب نشده
        }
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, [countryId]); // 👈 وقتی کشور تغییر کرد، دوباره اجرا میشه


  const handleVisaChange = (id: string) => {
    setSelectedVisaIds((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/contents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          body,
          section: section || null,
          imageUrl,
          order,
          countryId,
          visaTypeIds: selectedVisaIds,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("محتوا با موفقیت ذخیره شد!");
        // ریست فرم
        setTitle("");
        setBody("");
        setSection("");
        setImageUrl("");
        setOrder(0);
        setCountryId("");
        setSelectedVisaIds([]);
      } else {
        toast.error(data.message || "خطا در ذخیره محتوا");
      }
    } catch (err) {
      toast.error("خطا در ارتباط با سرور");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full border border-gray-300 p-2 mt-1 rounded";

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-6">فرم محتویات صفحه اصلی</h2>

      {message && (
        <div className={`mb-4 p-2 rounded ${message.type === "success" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">عنوان متن</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
            className={inputClass} required />
        </div>

        <div className="relative">
          <label className="block font-medium mb-1">متن</label>
          {/* <textarea value={body} onChange={(e) => setBody(e.target.value)} className={`${inputClass} min-h-[120px]`} maxLength={2000} required /> */}
          <Editor value={body} onChange={setBody} />
          <span className="absolute bottom-1 left-2 text-gray-500 text-sm">{body.length}/2000</span>
        </div>


        <div>
          <label className="block font-medium">بخش</label>
          <select value={section} onChange={(e) => setSection(e.target.value as ContentSection)} className={inputClass}>
            <option value="">انتخاب بخش</option>
            {Object.values(ContentSection).map((sec) => <option key={sec} value={sec}>{sec}</option>)}
          </select>
        </div>

        <div>
          <label className="block font-medium">کشور</label>
          <select value={countryId} onChange={(e) => setCountryId(e.target.value)} className={inputClass} required>
            <option value="">انتخاب کشور</option>
            {countries.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>

        <div>
          <label className="block font-medium">نوع ویزا</label>
          <select value={selectedVisaIds[0] || ""} onChange={(e) => setSelectedVisaIds([e.target.value])} className={inputClass} required>
            <option value="">انتخاب نوع ویزا</option>
            {visaTypes.map((v) => <option key={v.id} value={v.id}>{v.name}</option>)}
          </select>
        </div>



        <div>
          <label className="block font-medium">آدرس تصویر</label>
          <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className={inputClass} />
        </div>

        <div>
          <label className="block font-medium">ترتیب</label>
          <input type="number" value={order} onChange={(e) => setOrder(parseInt(e.target.value))} className={inputClass} />
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={loading}
            className={`w-full cursor-pointer p-2 mt-4 rounded hover:bg-gray-900  text-white ${loading ? "bg-gray-400" : "bg-gray-800"
              }`}
          >
            {loading ? "در حال ذخیره..." : "ذخیره"}
          </button>
          <Link href="/dashboard/contents" className="bg-gray-800 hover:bg-gray-900 text-center w-full cursor-pointer p-2 mt-4 rounded text-white">بازگشت به لیست کاربران</Link>
        </div>
      </form>
    </div>
  );
}
