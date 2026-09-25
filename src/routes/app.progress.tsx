import { createFileRoute, Link } from "@tanstack/react-router";
import { Btn, Pill, SectionHead } from "@/components/bits";
import { useBridge } from "@/lib/bridge-store";

export const Route = createFileRoute("/app/progress")({
  head: () => ({
    meta: [
      { title: "Progress — Bridge" },
      {
        name: "description",
        content: "Evidence, not guesses: the concepts you've demonstrated in completed sessions.",
      },
      { property: "og:title", content: "Progress — Bridge" },
      {
        property: "og:description",
        content: "A log of concepts actually demonstrated through completed Bridge sessions.",
      },
    ],
  }),
  component: Progress,
});

function Progress() {
  const { evidence, concepts } = useBridge();
  const demonstrated = concepts.filter((c) => c.practical === "Demonstrated").length;

  return (
    <div className="space-y-8">
      <SectionHead
        label="progress"
        title="Evidence, not guesses."
        sub="No streaks, no percentage bars. Only things you did on an unseen problem."
      />

      <div className="panel flex flex-wrap items-center gap-8 p-6">
        <div>
          <p className="rule-label">concepts demonstrated</p>
          <p className="font-display text-4xl font-semibold text-ink">
            {demonstrated}
            <span className="text-lg text-muted-foreground">/{concepts.length}</span>
          </p>
        </div>
        <div>
          <p className="rule-label">subject</p>
          <p className="font-display text-4xl font-semibold text-ink">DBMS</p>
        </div>
      </div>

      {evidence.length === 0 ? (
        <div className="panel p-6">
          <h3 className="text-lg font-semibold text-ink">Nothing demonstrated yet</h3>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
            This log fills in only when a session ends with a verified transfer on a problem you
            hadn't seen before.
          </p>
          <Link to="/app/session" className="mt-4 inline-block">
            <Btn>Run the JOIN session</Btn>
          </Link>
        </div>
      ) : (
        <div className="panel divide-y divide-border">
          {evidence.map((e) => (
            <div key={e.concept} className="px-5 py-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-base font-semibold text-ink">
                  {e.subject} · {e.concept}
                </h3>
                <span className="flex items-center gap-3">
                  <span className="font-mono text-xs text-muted-foreground">{e.at}</span>
                  <Pill tone="success">Demonstrated</Pill>
                </span>
              </div>
              <p className="mt-1.5 text-sm text-muted-foreground">{e.note}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
