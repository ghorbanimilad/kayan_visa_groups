"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import slugify from "slugify";
import Link from "next/link";

type Errors = {
  name?: string;
  phone?: string;
  fatherName?: string;
  code?: string;
  immigrationCase?: string;
};

type User = {
  id: number;
  name: string;
  phone?: string;
  fatherName?: string;
  code?: string;
  immigrationCase?: string;
  status?: string;
  idCardImage?: string;
  profileImage?: string;
};

export default function EditPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.id;

  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [code, setCode] = useState("");
  const [idCardImage, setIdCardImage] = useState<File | null>(null);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [immigrationCase, setImmigrationCase] = useState("");
  const [status, setStatus] = useState("فعال"); // وضعیت کاربر
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // ⚡ دریافت اطلاعات کاربر
  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/users/${userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data.data);
          setName(data.data.name);
          setPhone(data.data.phone || "");
          setFatherName(data.data.fatherName || "");
          setCode(data.data.code || "");
          setImmigrationCase(data.data.immigrationCase || "");
          setStatus(data.data.status || "PENDING");
        } else {
          toast.error(data.message || "خطا در دریافت اطلاعات کاربر");
        }
      } catch (err) {
        console.error(err);
        toast.error("خطای شبکه");
      }
    };

    fetchUser();
  }, [userId]);

  // بستن Dropdown وقتی کاربر بیرون کلیک کرد
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;

    setLoading(true);
    setErrors({});

    const slug = slugify(name, { lower: true, strict: true });

    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("fatherName", fatherName);
    formData.append("code", code);
    formData.append("slug", slug);
    formData.append("immigrationCase", immigrationCase);
    formData.append("status", status); // اضافه کردن وضعیت
    if (idCardImage) formData.append("idCardImage", idCardImage);
    if (profileImage) formData.append("profileImage", profileImage);

    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        body: formData,
      });
      const data = await res.json();

      if (res.ok) {
        toast.success("کاربر با موفقیت بروزرسانی شد");

        
        setUser({
          ...user!,
          name,
          phone,
          fatherName,
          code,
          immigrationCase,
          status,
        });
      } else if (data.error) {
        const fieldErrors: Errors = {};
        for (const key in data.error) {
          fieldErrors[key as keyof Errors] = data.error[key][0];
        }
        setErrors(fieldErrors);
      } else {
        toast.error(data.message || "خطا در بروزرسانی کاربر");
      }
    } catch (err) {
      console.error(err);
      toast.error("خطای شبکه یا سرور رخ داد");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full border border-gray-300 p-2 mt-1 rounded text-right";

  if (!user) return <p>در حال بارگذاری...</p>;

  return (
    <div className="container mx-auto">
      <h1 className="text-lg font-bold tracking-tight">ویرایش کاربر</h1>
      <div className="h-1 border-b border-gray-300 my-4" />
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label>نام کاربر</label>
              <input
                type="text"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
                className={inputClass}
                placeholder="نام کاربر"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label>شماره موبایل</label>
              <input
                type="text"
                value={phone}
                required
                maxLength={11}
                onChange={(e) => setPhone(e.target.value)}
                className={inputClass}
                placeholder="شماره موبایل"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            <div>
              <label>نام پدر</label>
              <input
                type="text"
                value={fatherName}
                required
                onChange={(e) => setFatherName(e.target.value)}
                className={inputClass}
                placeholder="نام پدر"
              />
              {errors.fatherName && (
                <p className="text-red-500 text-sm mt-1">{errors.fatherName}</p>
              )}
            </div>

            <div>
              <label>کد ملی کلاینت</label>
              <input
                type="text"
                value={code}
                required
                onChange={(e) => setCode(e.target.value)}
                className={inputClass}
                placeholder="شماره کلاینت"
              />
              {errors.code && (
                <p className="text-red-500 text-sm mt-1">{errors.code}</p>
              )}
            </div>

            <div>
              <label>تصویر شناسنامه</label>
              <input
                type="file"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setIdCardImage(e.target.files[0]);
                  }
                }}
                className={inputClass}
              />
              {idCardImage && (
                <img
                  src={URL.createObjectURL(idCardImage)}
                  alt="پیش‌نمایش شناسنامه"
                  className="mt-2 w-32 h-32 object-cover rounded border"
                />
              )}
              {user.idCardImage && !idCardImage && (
                <p className="text-sm text-gray-500 mt-1">
                  فعلی: <a href={user.idCardImage} target="_blank">مشاهده</a>
                </p>
              )}
            </div>

            <div>
              <label>تصویر پروفایل</label>
              <input
                type="file"
                onChange={(e) =>
                  setProfileImage(e.target.files ? e.target.files[0] : null)
                }
                className={inputClass}
              />
              {user.profileImage && !profileImage && (
                <p className="text-sm text-gray-500 mt-1">
                  فعلی: <a href={user.profileImage} target="_blank">مشاهده</a>
                </p>
              )}
            </div>

            {/* Dropdown وضعیت */}
            <div ref={dropdownRef}>
              <label>وضعیت کاربر</label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className={`w-full text-right px-3 py-2 rounded mt-1 border border-gray-300 transition-colors duration-200 ${
                    status === "فعال"
                      ? "bg-green-100 text-green-700"
                      : status === "غیرفعال"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {status} ▼
                </button>

                {dropdownOpen && (
                  <ul className="absolute right-0 mt-1 w-full bg-white border border-gray-300 rounded shadow-lg z-50">
                    {["ACTIVE", "INACTIVE", "PENDING"].map((s) => (
                      <li
                        key={s}
                        className={`px-3 py-1 cursor-pointer hover:bg-gray-100 ${
                          s === status ? "font-bold" : ""
                        }`}
                        onClick={() => {
                          setStatus(s);
                          setDropdownOpen(false);
                        }}
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

          </div>

          <div className="col-span-2">
            <label>شماره پرونده</label>
            <input
              type="text"
              value={immigrationCase}
              onChange={(e) => setImmigrationCase(e.target.value)}
              className={inputClass}
              required
              placeholder="شماره پرونده"
            />
            {errors.immigrationCase && (
              <p className="text-red-500 text-sm mt-1">{errors.immigrationCase}</p>
            )}
          </div>

          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={loading}
              className={`w-full cursor-pointer p-2 mt-4 rounded hover:bg-gray-900  text-white ${
                loading ? "bg-gray-400" : "bg-gray-800"
              }`}
            >
              {loading ? "در حال ارسال..." : "ذخیره تغییرات"}
            </button>
            <Link href="/dashboard/users" className="bg-gray-800 hover:bg-gray-900 text-center w-full cursor-pointer p-2 mt-4 rounded text-white">
              بازگشت به لیست کاربران
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
