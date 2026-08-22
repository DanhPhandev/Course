"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
type RegisterForm = {
  email: string;
  fullName: string;
  password: string;
  confirmPassword: string;
};
export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register, handleSubmit } = useForm<RegisterForm>();
  const handleRegister = (data: RegisterForm) => {
    toast.success("ok");
    console.log("Registering with data:", data);
  };
  return (
    <main className="min-h-screen bg-linear-to-br from-sky-50 via-white to-cyan-50">
      <section className="flex min-h-screen items-center justify-center px-4 py-10">
        <div className="grid w-full max-w-6xl overflow-hidden rounded-4xl bg-white shadow-2xl shadow-sky-100 lg:grid-cols-2">
          {/* LEFT CONTENT */}
          <div className="hidden bg-linear-to-br from-[#01adef] to-sky-600 p-10 text-white lg:block">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-xl font-black text-[#01adef] shadow-lg">
                C
              </span>
              <span className="text-2xl font-black tracking-tight">
                CodeUET
              </span>
            </Link>

            <div className="mt-20">
              <p className="mb-4 inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-bold backdrop-blur">
                🚀 Nền tảng học lập trình
              </p>

              <h1 className="max-w-md text-4xl font-black leading-tight">
                Tạo tài khoản để bắt đầu học và luyện tập mỗi ngày
              </h1>

              <p className="mt-5 max-w-md text-base leading-7 text-sky-50">
                Tham gia khóa học, luyện bài code, theo dõi tiến độ học tập và
                chuẩn bị cho các cuộc thi lập trình.
              </p>

              <div className="mt-10 grid max-w-md grid-cols-3 gap-4">
                <div className="rounded-2xl bg-white/15 p-4 text-center backdrop-blur">
                  <p className="text-2xl font-black">120+</p>
                  <p className="mt-1 text-xs text-sky-50">Bài học</p>
                </div>

                <div className="rounded-2xl bg-white/15 p-4 text-center backdrop-blur">
                  <p className="text-2xl font-black">1.8k</p>
                  <p className="mt-1 text-xs text-sky-50">Submit</p>
                </div>

                <div className="rounded-2xl bg-white/15 p-4 text-center backdrop-blur">
                  <p className="text-2xl font-black">24</p>
                  <p className="mt-1 text-xs text-sky-50">Contest</p>
                </div>
              </div>
            </div>
          </div>

          {/* REGISTER FORM */}
          <div className="p-6 sm:p-10 lg:p-12">
            <div className="mb-8 lg:hidden">
              <Link href="/" className="inline-flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#01adef] text-lg font-black text-white shadow-lg shadow-sky-200">
                  C
                </span>
                <span className="text-2xl font-black text-slate-900">
                  CodeUET
                </span>
              </Link>
            </div>

            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-[#01adef]">
                Đăng ký tài khoản
              </p>

              <h2 className="mt-3 text-3xl font-black text-slate-900">
                Tạo tài khoản mới
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Nhập thông tin bên dưới để đăng ký tài khoản học tập của bạn.
              </p>
            </div>

            <form
              className="mt-8 space-y-5"
              onSubmit={handleSubmit(handleRegister)}
            >
              {/* Full name */}
              <div>
                <label className="mb-2 block text-sm font-extrabold text-slate-700">
                  Họ và tên
                </label>

                <input
                  {...register("fullName")}
                  type="text"
                  placeholder="Nguyễn Văn A"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                />
              </div>

              {/* Username */}
              {/* <div>
                <label className="mb-2 block text-sm font-extrabold text-slate-700">
                  Tên tài khoản
                </label>

                <input
                  type="text"
                  placeholder="nguyenvana"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                />

                <p className="mt-2 text-xs font-medium text-slate-400">
                  Chỉ dùng chữ thường, số, không dấu và không khoảng trắng.
                </p>
              </div> */}

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-extrabold text-slate-700">
                  Email
                </label>

                <input
                  {...register("email")}
                  type="email"
                  placeholder="username@email.com"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                />
              </div>

              {/* Password */}
              <div>
                <label className="mb-2 block text-sm font-extrabold text-slate-700">
                  Mật khẩu
                </label>

                <div className="relative">
                  <input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    placeholder="Nhập mật khẩu"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 pr-12 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                  >
                    {showPassword ? <Eye /> : <EyeOff />}
                  </button>
                </div>
              </div>

              {/* Confirm password */}
              <div>
                <label className="mb-2 block text-sm font-extrabold text-slate-700">
                  Xác nhận mật khẩu
                </label>

                <div className="relative">
                  <input
                    {...register("confirmPassword")}
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Nhập lại mật khẩu"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 pr-12 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                  >
                    {showConfirmPassword ? <Eye /> : <EyeOff />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-[#01adef] px-5 py-3.5 text-sm font-black text-white shadow-lg shadow-sky-200 transition hover:-translate-y-0.5 hover:bg-sky-500"
              >
                Đăng ký
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-500">
              Đã có tài khoản?{" "}
              <Link
                href="/login"
                className="font-black text-[#01adef] hover:underline"
              >
                Đăng nhập
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
