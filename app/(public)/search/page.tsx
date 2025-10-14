"use client";
import { useState, useEffect } from "react";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // جستجو وقتی query تغییر کرد (debounce ساده)
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setMessage("");
      return;
    }

    const timeout = setTimeout(() => {
      fetchResults(query);
    }, 300); // 300ms تاخیر برای debounce

    return () => clearTimeout(timeout);
  }, [query]);

  const fetchResults = async (q: string) => {
    setIsLoading(true);
    setMessage("");
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();

      if (data.results?.length > 0) {
        setResults(data.results);
      } else {
        setResults([]);
        setMessage("چیزی پیدا نشد");
      }
    } catch (error) {
      console.error(error);
      setMessage("خطا در جستجو");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (item: any) => {
    const newQuery = item.name || item.title;
    setQuery(newQuery);
    fetchResults(newQuery); // دوباره جستجو با همان متن
  };

  return (
    <div className="p-8 max-w-xl mx-auto relative">
      <h1 className="text-2xl font-bold mb-4">🔎 جستجوی پیشرفته</h1>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 w-full rounded"
        placeholder="نام کشور یا نوع ویزا یا ترکیبی..."
      />

      {isLoading && <p className="text-gray-500 mt-2">در حال جستجو...</p>}
      {message && <p className="text-red-500 mt-2">{message}</p>}

      {results.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border mt-1 max-h-64 overflow-auto rounded shadow-lg">
          {results.map((r) => (
            <li
              key={r.id}
              className="p-2 cursor-pointer hover:bg-gray-200 flex items-center gap-2"
              onClick={() => handleSelect(r)}
            >
              {r.type === "country" && <span>🏳️</span>}
              {r.type === "visa" && <span>🎓</span>}
              {r.type === "content" && <span>📄</span>}
              <span>{r.name || r.title}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
