"use client";

import Image from "next/image";

export default function HomePage() {
  return (
    <section className="text-center">
      <Image
        src="/images/Head2HeadLogo.png"
        alt="Head2Head Logo"
        width={400}
        height={400}
        className="mx-auto mb-6 rounded-xl mix-blend-lighten"
      />
      <h1 className="text-5xl font-extrabold mb-6">Welcome to Head2Head!</h1>
      <p className="text-lg max-w-2xl mx-auto mb-8">
        Compare football players stats easily! Pick two players and see who comes out on top.
      </p>
      <a
        href="/compare"
        className="inline-block bg-lime-400 text-black px-8 py-3 rounded-full font-semibold hover:bg-lime-300 transition"
      >
        Click here to compare!
      </a>
    </section>
  );
}
