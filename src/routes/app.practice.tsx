import { createFileRoute } from "@tanstack/react-router";
import { Btn, Pill, SectionHead } from "@/components/bits";

export const Route = createFileRoute("/app/practice")({
  head: () => ({
    meta: [
      { title: "Practice — Bridge" },
      {
        name: "description",
        content: "Focused SQL practice sets on JOIN, NULL handling, GROUP BY and subqueries.",
      },
      { property: "og:title", content: "Practice — Bridge" },
      {
        property: "og:description",
        content: "Short, targeted SQL repetitions on the concepts your sessions flagged.",
      },
    ],
  }),
  component: Practice,
});

const items = [
  {
    t: "JOIN: keeping the rows that don't match",
    d: "Six queries where the wrong join quietly loses data.",
    diff: "Intermediate",
    time: "12 min",
  },
  {
    t: "NULL handling without surprises",
    d: "Why = NULL never works, and what IS NULL does instead.",
    diff: "Beginner",
    time: "8 min",
  },
  {
    t: "GROUP BY vs HAVING",
    d: "Filtering before aggregation and after it, on the same dataset.",
    diff: "Intermediate",
    time: "15 min",
  },
  {
    t: "Subqueries you can read back",
    d: "Rewriting nested queries so the intent is still visible.",
    diff: "Advanced",
    time: "18 min",
  },
];

function Practice() {
  return (
    <div className="space-y-8">
      <SectionHead
        label="practice"
        title="Practice"
        sub="Short repetitions, tied to the concepts your sessions surfaced. Other subjects populate once a session runs there."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((i) => (
          <div key={i.t} className="panel flex flex-col p-5">
            <h3 className="text-base font-semibold text-ink">{i.t}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{i.d}</p>
            <div className="mt-4 flex items-center justify-between gap-3">
              <span className="flex gap-2">
                <Pill tone="quiet">{i.diff}</Pill>
                <Pill tone="quiet">{i.time}</Pill>
              </span>
              <Btn variant="outline">Open</Btn>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
