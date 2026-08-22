"use client";

import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { useRouter } from "next/navigation";
import useFetch from "@/app/hooks/useFetch";

type loginForm = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [bodyData, setBodyData] = useState<loginForm | null>(null);
  const { register, handleSubmit } = useForm<loginForm>();
  const { results } = useFetch(
    {
      url: "api/v1/auth/login",
      method: "POST",
      body: bodyData,
    },
    {
      enabled: bodyData !== null,
      onSuccess: (data) => {
        toast.success("Đăng nhập thành công");

        console.log(data);

        router.push("/");
      },

      onError: (error) => {
        toast.error(error.message || "Đăng nhập thất bại");
      },
    },
  );

  const handleLogin = (formData: loginForm) => {
    setBodyData(formData);
  };
  const handleFacebookLogin = () => {
    console.log("Login Facebook");
  };
  // useEffect(() => {
  //   if (!results?.statusCode) return;

  //   console.log(results);

  //   if (results.statusCode < 400) {
  //     toast.success("Đăng nhập thành công");
  //     router.push("/");
  //   } else {
  //     toast.error("Đăng nhập thất bại");
  //   }
  // }, [results, router]);
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(1,173,239,0.22),transparent_28%),linear-gradient(135deg,#f6fcff,#ffffff)] px-4 py-10 flex items-center justify-center">
      <section className="w-full max-w-130 rounded-[28px] border border-slate-200 bg-white p-6 sm:p-8 shadow-[0_24px_60px_rgba(0,28,102,0.14)]">
        {/* Logo */}
        <Link
          href="/"
          className="mb-5 flex items-center justify-center gap-2 text-xl font-black text-[#071f4d]"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#071f4d] text-white shadow-md">
            C
          </span>

          <span>CodeHUBT</span>
        </Link>

        <div>
          <h2 className="mb-6 text-center text-2xl font-black text-slate-900">
            Login
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit(handleLogin)}>
            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-extrabold text-slate-700">
                Tên tài khoản hoặc Email
              </label>

              <input
                className="w-full rounded-xl border border-slate-200 px-4 py-3 pr-12 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                placeholder="username@email.com"
                {...register("email")}
              />
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-extrabold text-slate-700">
                Mật khẩu
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 pr-12 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                  placeholder="Nhập mật khẩu"
                  {...register("password")}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                >
                  {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
            </div>

            {/* Login */}
            <button
              type="submit"
              className="w-full rounded-xl bg-[#01adef] px-5 py-3 font-black text-white shadow-[0_8px_18px_rgba(1,173,239,0.24)] transition hover:bg-[#071f4d]"
            >
              Đăng nhập
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-200"></div>

            <span className="text-sm font-medium text-slate-400">
              Hoặc đăng nhập bằng
            </span>

            <div className="h-px flex-1 bg-slate-200"></div>
          </div>

          {/* Social login */}
          <div className="flex gap-3">
            {/* Google */}
            <a
              href="http://localhost:8081/oauth2/authorization/google"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            >
              <FcGoogle size={22} />
              Google
            </a>

            {/* Facebook */}
            <button
              type="button"
              onClick={handleFacebookLogin}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 font-bold text-slate-700 transition hover:border-blue-400 hover:bg-blue-50"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1877F2] text-white">
                <FaFacebookF size={14} />
              </span>
              Facebook
            </button>
          </div>

          {/* Register */}
          <p className="mt-5 text-center text-sm text-slate-500">
            Chưa có tài khoản?{" "}
            <Link
              href="/register"
              className="font-black text-[#01adef] hover:underline"
            >
              Đăng ký
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
