import { Toaster } from "react-hot-toast";
import "./globals.css";
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={"min-h-full flex flex-col"}>
      <body>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
