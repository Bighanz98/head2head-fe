"use client";

import React from "react";
import Link from "next/link";

export default function AboutThisProjectPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 text-lime-400 space-y-10">
      <h1 className="text-3xl font-bold">About This Project</h1>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">📌 Purpose</h2>
        <p>
          This project was developed as part of my final exam during the Software Developer
          program. The aim was to create a web application where users can compare football players
          based on performance statistics in a visual and engaging way.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">🛠️ Built With</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Frontend: Next.js (React, TypeScript, Tailwind CSS)</li>
          <li>Backend: ASP.NET Core Web API (C#)</li>
          <li>Database: SQL Server</li>
          <li>Version Control: Git + GitHub</li>
          <li>Project Management: Trello (Kanban)</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">📈 Features</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Select teams and compare players</li>
          <li>Stat-based scoring system</li>
          <li>Animated comparison bars and confetti on winner</li>
          <li>Responsive and modern UI</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">👨‍💻 About Me</h2>
        <p>
          I'm currently studying to become a software developer and created this exam project during my
          internship at Consid. I enjoy building full-stack applications and working in agile teams.
        </p>
      </section>

      <hr className="border-lime-400 my-10" />

      <div className="text-center">
        <Link href="/">
          <button className="mt-4 px-6 py-2 bg-lime-400 text-black rounded hover:bg-lime-300 transition">
            ← Go back to homepage
          </button>
        </Link>
      </div>
    </div>
  );
}
