'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black text-lime-400 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-6 text-center text-sm">
        &copy; {new Date().getFullYear()} Head2Head. All rights are reserved.
      </div>
    </footer>
  );
}
