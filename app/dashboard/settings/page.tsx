"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

type AdminProfile = {
  username: string;
  email?: string | null;
};

export default function AdminProfileForm() {
  //  const [admin, setAdmin] = useState<AdminProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [saving, setSaving] = useState(false);

  // بررسی لاگین ادمین



  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch("/api/admin/profile");
        const data: AdminProfile = await res.json();
        setUsername(data.username);
        setEmail(data.email || "");
      } catch (err) {
        toast.error("خطا در دریافت پروفایل");
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  useEffect(() => {
    const calculateStrength = (pwd: string) => {
      let score = 0;
      if (pwd.length >= 8) score += 25;
      if (/[A-Z]/.test(pwd)) score += 15;
      if (/[a-z]/.test(pwd)) score += 15;
      if (/[0-9]/.test(pwd)) score += 20;
      if (/[^A-Za-z0-9]/.test(pwd)) score += 25;
      if (score > 100) score = 100;
      return score;
    };
    setPasswordStrength(calculateStrength(password));
  }, [password]);

  const getPasswordColor = () => {
    if (passwordStrength < 40) return "bg-red-500";
    if (passwordStrength < 70) return "bg-yellow-400";
    return "bg-green-500";
  };

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

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "خطا در بروزرسانی پروفایل");
      }

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
    // if (!admin) return <p className="text-center mt-10 text-red-600">شما وارد نشده‌اید یا دسترسی ندارید.</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-8 text-center">ویرایش پروفایل ادمین</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">نام کاربری</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">ایمیل</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        {/* رمز عبور */}
        <div className="relative">
          <label className="block font-medium">رمز عبور جدید</label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded "
            placeholder="اگر می‌خواهید تغییر دهید"
          />
          <button
            type="button"
            className="absolute top-1/2 left-2 transform -translate-y-1/2 text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>

          <div className="h-2 w-full bg-gray-200 rounded mt-1">
            <div
              className={`${getPasswordColor()} h-2 rounded`}
              style={{ width: `${passwordStrength}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            قدرت رمز: {passwordStrength}%
          </p>
        </div>

        {/* تکرار رمز عبور */}
        <div className="relative">
          <label className="block font-medium">تکرار رمز عبور</label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded "
            placeholder="رمز عبور را دوباره وارد کنید"
          />
          <button
            type="button"
            className="absolute top-1/2 left-2 transform  text-gray-500"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <button
          type="submit"
          disabled={saving}
          className={`w-full bg-gray-800 text-white p-2 rounded hover:bg-gray-900 ${
            saving ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {saving ? "در حال ذخیره..." : "بروزرسانی پروفایل"}
        </button>
      </form>
    </div>
  );
}
