"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ArrowBigLeft, ChevronLeft } from "lucide-react";

type User = {
      id: number;
      name: string;
      fatherName?: string;
      phone?: string;
      code?: string;
      status?: string;
      profileImage?: string;
      idCardImage?: string;
      immigrationCase?: string;
};

export default function UserDetailPage() {
      const params = useParams();
      const router = useRouter();
      const userId = Number(params.id);
      const [isOpen, setIsOpen] = useState(false);

      const [user, setUser] = useState<User | null>(null);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
            async function fetchUser() {
                  try {
                        const res = await fetch(`/api/users/${userId}`);
                        const data = await res.json();
                        if (res.ok) {
                              setUser(data.data);
                        } else {
                              toast.error(data.message || "خطا در دریافت اطلاعات کاربر");
                        }
                  } catch (err) {
                        console.error(err);
                        toast.error("خطای شبکه");
                  } finally {
                        setLoading(false);
                  }
            }

            fetchUser();
      }, [userId]);

      if (loading) return <p>در حال بارگذاری...</p>;
      if (!user) return <p>کاربر یافت نشد</p>;

      return (
            <div className="container mx-auto mt-8">
                  <h1 className="text-2xl font-bold mb-4">{user.name}</h1>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <p className="text-green-600"><strong className="text-black">نام پدر:</strong> {user.fatherName || "-"}</p>
                        <p className="text-green-600"><strong className="text-black">شماره موبایل:</strong> {user.phone || "-"}</p>
                        <p className="text-green-600"><strong className="text-black">کد ملی کلاینت:</strong> {user.code || "-"}</p>
                        <p className="text-green-600"><strong className="text-black">وضعیت:</strong> {user.status || "-"}</p>
                        <p className="text-green-600"><strong className="text-black">شماره پرونده:</strong> {user.immigrationCase || "-"}</p>
                        <div>
                              <strong>تصویر پروفایل:</strong>
                              {user.profileImage ? (
                                    <img src={user.profileImage} className="w-32 h-32 object-cover rounded mt-2" />
                              ) : (
                                    <p>-</p>
                              )}
                        </div>
                        {/* <div className="border-b border-gray-300 h-1 flex items-center" /> */}
                        <div>
                              <div>
                                    <strong>تصویر شناسنامه:</strong>
                                    {user.idCardImage ? (
                                          <>
                                                <img
                                                      src={user.idCardImage}
                                                      className="w-48 h-48 object-cover rounded mt-2 cursor-pointer"
                                                      onClick={() => setIsOpen(true)}
                                                />

                                                {isOpen && (
                                                      <div
                                                            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
                                                      >
                                                            <div className="relative">
                                                                  <img
                                                                        src={user.idCardImage}
                                                                        className="max-w-[90vw] max-h-[90vh] rounded shadow-lg"
                                                                  />
                                                                  {/* دکمه کلوز */}
                                                                  <button
                                                                        onClick={() => setIsOpen(false)}
                                                                        className="absolute top-2 right-2 text-white bg-red-600 px-3 py-1 rounded hover:bg-red-700"
                                                                  >
                                                                        ×
                                                                  </button>
                                                            </div>
                                                      </div>
                                                )}
                                          </>
                                    ) : (
                                          <p>-</p>
                                    )}
                              </div>
                        </div>
                  </div>
                  <button
                        onClick={() => router.back()}
                        className="mt-4 flex items-center px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
                  >
                        بازگشت
                        <ArrowBigLeft className="mr-2" />
                  </button>
            </div>
      );
}
