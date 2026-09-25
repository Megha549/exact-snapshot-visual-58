import { createFileRoute } from "@tanstack/react-router";
import { Pill, SectionHead } from "@/components/bits";
import { useBridge } from "@/lib/bridge-store";

export const Route = createFileRoute("/app/build")({
  head: () => ({
    meta: [
      { title: "Build — Bridge" },
      {
        name: "description",
        content: "Small project ideas built only from the database concepts you've demonstrated.",
      },
      { property: "og:title", content: "Build — Bridge" },
      {
        property: "og:description",
        content: "Project ideas tied to demonstrated concepts, with time estimates.",
      },
    ],
  }),
  component: Build,
});

const projects = [
  {
    t: "Library Fine Tracker",
    level: "Beginner",
    time: "4–6 hours",
    concepts: ["SELECT & Filtering", "JOIN"],
    d: "Members, loans and overdue fines. Every member appears, even the ones who never borrowed.",
  },
  {
    t: "Customer Churn Mini-Dashboard",
    level: "Intermediate",
    time: "1–2 days",
    concepts: ["JOIN", "GROUP BY / HAVING", "NULL Handling"],
    d: "Group orders by customer and read the silence — the customers with nothing in the last 90 days.",
  },
  {
    t: "Event Attendance Analytics",
    level: "Advanced",
    time: "3–4 days",
    concepts: ["Subqueries", "JOIN", "GROUP BY / HAVING"],
    d: "Registrations versus turnout across events, including events nobody showed up for.",
  },
];

function Build() {
  const { concepts } = useBridge();
  const demonstrated = concepts.filter((c) => c.practical === "Demonstrated").map((c) => c.name);

  return (
    <div className="space-y-8">
      <SectionHead
        label="build"
        title="Projects"
        sub="Ideas sized to what you've actually demonstrated — concepts you've proven are highlighted."
      />
      <div className="grid gap-4">
        {projects.map((p) => (
          <div key={p.t} className="panel p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <h3 className="text-base font-semibold text-ink">{p.t}</h3>
              <span className="flex gap-2">
                <Pill tone="accent">DBMS</Pill>
                <Pill tone="quiet">{p.level}</Pill>
                <Pill tone="quiet">{p.time}</Pill>
              </span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.d}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.concepts.map((c) => (
                <Pill key={c} tone={demonstrated.includes(c) ? "success" : "quiet"}>
                  {c}
                </Pill>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
