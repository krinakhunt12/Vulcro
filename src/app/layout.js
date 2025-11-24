import "./globals.css";
import ConditionalNavbar from "@/components/ConditionalNavbar";
import Providers from '@/components/Providers';

export const metadata = {
  title: "E-Commerce Store",
  description: "Next.js + Tailwind E-commerce layout",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=Poppins:wght@600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-gray-50">
        <Providers>
          <ConditionalNavbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
