import Footer from "./Footer";
import Header from "./Header";

export default function MainLayout({ children }) {
  return (
    <div className="page-wrapper">
      <Header />
      <main className="main-content">{children}</main>
      <Footer />
    </div>
  );
}
