import Link from "next/link";

const footerLinks = {
  platform: [
    {
      label: "Khóa học",
      href: "/courses",
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
  ],
  support: [
    {
      label: "Về chúng tôi",
      href: "/about",
    },
    {
      label: "Liên hệ",
      href: "/contact",
    },
    {
      label: "Điều khoản sử dụng",
      href: "/terms",
    },
    {
      label: "Chính sách bảo mật",
      href: "/privacy",
    },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-[#081427] text-white">
      <div className="mx-auto w-[min(1180px,92%)] py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Link href="/" className="mb-5 flex items-center gap-3">
              <span className="grid h-10.5 w-10.5 place-items-center rounded-xl bg-linear-to-br from-[#001c66] to-[#01adef] font-black text-white shadow-[0_10px_25px_rgba(1,173,239,0.25)]">
                C
              </span>
              <span className="text-2xl font-black tracking-tight">
                CodeHUBT
              </span>
            </Link>

            <p className="max-w-sm text-sm leading-7 text-slate-300">
              Nền tảng học lập trình, luyện bài tập, tham gia contest và theo
              dõi tiến độ học tập dành cho sinh viên.
            </p>

            <div className="mt-6 flex gap-3">
              <a
                href="#"
                className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-sm font-black transition hover:bg-[#01adef]"
                aria-label="Facebook"
              >
                f
              </a>
              <a
                href="#"
                className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-sm font-black transition hover:bg-[#01adef]"
                aria-label="Youtube"
              >
                Y
              </a>
              <a
                href="#"
                className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-sm font-black transition hover:bg-[#01adef]"
                aria-label="Github"
              >
                G
              </a>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="mb-5 text-lg font-black">Nền tảng</h3>
            <ul className="space-y-3">
              {footerLinks.platform.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-300 transition hover:text-[#01adef]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-5 text-lg font-black">Hỗ trợ</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-300 transition hover:text-[#01adef]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-lg font-black">Liên hệ</h3>

            <div className="space-y-4 text-sm text-slate-300">
              <p className="leading-6">
                <span className="font-bold text-white">Địa chỉ:</span>
                <br />
                Trường Đại học Kinh doanh và Công nghệ Hà Nội
              </p>

              <p>
                <span className="font-bold text-white">Email:</span>
                <br />
                support@codehubt.edu.vn
              </p>

              <p>
                <span className="font-bold text-white">Hotline:</span>
                <br />
                0123 456 789
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>© 2026 CodeHUBT. All rights reserved.</p>

          <div className="flex flex-wrap gap-4">
            <Link href="/terms" className="transition hover:text-[#01adef]">
              Điều khoản
            </Link>
            <Link href="/privacy" className="transition hover:text-[#01adef]">
              Bảo mật
            </Link>
            <Link href="/contact" className="transition hover:text-[#01adef]">
              Liên hệ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
