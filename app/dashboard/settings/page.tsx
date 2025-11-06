"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Eye, EyeOff, User, Mail, Shield } from "lucide-react";

type UserProfile = {
  role: "admin" | "staff";
  username: string;
  email?: string | null;
};

export default function ProfileForm() {
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<"admin" | "staff" | null>(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [saving, setSaving] = useState(false);

  // دریافت اطلاعات کاربر لاگین‌شده
  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch("/api/admin/profile");
        if (!res.ok) throw new Error("خطا در دریافت پروفایل");
        const data: UserProfile = await res.json();
        setUsername(data.username);
        setEmail(data.email || "");
        setRole(data.role);
      } catch (err) {
        toast.error("خطا در دریافت پروفایل");
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  // محاسبه قدرت رمز عبور
  useEffect(() => {
    const calculateStrength = (pwd: string) => {
      let score = 0;
      if (pwd.length >= 8) score += 25;
      if (/[A-Z]/.test(pwd)) score += 15;
      if (/[a-z]/.test(pwd)) score += 15;
      if (/[0-9]/.test(pwd)) score += 20;
      if (/[^A-Za-z0-9]/.test(pwd)) score += 25;
      return Math.min(score, 100);
    };
    setPasswordStrength(calculateStrength(password));
  }, [password]);

  const getPasswordColor = () => {
    if (passwordStrength < 40) return "bg-red-500";
    if (passwordStrength < 70) return "bg-yellow-400";
    return "bg-green-500";
  };

  // ارسال فرم
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      toast.error("رمز عبور و تکرار آن یکسان نیستند!");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/admin/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      if (!res.ok) throw new Error("خطا در بروزرسانی پروفایل");

      toast.success("پروفایل با موفقیت بروزرسانی شد!");
      setPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-center">در حال بارگذاری...</p>;

  return (
    <div className="max-w-lg mx-auto mt-12 bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
      {/* هدر کارت */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-600 p-6 text-center text-white">
        <div className="w-24 h-24 mx-auto mb-3 rounded-full bg-white/20 flex items-center justify-center text-4xl">
          <User className="text-white w-10 h-10" />
        </div>
        <h2 className="text-2xl font-semibold mb-1">{username}</h2>
        <p className="text-sm opacity-80">
          {role?.toLowerCase() === "admin" ? "مدیر سیستم" : "کارمند مجموعه"}
        </p>
      </div>

      {/* فرم تنظیمات */}
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">نام کاربری</label>
          <div className="relative">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 pl-10 focus:ring focus:ring-blue-300"
            />
            <User className="absolute left-3 top-2.5 text-gray-400" />
          </div>
        </div>

        {role && (
          <div>
            <label className="block text-sm font-medium mb-1">ایمیل</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 pl-10 focus:ring focus:ring-blue-300"
                readOnly={role === "staff"} // کارمند نمی‌تواند تغییر دهد
              />
              <Mail className="absolute left-3 top-2.5 text-gray-400" />
            </div>
          </div>
        )}


        {/* رمز عبور جدید */}
        <div>
          <label className="block text-sm font-medium mb-1">رمز عبور جدید</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 pr-10 pl-10 focus:ring focus:ring-blue-300"
              placeholder="در صورت تمایل وارد کنید"
            />
            <Shield className="absolute left-3 top-2.5 text-gray-400" />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2 text-gray-500"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
          {password && (
            <div className="w-full bg-gray-200 h-2 rounded mt-2">
              <div
                className={`h-2 rounded ${getPasswordColor()}`}
                style={{ width: `${passwordStrength}%` }}
              ></div>
            </div>
          )}
        </div>

        {/* تکرار رمز عبور */}
        <div>
          <label className="block text-sm font-medium mb-1">تکرار رمز عبور</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 pr-10 pl-10 focus:ring focus:ring-blue-300"
            />
            <Shield className="absolute left-3 top-2.5 text-gray-400" />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-2 text-gray-500"
            >
              {showConfirmPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-gray-800 text-white py-2.5 rounded-lg hover:bg-gray-700 transition disabled:opacity-50"
        >
          {saving ? "در حال ذخیره..." : "ذخیره تغییرات"}
        </button>
      </form>
    </div>
  );
}
