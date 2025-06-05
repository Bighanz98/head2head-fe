"use client";

import React from "react";

export default function HowItWorksPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 text-lime-400 space-y-10">
      <h1 className="text-3xl font-bold">How It Works</h1>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">1. Select Teams</h2>
        <p>
          Start by selecting two teams from the dropdown menus. This filters the players
          available for selection in the next step.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">2. Choose Players</h2>
        <p>
          Once you've selected your teams, pick one player from each. You'll then be able
          to compare their stats head-to-head.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">3. Compare</h2>
        <p>
          Click the "Compare" button to see how the two players perform across multiple
          key statistics. The visual bars show who comes out on top.
        </p>
      </section>

      <hr className="border-lime-400 my-10" />

     
    </div>
  );
}
