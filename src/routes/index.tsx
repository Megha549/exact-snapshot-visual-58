import { createFileRoute, Link } from "@tanstack/react-router";
import { Btn, Code, Pill, SectionHead } from "@/components/bits";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bridge — you answered it right. Could you actually use it?" },
      {
        name: "description",
        content:
          "Bridge closes the gap between exam answers and real ability with a Learn, Apply, Diagnose, Fix, Verify loop. SQL and DBMS are live today.",
      },
      {
        property: "og:title",
        content: "Bridge — you answered it right. Could you actually use it?",
      },
      {
        property: "og:description",
        content:
          "A learning loop that diagnoses the misconception behind a wrong query, then verifies you've actually transferred the understanding.",
      },
    ],
  }),
  component: Landing,
});

const problems = [
  {
    can: "Define an INNER JOIN and list its syntax.",
    cant: "Decide which join keeps the customers who never ordered.",
    tag: "Application gap",
  },
  {
    can: "Score well on an exam written from the syllabus.",
    cant: "Write a query against tables nobody explained to you.",
    tag: "Exam-oriented learning",
  },
  {
    can: "See a red cross next to a wrong answer.",
    cant: "Find out which belief produced that wrong answer.",
    tag: "Unclear feedback",
  },
  {
    can: "Follow a lecture end to end.",
    cant: "Tell whether you understood it or just recognised it.",
    tag: "Learning confusion",
  },
  {
    can: "Collect twelve tutorials, three playlists, one PDF.",
    cant: "Point at one thing you can now do that you couldn't before.",
    tag: "Resource overload",
  },
];

const loop = [
  { n: 1, t: "Learn", d: "Start from the academic question you were graded on." },
  { n: 2, t: "Apply", d: "Meet an unfamiliar, real-world problem on the same concept." },
  { n: 3, t: "Diagnose", d: "Bridge names the misconception behind the mistake." },
  { n: 4, t: "Fix", d: "A targeted explanation plus the counterexample that breaks the belief." },
  { n: 5, t: "Verify", d: "A fresh unseen problem confirms the understanding transferred." },
];

const modules = [
  { t: "Student Profile", d: "Your course, subjects and goals shape what Bridge asks you next." },
  { t: "Learn", d: "Short concept checks that establish what you already hold correctly." },
  { t: "Practice", d: "Focused repetitions on the concepts your sessions flagged as shaky." },
  { t: "Apply", d: "Unseen, real-world problems — the part exams never test." },
  { t: "Build", d: "Small projects that reuse only the concepts you've demonstrated." },
  { t: "Evidence", d: "A record of what you can do, built from completed sessions." },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-20 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-md bg-ink font-mono text-sm text-primary-foreground">
              B
            </span>
            <span className="font-display text-lg font-semibold text-ink">Bridge</span>
          </div>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <a href="#problem" className="hover:text-foreground">
              The gap
            </a>
            <a href="#loop" className="hover:text-foreground">
              How it works
            </a>
            <a href="#modules" className="hover:text-foreground">
              Modules
            </a>
          </nav>
          <Link to="/app">
            <Btn>Get started</Btn>
          </Link>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 lg:grid-cols-[1.05fr_1fr] lg:py-24">
        <div className="diagnose-reveal">
          <Pill tone="accent">SQL / DBMS live today</Pill>
          <h1 className="mt-5 text-4xl font-semibold leading-[1.08] text-ink sm:text-5xl">
            You answered it right.
            <br />
            Could you actually use it?
          </h1>
          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-muted-foreground">
            Most courses test whether you can restate a concept. Bridge tests whether you can reach
            for it in front of a problem nobody prepared you for — and tells you exactly which belief
            got in the way.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/app">
              <Btn className="px-5 py-3">Start with Bridge</Btn>
            </Link>
            <a href="#loop">
              <Btn variant="outline" className="px-5 py-3">
                See how it works
              </Btn>
            </a>
          </div>
        </div>

        <div className="panel p-5 shadow-lift">
          <p className="rule-label mb-3">bridge session · join · step 2</p>
          <Code>{`SELECT c.name, o.amount
FROM customers c
INNER JOIN orders o
  ON c.id = o.customer_id;`}</Code>

          <div className="mt-4 rounded-md border border-warn/40 bg-warn-soft p-4">
            <p className="font-mono text-[11px] uppercase tracking-wider text-warn-foreground/80">
              diagnosis
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-warn-foreground">
              Your query excludes customers with no orders — is that intended? You're treating INNER
              JOIN as "combine the tables" rather than "keep only matching rows".
            </p>
          </div>

          <div className="mt-3 rounded-md border border-success/40 bg-success-soft p-4">
            <p className="font-mono text-[11px] uppercase tracking-wider text-success-foreground/80">
              the fix
            </p>
            <p className="mt-1.5 font-mono text-[13px] text-success-foreground">
              LEFT JOIN orders o ON c.id = o.customer_id
            </p>
            <p className="mt-1.5 text-sm text-success-foreground/90">
              Keeps every customer; unmatched amounts come back as NULL.
            </p>
          </div>
        </div>
      </section>

      <section id="problem" className="border-y border-border bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <SectionHead
            label="the gap"
            title="The distance between a correct answer and a usable skill"
            sub="Nobody is failing here. Students pass, then freeze the first time the problem isn't phrased like the syllabus."
          />
          <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2">
            <div className="bg-secondary/60 px-5 py-3 font-display text-sm font-semibold text-ink">
              What you can answer
            </div>
            <div className="hidden bg-secondary/60 px-5 py-3 font-display text-sm font-semibold text-ink md:block">
              What you can actually do
            </div>
            {problems.map((p) => (
              <div key={p.tag} className="contents">
                <div className="bg-card px-5 py-5">
                  <Pill tone="quiet">{p.tag}</Pill>
                  <p className="mt-3 text-[15px] text-foreground">{p.can}</p>
                </div>
                <div className="bg-card px-5 py-5">
                  <p className="text-[15px] text-muted-foreground md:mt-[34px]">{p.cant}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 font-display text-xl font-semibold text-ink">
            Good grades ≠ practical understanding.
          </p>
        </div>
      </section>

      <section id="loop" className="mx-auto max-w-6xl px-5 py-16">
        <SectionHead
          label="the loop"
          title="How Bridge works"
          sub="Five steps, in order. The session doesn't move on until the understanding actually transfers."
        />
        <ol className="mt-10 grid gap-4 md:grid-cols-5">
          {loop.map((s) => (
            <li key={s.n} className="panel p-5">
              <span className="font-mono text-sm text-primary">{s.n}</span>
              <h3 className="mt-2 text-lg font-semibold text-ink">{s.t}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="modules" className="border-t border-border bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <SectionHead label="inside bridge" title="The modules that carry the loop" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {modules.map((m) => (
              <div key={m.t} className="panel p-5">
                <h3 className="text-base font-semibold text-ink">{m.t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{m.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="rounded-xl border border-border bg-ink p-10 text-center">
          <h2 className="text-2xl font-semibold text-primary-foreground sm:text-3xl">
            SQL/DBMS is live today — more subjects extend the same loop.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[15px] text-primary-foreground/70">
            Start with the JOIN session. It takes a few minutes and ends with something you can point
            at.
          </p>
          <Link to="/app" className="mt-7 inline-block">
            <Btn className="px-6 py-3">Start your first Bridge Session</Btn>
          </Link>
        </div>
      </section>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        Bridge — a demo prototype. Nothing here is graded.
      </footer>
    </div>
  );
}
