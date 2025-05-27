"use client";

import Link from "next/link";

const navigationLinks = [
  { name: "Home", href: "/" },
  { name: "Compare", href: "/compare" },
  { name: "About us", href: "/about" },
];

export default function Navbar() {
  return (
    <nav className="bg-black text-lime-400 p-4 shadow-md">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="text-2xl font-bold">
          <Link
            href="/"
            className="hover:text-black hover:bg-lime-400 rounded px-3 py-2 transition"
          >
            Head2Head
          </Link>
        </div>

        <div className="flex space-x-6 text-lg font-semibold">
          {navigationLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="hover:text-black hover:bg-lime-400 rounded px-3 py-2 transition"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
