"use client"
import Link from 'next/link';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import slugify from 'slugify'; // ✨ اضافه شد

type Errors = {
      name?: string;
      phone?: string;
      fatherName?: string;
      code?: string;
      immigrationCase?: string;
};


export default function CreatePage() {
      const [name, setName] = useState('');
      const [phone, setPhone] = useState('');
      const [fatherName, setFatherName] = useState('');
      const [code, setCode] = useState('');
      const [idCardImage, setIdCardImage] = useState<File | null>(null);
      const [profileImage, setProfileImage] = useState<File | null>(null);
      const [immigrationCase, setImmigrationCase] = useState('');
      const [loading, setLoading] = useState(false);
      const [errors, setErrors] = useState<Errors>({});

      const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            setLoading(true);
            setErrors({});

            // ✨ ساخت slug از نام کاربر
            const slug = slugify(name, { lower: true, strict: true });

            const formData = new FormData();
            formData.append('name', name);
            formData.append('phone', phone);
            formData.append('fatherName', fatherName);
            formData.append('code', code);
            formData.append('slug', slug); // ✨ اضافه شد
            formData.append('status', 'PENDING');
            formData.append('immigrationCase', immigrationCase);

            if (idCardImage) formData.append('idCardImage', idCardImage);
            if (profileImage) formData.append('profileImage', profileImage);

            try {
                  const res = await fetch('/api/users', {
                        method: 'POST',
                        body: formData,
                  });

                  const data = await res.json();

                  if (res.ok) {
                        toast.success("کاربر با موفقیت ایجاد شد");
                        setName('');
                        setPhone('');
                        setFatherName('');
                        setCode('');
                        setImmigrationCase('');
                        setIdCardImage(null);
                        setProfileImage(null);
                        setErrors({});
                  } else {
                        if (data.error) {
                              const fieldErrors: Errors = {};
                              for (const key in data.error) {
                                    fieldErrors[key as keyof Errors] = data.error[key][0];
                              }
                              setErrors(fieldErrors);
                        } else {
                              toast.error(data.message || "خطا در ایجاد کاربر");
                        }
                  }
            } catch (err) {
                  console.error(err);
                  toast.error('خطای شبکه یا سرور رخ داد');
            } finally {
                  setLoading(false);
            }
      };

      const inputClass = "w-full border border-gray-300 p-2 mt-1 rounded";

      return (
            <div className='container mx-auto'>
                  <h1 className='text-lg font-bold tracking-tight '>فرم ایجاد کاربر جدید</h1>
                  <div className='h-1 border-b border-gray-300 my-4' />
                  <div className='max-w-4xl mx-auto'>
                        <form onSubmit={handleSubmit} className='space-y-4'>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                          <label>نام کاربر</label>
                                          <input type="text"
                                                value={name}
                                                required
                                                onChange={(e) => setName(e.target.value)}
                                                className={inputClass}
                                                placeholder='نام کاربر' />
                                          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                    </div>
                                    <div>
                                          <label>شماره موبایل</label>
                                          <input type="text"
                                                value={phone}
                                                required
                                                maxLength={11}
                                                onChange={(e) => setPhone(e.target.value)}
                                                className={inputClass}
                                                placeholder='شماره موبایل' />
                                          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                                    </div>
                                    <div>
                                          <label>نام پدر</label>
                                          <input type="text"
                                                value={fatherName}
                                                required
                                                onChange={(e) => setFatherName(e.target.value)}
                                                className={inputClass}
                                                placeholder='نام پدر' />
                                          {errors.fatherName && <p className="text-red-500 text-sm mt-1">{errors.fatherName}</p>}
                                    </div>
                                    <div>
                                          <label>کد ملی کلاینت</label>
                                          <input type="text"
                                                value={code}
                                                required
                                                onChange={(e) => setCode(e.target.value)}
                                                className={inputClass}
                                                placeholder='شماره کلاینت' />
                                          {errors.code && <p className="text-red-500 text-sm mt-1">{errors.code}</p>}
                                    </div>

                                    <div>
                                          <label>تصویر شناسنامه</label>
                                          <input type="file"
                                                onChange={(e) => setIdCardImage(e.target.files ? e.target.files[0] : null)}
                                                className={inputClass} />
                                    </div>
                                    <div>
                                          <label>تصویر پروفایل</label>
                                          <input type="file"
                                          required
                                                onChange={(e) => setProfileImage(e.target.files ? e.target.files[0] : null)}
                                                className={inputClass} />
                                    </div>
                              </div>
                              <div className='col-span-2'>
                                    <label>شماره پرونده</label>
                                    <input type="text"
                                          value={immigrationCase}
                                          onChange={(e) => setImmigrationCase(e.target.value)}
                                          className={inputClass}
                                          required
                                          placeholder='شماره پرونده' />
                                    {errors.immigrationCase && <p className="text-red-500 text-sm mt-1">{errors.immigrationCase}</p>}
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
                                    <Link href="/dashboard/users" className="bg-gray-800 hover:bg-gray-900 text-center w-full cursor-pointer p-2 mt-4 rounded text-white">بازگشت به لیست کاربران</Link>
                              </div>
                        </form>
                  </div>
            </div>
      )
}
