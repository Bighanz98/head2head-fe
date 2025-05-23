import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Head2Head",
  description: "Compare football players stats easily",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv">
      <body className="flex flex-col min-h-screen bg-neutral-950 text-lime-400">
        <Navbar />
        <main className="flex-grow max-w-7xl mx-auto px-6 lg:px-8 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
