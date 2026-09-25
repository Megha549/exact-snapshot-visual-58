import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { Btn, Pill } from "@/components/bits";
import {
  INTEREST_TAGS,
  SUBJECT_TAGS,
  useBridge,
  type Profile,
} from "@/lib/bridge-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app")({
  component: AppLayout,
});

const nav = [
  { to: "/app", label: "Dashboard" },
  { to: "/app/subjects", label: "My Subjects" },
  { to: "/app/session", label: "Bridge Sessions" },
  { to: "/app/practice", label: "Practice" },
  { to: "/app/build", label: "Build" },
  { to: "/app/resources", label: "Resources" },
  { to: "/app/progress", label: "Progress" },
  { to: "/app/profile", label: "Profile" },
] as const;

function AppLayout() {
  const { onboarded } = useBridge();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  if (!onboarded) return <Onboarding />;

  return (
    <div className="min-h-screen bg-background lg:flex">
      <aside className="border-b border-border bg-paper lg:min-h-screen lg:w-60 lg:shrink-0 lg:border-b-0 lg:border-r">
        <div className="flex items-center gap-2.5 px-5 py-4">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-ink font-mono text-sm text-primary-foreground">
            B
          </span>
          <Link to="/" className="font-display text-lg font-semibold text-ink">
            Bridge
          </Link>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-col lg:overflow-visible">
          {nav.map((n) => {
            const active = n.to === "/app" ? pathname === "/app" : pathname.startsWith(n.to);
            return (
              <Link
                key={n.to}
                to={n.to}
                className={cn(
                  "whitespace-nowrap rounded-md px-3 py-2 text-sm transition-colors",
                  active
                    ? "bg-accent font-medium text-accent-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                )}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <main className="min-w-0 flex-1">
        <div className="mx-auto max-w-5xl px-5 py-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

function Onboarding() {
  const { completeOnboarding } = useBridge();
  const [form, setForm] = useState<Profile>({
    name: "",
    course: "",
    year: "",
    subjects: ["DBMS"],
    interests: [],
    confidence: "Comfortable with theory",
    goal: "Be able to apply what I study",
  });

  const toggle = (key: "subjects" | "interests", tag: string) =>
    setForm((f) => ({
      ...f,
      [key]: f[key].includes(tag) ? f[key].filter((t) => t !== tag) : [...f[key], tag],
    }));

  const input =
    "mt-1.5 w-full rounded-md border border-input bg-card px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/25";

  return (
    <div className="min-h-screen bg-background px-5 py-14">
      <div className="mx-auto max-w-2xl">
        <Pill tone="accent">First time setup</Pill>
        <h1 className="mt-4 text-3xl font-semibold text-ink">Let's set up your Bridge</h1>
        <p className="mt-2 text-[15px] text-muted-foreground">
          This shapes which concepts Bridge puts in front of you. Nothing is graded.
        </p>

        <form
          className="panel mt-8 space-y-6 p-6"
          onSubmit={(e) => {
            e.preventDefault();
            completeOnboarding({ ...form, name: form.name.trim() || "Student" });
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-medium text-foreground">
              Name
              <input
                className={input}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Megha"
              />
            </label>
            <label className="text-sm font-medium text-foreground">
              Course
              <input
                className={input}
                value={form.course}
                onChange={(e) => setForm({ ...form, course: e.target.value })}
                placeholder="B.Tech CSE"
              />
            </label>
          </div>

          <label className="block text-sm font-medium text-foreground">
            Year / semester
            <input
              className={input}
              value={form.year}
              onChange={(e) => setForm({ ...form, year: e.target.value })}
              placeholder="3rd year, Sem 5"
            />
          </label>

          <div>
            <p className="text-sm font-medium text-foreground">Current subjects</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {SUBJECT_TAGS.map((t) => (
                <Chip key={t} on={form.subjects.includes(t)} onClick={() => toggle("subjects", t)}>
                  {t}
                </Chip>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-foreground">Interests</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {INTEREST_TAGS.map((t) => (
                <Chip key={t} on={form.interests.includes(t)} onClick={() => toggle("interests", t)}>
                  {t}
                </Chip>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-medium text-foreground">
              Confidence level
              <select
                className={input}
                value={form.confidence}
                onChange={(e) => setForm({ ...form, confidence: e.target.value })}
              >
                <option>New to the subject</option>
                <option>Comfortable with theory</option>
                <option>Can apply with help</option>
                <option>Confident applying alone</option>
              </select>
            </label>
            <label className="text-sm font-medium text-foreground">
              Main goal
              <select
                className={input}
                value={form.goal}
                onChange={(e) => setForm({ ...form, goal: e.target.value })}
              >
                <option>Be able to apply what I study</option>
                <option>Get internship-ready</option>
                <option>Build a portfolio project</option>
                <option>Prepare for interviews</option>
              </select>
            </label>
          </div>

          <Btn type="submit" className="w-full py-3">
            Enter Bridge
          </Btn>
        </form>
      </div>
    </div>
  );
}

function Chip({
  on,
  children,
  onClick,
}: {
  on: boolean;
  children: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1.5 text-sm transition-colors",
        on
          ? "border-primary bg-primary text-primary-foreground"
          : "border-input bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}
