import { createFileRoute } from "@tanstack/react-router";
import { Pill, SectionHead } from "@/components/bits";

export const Route = createFileRoute("/app/resources")({
  head: () => ({
    meta: [
      { title: "Resources — Bridge" },
      {
        name: "description",
        content: "A short, labelled reading list for SQL and database concepts.",
      },
      { property: "og:title", content: "Resources — Bridge" },
      {
        property: "og:description",
        content: "A short, labelled reading list instead of another pile of tabs.",
      },
    ],
  }),
  component: Resources,
});

const resources = [
  { t: "PostgreSQL: JOIN types, plainly", subject: "DBMS", type: "Docs", url: "https://www.postgresql.org/docs/current/queries-table-expressions.html" },
  { t: "Use The Index, Luke — SQL indexing", subject: "DBMS", type: "Guide", url: "https://use-the-index-luke.com/" },
  { t: "SQL NULL semantics explained", subject: "DBMS", type: "Article", url: "https://modern-sql.com/concept/null" },
  { t: "SQLBolt interactive lessons", subject: "DBMS", type: "Practice", url: "https://sqlbolt.com/" },
  { t: "Python for data wrangling", subject: "Python", type: "Course", url: "https://docs.python.org/3/tutorial/" },
  { t: "Seeing Theory — statistics visualised", subject: "Statistics", type: "Interactive", url: "https://seeing-theory.brown.edu/" },
];

function Resources() {
  return (
    <div className="space-y-8">
      <SectionHead
        label="resources"
        title="Resources"
        sub="Few enough that you'll actually open them."
      />
      <div className="panel divide-y divide-border">
        {resources.map((r) => (
          <a
            key={r.t}
            href={r.url}
            target="_blank"
            rel="noreferrer"
            className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 transition-colors hover:bg-secondary/60"
          >
            <span className="text-sm font-medium text-foreground">{r.t}</span>
            <span className="flex gap-2">
              <Pill tone="accent">{r.subject}</Pill>
              <Pill tone="quiet">{r.type}</Pill>
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
