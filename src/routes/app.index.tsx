import { createFileRoute, Link } from "@tanstack/react-router";
import { Btn, Pill, SectionHead } from "@/components/bits";
import { SUBJECTS, useBridge } from "@/lib/bridge-store";

export const Route = createFileRoute("/app/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Bridge" },
      {
        name: "description",
        content: "Your subjects, gaps, evidence and recommended next Bridge session.",
      },
      { property: "og:title", content: "Dashboard — Bridge" },
      {
        property: "og:description",
        content: "Your subjects, gaps, evidence and recommended next Bridge session.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { profile, concepts, evidence, sessions } = useBridge();
  const gaps = concepts.filter((c) => c.practical !== "Demonstrated");

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-ink">Hi {profile.name}.</h1>
          <p className="mt-2 text-[15px] text-muted-foreground">
            Let's turn one thing you know into something you can show.
          </p>
        </div>
        <Link to="/app/session">
          <Btn>Start a Bridge Session</Btn>
        </Link>
      </div>

      <section>
        <SectionHead label="your subjects" title="Subjects" />
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SUBJECTS.map((s) => (
            <div key={s.id} className="panel p-5">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-base font-semibold text-ink">{s.name}</h3>
                <Pill tone={s.ready ? "success" : "quiet"}>
                  {s.ready ? "Demo ready" : "Not started"}
                </Pill>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{s.blurb}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHead label="today" title="Today, in DBMS" />
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="panel p-5">
            <h3 className="text-base font-semibold text-ink">My gaps</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {gaps.length === 0 && (
                <li className="text-muted-foreground">No open gaps in DBMS. Nice.</li>
              )}
              {gaps.map((c) => (
                <li key={c.id} className="flex items-center justify-between gap-3">
                  <span className="text-foreground">{c.name}</span>
                  <Pill tone={c.practical === "Not assessed" ? "quiet" : "warn"}>
                    {c.practical}
                  </Pill>
                </li>
              ))}
            </ul>
          </div>

          <div className="panel border-primary/30 bg-accent/40 p-5">
            <h3 className="text-base font-semibold text-ink">Recommended next</h3>
            <p className="mt-2 text-sm leading-relaxed text-foreground/80">
              You answered the JOIN concept question correctly, but JOIN has never been tested on an
              unseen problem. Start there.
            </p>
            <Link to="/app/session" className="mt-4 inline-block">
              <Btn>Run the JOIN session</Btn>
            </Link>
          </div>

          <div className="panel p-5">
            <h3 className="text-base font-semibold text-ink">
              Evidence collected
              <span className="ml-2 font-mono text-sm text-primary">{evidence.length}</span>
            </h3>
            {evidence.length === 0 ? (
              <p className="mt-2 text-sm text-muted-foreground">
                Nothing yet. Evidence appears when a session ends in a verified transfer.
              </p>
            ) : (
              <ul className="mt-3 space-y-2 text-sm">
                {evidence.map((e) => (
                  <li key={e.concept} className="flex items-center justify-between gap-3">
                    <span className="text-foreground">{e.concept}</span>
                    <Pill tone="success">Demonstrated</Pill>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="panel p-5">
            <h3 className="text-base font-semibold text-ink">Practice &amp; resources</h3>
            <div className="mt-3 flex gap-6 font-mono text-sm text-muted-foreground">
              <span>
                <span className="text-2xl text-ink">4</span> practice sets
              </span>
              <span>
                <span className="text-2xl text-ink">6</span> resources
              </span>
            </div>
            <div className="mt-4 flex gap-2">
              <Link to="/app/practice">
                <Btn variant="outline">Practice</Btn>
              </Link>
              <Link to="/app/resources">
                <Btn variant="ghost">Resources</Btn>
              </Link>
            </div>
          </div>

          <div className="panel p-5 md:col-span-2">
            <h3 className="text-base font-semibold text-ink">Recent Bridge sessions</h3>
            {sessions.length === 0 ? (
              <p className="mt-2 text-sm text-muted-foreground">
                No sessions completed in this demo yet.
              </p>
            ) : (
              <ul className="mt-3 space-y-2 text-sm">
                {sessions.map((s) => (
                  <li
                    key={s.concept}
                    className="flex flex-wrap items-center justify-between gap-2 border-t border-border pt-2 first:border-0 first:pt-0"
                  >
                    <span className="text-foreground">DBMS · {s.concept}</span>
                    <span className="flex items-center gap-3">
                      <span className="font-mono text-xs text-muted-foreground">{s.at}</span>
                      <Pill tone="success">{s.result}</Pill>
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
