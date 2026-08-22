"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const menuItems = [
  {
    label: "Trang chủ",
    href: "/",
  },
  {
    label: "Luyện tập",
    href: "/practice",
  },
  {
    label: "Cuộc thi",
    href: "/contests",
  },
  {
    label: "Blog",
    href: "/blog",
  },
  {
    label: "Về chúng tôi",
    href: "/about",
  },
  {
    label: "Quản lý",
    href: "/management",
  },
];

export default function Header() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex h-18.5 w-[min(1180px,92%)] items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <span className="grid h-9.5 w-9.5 place-items-center rounded-xl bg-linear-to-br from-[#001c66] to-[#01adef] font-black text-white shadow-[0_10px_25px_rgba(1,173,239,0.25)]">
            C
          </span>
          <span className="text-2xl font-black tracking-tight text-[#001c66]">
            CodeHUBT
          </span>
        </Link>

        {/* Menu desktop */}
        <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-xl px-3 py-2 text-[15px] font-bold transition ${
                isActive(item.href)
                  ? "bg-[#eef8ff] text-[#001c66]"
                  : "text-slate-700 hover:bg-[#eef8ff] hover:text-[#001c66]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Actions desktop */}
        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <Link
            href="/login"
            className="inline-flex h-11 items-center justify-center rounded-xl border border-[#01adef] px-5 font-extrabold text-[#001c66] transition hover:bg-[#eef8ff]"
          >
            Đăng nhập
          </Link>

          <Link
            href="/register"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-[#01adef] px-5 font-extrabold text-white shadow-[0_8px_18px_rgba(1,173,239,0.24)] transition hover:bg-[#001c66]"
          >
            Đăng ký
          </Link>
        </div>

        {/* Mobile button */}
        <button
          type="button"
          onClick={() => setOpenMenu(true)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#001c66] text-2xl font-bold text-white lg:hidden"
          aria-label="Mở menu"
        >
          ☰
        </button>
      </div>

      {/* Overlay mobile */}
      {openMenu && (
        <button
          type="button"
          onClick={() => setOpenMenu(false)}
          className="fixed inset-0 z-40 bg-slate-900/50 lg:hidden"
          aria-label="Đóng menu"
        />
      )}

      {/* Sidebar mobile */}
      <aside
        className={`fixed right-0 top-0 z-50 h-screen w-72.5 max-w-[85vw] bg-white p-5 shadow-[-12px_0_30px_rgba(15,23,42,0.18)] transition-transform duration-300 lg:hidden ${
          openMenu ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mb-7 flex items-center justify-between">
          <Link
            href="/"
            onClick={() => setOpenMenu(false)}
            className="flex items-center gap-3"
          >
            <span className="grid h-9.5 w-9.5 place-items-center rounded-xl bg-linear-to-br from-[#001c66] to-[#01adef] font-black text-white">
              C
            </span>
            <span className="text-xl font-black text-[#001c66]">CodeHUBT</span>
          </Link>

          <button
            type="button"
            onClick={() => setOpenMenu(false)}
            className="grid h-10 w-10 place-items-center rounded-xl bg-slate-100 text-3xl leading-none text-slate-900"
            aria-label="Đóng menu"
          >
            ×
          </button>
        </div>

        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpenMenu(false)}
              className={`rounded-xl px-4 py-3 font-bold transition ${
                isActive(item.href)
                  ? "bg-[#eef8ff] text-[#001c66]"
                  : "text-slate-700 hover:bg-[#eef8ff] hover:text-[#001c66]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-7 grid gap-3">
          <Link
            href="/login"
            onClick={() => setOpenMenu(false)}
            className="inline-flex h-11 items-center justify-center rounded-xl border border-[#01adef] font-extrabold text-[#001c66]"
          >
            Đăng nhập
          </Link>

          <Link
            href="/register"
            onClick={() => setOpenMenu(false)}
            className="inline-flex h-11 items-center justify-center rounded-xl bg-[#01adef] font-extrabold text-white"
          >
            Đăng ký
          </Link>
        </div>
      </aside>
    </header>
  );
}
