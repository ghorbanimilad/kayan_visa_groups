"use client";

import Breadcrumb from "@/components/Beadcrunmb";
import { AlertCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ImmigrationEvaluationForm() {
      const [formData, setFormData] = useState({
            fullName: "",
            age: "",
            education: "",
            experience: "",
            englishLevel: "",
            country: "",
            email: "",
            phone: "",
      });

      const [loading, setLoading] = useState(false);

      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
      };

      const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            setLoading(true);

            try {
                  const res = await fetch("/api/evaluation", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(formData),
                  });

                  if (res.ok) {
                        toast.success("✅ فرم با موفقیت ارسال شد! کارشناسان ما به‌زودی با شما تماس خواهند گرفت.");
                        setFormData({
                              fullName: "",
                              age: "",
                              education: "",
                              experience: "",
                              englishLevel: "",
                              country: "",
                              email: "",
                              phone: "",
                        });
                  } else if (res.status === 409) {
                        toast.error("⚠️ شما قبلاً فرم ارزیابی را ارسال کرده‌اید!");
                  } else {
                        toast.error("❌ خطایی در ارسال فرم رخ داد. لطفاً دوباره تلاش کنید.");
                  }
            } catch (error) {
                  console.error(error);
                  toast.error("❌ خطایی در اتصال به سرور رخ داد. لطفاً بعداً دوباره تلاش کنید.");
            } finally {
                  setLoading(false);
            }
      };

      return (
            <>
                  <div className="m-4 container mx-auto">
                        <Breadcrumb />
                        <hr className="border-gray-300 my-4" />
                  </div>
                  {/* notice */}
        <div className='border flex items-center gap-2 max-w-6xl mx-4 md:mx-auto p-4 my-6 rounded-xl border-amber-200'>
          <AlertCircle className='text-amber-500/70' />
          <p className="text-xs md:text-sm text-amber-900">توجه: لطفاً اطلاعات خود را به دقت وارد کنید. مطمئن شوید که ایمیل شما معتبر باشد، شماره تماس صحیح وارد شده باشد و تمامی فیلدهای ضروری تکمیل شده باشند.</p>
        </div>
                  <div className="max-w-2xl mx-auto mt-10 p-6">
                        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">فرم ارزیابی مهاجرت با کایان</h1>
                        <form onSubmit={handleSubmit} className="space-y-6">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <input
                                          name="fullName"
                                          type="text"
                                          required
                                          placeholder="نام و نام خانوادگی"
                                          value={formData.fullName}
                                          onChange={handleChange}
                                          className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                                    />
                                    <input
                                          name="age"
                                          type="number"
                                          required
                                          placeholder="سن"
                                          value={formData.age}
                                          onChange={handleChange}
                                          className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                                    />
                                    <select
                                          name="education"
                                          required
                                          value={formData.education}
                                          onChange={handleChange}
                                          className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                                    >
                                          <option value="">مدرک تحصیلی</option>
                                          <option value="highschool">دیپلم</option>
                                          <option value="bachelor">لیسانس</option>
                                          <option value="master">فوق‌لیسانس</option>
                                          <option value="phd">دکترا</option>
                                    </select>
                                    <input
                                          name="experience"
                                          type="number"
                                          required
                                          placeholder="تعداد سال سابقه کار"
                                          value={formData.experience}
                                          onChange={handleChange}
                                          className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                                    />
                                    <select
                                          name="englishLevel"
                                          required
                                          value={formData.englishLevel}
                                          onChange={handleChange}
                                          className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                                    >
                                          <option value="">سطح زبان انگلیسی</option>
                                          <option value="beginner">مبتدی</option>
                                          <option value="intermediate">متوسط</option>
                                          <option value="advanced">پیشرفته</option>
                                    </select>
                                    <input
                                          name="country"
                                          type="text"
                                          placeholder="کشور مورد نظر برای مهاجرت"
                                          value={formData.country}
                                          onChange={handleChange}
                                          className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                                    />
                                    <input
                                          name="phone"
                                          type="tel"
                                          required
                                          placeholder="شماره تلفن"
                                          value={formData.phone}
                                          onChange={handleChange}
                                          maxLength={11}
                                          className="w-full border text-right border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                                    />
                                    <input
                                          name="email"
                                          type="email"
                                          required
                                          placeholder="ایمیل"
                                          value={formData.email}
                                          onChange={handleChange}
                                          className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                                    />

                              </div>
                              <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full text-white py-2 rounded-md transition ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-red-700 hover:bg-red-800"
                                          }`}
                              >
                                    {loading ? "در حال ارسال..." : "ارسال فرم"}
                              </button>
                        </form>
                  </div>
            </>
      );
}
