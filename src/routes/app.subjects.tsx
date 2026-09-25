import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Btn, Pill, SectionHead } from "@/components/bits";
import { SUBJECTS, useBridge } from "@/lib/bridge-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/subjects")({
  head: () => ({
    meta: [
      { title: "My Subjects — Bridge" },
      {
        name: "description",
        content:
          "Concept-by-concept view of academic understanding versus demonstrated practical application.",
      },
      { property: "og:title", content: "My Subjects — Bridge" },
      {
        property: "og:description",
        content: "Academic understanding versus demonstrated practical application, per concept.",
      },
    ],
  }),
  component: Subjects,
});

function Subjects() {
  const { concepts } = useBridge();
  const [selected, setSelected] = useState("dbms");
  const subject = SUBJECTS.find((s) => s.id === selected)!;

  return (
    <div className="space-y-10">
      <SectionHead
        label="my subjects"
        title="What you know, and what you've shown"
        sub="Academic understanding and practical application are tracked separately — that split is the whole point."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SUBJECTS.map((s) => (
          <button
            key={s.id}
            onClick={() => setSelected(s.id)}
            className={cn(
              "panel p-5 text-left transition-colors",
              selected === s.id && "border-primary/50 bg-accent/40",
            )}
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-base font-semibold text-ink">{s.name}</h3>
              <Pill tone={s.ready ? "success" : "quiet"}>
                {s.ready ? "Demo ready" : "Not started"}
              </Pill>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{s.blurb}</p>
          </button>
        ))}
      </div>

      {subject.ready ? (
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-ink">DBMS concepts</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {concepts.map((c) => (
              <div key={c.id} className="panel p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base font-semibold text-ink">{c.name}</h3>
                  <span
                    className={cn(
                      "mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full",
                      c.practical === "Demonstrated"
                        ? "bg-success"
                        : c.practical === "Needs Practice"
                          ? "bg-warn"
                          : "bg-border",
                    )}
                  />
                </div>
                <dl className="mt-3 space-y-1.5 text-sm">
                  <div className="flex justify-between gap-3">
                    <dt className="text-muted-foreground">Academic understanding</dt>
                    <dd className="font-medium text-foreground">{c.academic}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-muted-foreground">Practical application</dt>
                    <dd>
                      <Pill
                        tone={
                          c.practical === "Demonstrated"
                            ? "success"
                            : c.practical === "Needs Practice"
                              ? "warn"
                              : "quiet"
                        }
                      >
                        {c.practical}
                      </Pill>
                    </dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>

          <div className="panel border-primary/30 bg-accent/40 p-6">
            <h3 className="text-lg font-semibold text-ink">JOIN is the live session</h3>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-foreground/80">
              Strong on paper, never tested on an unfamiliar problem. The session takes you through
              Learn → Apply → Diagnose → Fix → Verify and records the result here.
            </p>
            <Link to="/app/session" className="mt-4 inline-block">
              <Btn>Start the JOIN Bridge Session</Btn>
            </Link>
          </div>
        </section>
      ) : (
        <section className="panel p-6">
          <Pill tone="quiet">Coming soon</Pill>
          <h2 className="mt-3 text-xl font-semibold text-ink">{subject.name} isn't live yet</h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
            The same loop extends here next: a concept check you've already passed, an unfamiliar
            application problem, a named misconception, a targeted fix, then a fresh problem to verify
            the transfer. Only the content changes.
          </p>
          <button
            onClick={() => setSelected("dbms")}
            className="mt-4 text-sm font-medium text-primary underline underline-offset-4"
          >
            See the DBMS demo instead
          </button>
        </section>
      )}
    </div>
  );
}
