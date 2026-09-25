import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Btn, Code, Pill, ResultTable } from "@/components/bits";
import { useBridge } from "@/lib/bridge-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/session")({
  head: () => ({
    meta: [
      { title: "JOIN Bridge Session — Bridge" },
      {
        name: "description",
        content:
          "A seven-step JOIN session: academic check, unseen application problem, diagnosis, targeted fix, retry and transfer test.",
      },
      { property: "og:title", content: "JOIN Bridge Session — Bridge" },
      {
        property: "og:description",
        content:
          "Diagnose the misconception behind a wrong INNER JOIN, fix it, then prove the transfer on a fresh problem.",
      },
    ],
  }),
  component: Session,
});

const STEPS = [
  "Academic",
  "Apply",
  "Diagnose",
  "Fix",
  "Retry",
  "Transfer",
  "Evidence",
];

const WRONG_QUERY = `SELECT c.name, o.amount
FROM customers c
INNER JOIN orders o
  ON c.id = o.customer_id;`;

const TRANSFER_START = `SELECT p.title, r.rating
FROM products p
-- your join here
  ON p.id = r.product_id;`;

const hasLeftJoin = (q: string) => /left\s+(outer\s+)?join/i.test(q);

function Session() {
  const { recordDemonstrated } = useBridge();
  const [step, setStep] = useState(0);

  // step 1
  const [query, setQuery] = useState(WRONG_QUERY);
  const [ran, setRan] = useState(false);
  // step 2
  const [choice, setChoice] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  // step 4 / 5
  const [retry, setRetry] = useState("SELECT c.name, o.amount\nFROM customers c\n");
  const [retryState, setRetryState] = useState<"idle" | "wrong" | "ok">("idle");
  const [transfer, setTransfer] = useState(TRANSFER_START);
  const [transferState, setTransferState] = useState<"idle" | "wrong" | "ok">("idle");

  const textarea =
    "mt-3 w-full resize-y rounded-md border border-input bg-code p-4 font-mono text-[13px] leading-relaxed text-code-foreground outline-none focus:border-primary focus:ring-2 focus:ring-ring/30";

  return (
    <div className="space-y-8">
      <div>
        <Pill tone="accent">DBMS · JOIN</Pill>
        <h1 className="mt-4 text-3xl font-semibold text-ink">Bridge Session: JOIN</h1>
        <p className="mt-2 text-[15px] text-muted-foreground">
          Learn → Apply → Diagnose → Fix → Verify. Seven steps, nothing skipped.
        </p>
      </div>

      <ol className="flex flex-wrap gap-1.5">
        {STEPS.map((s, i) => (
          <li
            key={s}
            className={cn(
              "flex items-center gap-2 rounded-md border px-3 py-1.5 font-mono text-[11px]",
              i === step
                ? "border-primary bg-primary text-primary-foreground"
                : i < step
                  ? "border-success/40 bg-success-soft text-success-foreground"
                  : "border-border bg-card text-muted-foreground",
            )}
          >
            <span>{i}</span>
            {s}
          </li>
        ))}
      </ol>

      {step === 0 && (
        <Panel title="Step 0 · Academic check">
          <Pill tone="success">You answered this correctly in your last concept check</Pill>
          <p className="mt-4 text-[15px] leading-relaxed text-foreground">
            Which rows does an <span className="font-mono">INNER JOIN</span> return between two
            tables?
          </p>
          <div className="mt-3 rounded-md border border-border bg-secondary/50 p-4 text-sm text-foreground">
            Your answer: “Only the rows where the join condition matches in both tables.”
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Correct. Now the part the exam never asked: can you reach for that when the problem
            doesn't name the join for you?
          </p>
          <Btn className="mt-6" onClick={() => setStep(1)}>
            Continue
          </Btn>
        </Panel>
      )}

      {step === 1 && (
        <Panel title="Step 1 · Practical challenge">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="rule-label mb-2">customers</p>
              <ResultTable
                columns={["id", "name"]}
                rows={[
                  ["1", "Aarav"],
                  ["2", "Neha"],
                  ["3", "Rahul"],
                ]}
              />
            </div>
            <div>
              <p className="rule-label mb-2">orders</p>
              <ResultTable
                columns={["id", "customer_id", "amount"]}
                rows={[
                  ["11", "1", "2400"],
                  ["12", "2", "990"],
                  ["13", "1", "1500"],
                ]}
              />
            </div>
          </div>

          <p className="mt-6 text-[15px] leading-relaxed text-foreground">
            <span className="font-medium">Task:</span> list <em>every</em> customer with their order
            amount — including customers who have never ordered.
          </p>

          <textarea
            className={textarea}
            rows={6}
            spellCheck={false}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setRan(false);
            }}
          />

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Btn
              onClick={() => {
                if (hasLeftJoin(query)) setStep(2);
                else setRan(true);
              }}
            >
              Run query
            </Btn>
            {ran && <span className="text-sm text-warn-foreground">3 rows returned.</span>}
          </div>

          {ran && (
            <div className="diagnose-reveal mt-5 space-y-4">
              <ResultTable
                columns={["name", "amount"]}
                rows={[
                  ["Aarav", "2400"],
                  ["Aarav", "1500"],
                  ["Neha", "990"],
                ]}
              />
              <div className="rounded-md border border-warn/40 bg-warn-soft p-4">
                <p className="font-mono text-[11px] uppercase tracking-wider text-warn-foreground/80">
                  notice
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-warn-foreground">
                  Rahul is missing. He exists as a customer, but he has no orders — and the task asked
                  for every customer.
                </p>
              </div>
              <Btn variant="outline" onClick={() => setStep(2)}>
                Why did that happen?
              </Btn>
            </div>
          )}
        </Panel>
      )}

      {step === 2 && (
        <Panel title="Step 2 · Diagnosis">
          <div className="rounded-md border border-warn/40 bg-warn-soft p-4">
            <p className="font-mono text-[11px] uppercase tracking-wider text-warn-foreground/80">
              likely misconception
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-warn-foreground">
              You're reading <span className="font-mono">INNER JOIN</span> as “bring the two tables
              together”. It actually <em>filters</em>: any row without a match on the other side is
              dropped. Rahul had no matching order, so he disappeared.
            </p>
          </div>

          <p className="mt-6 text-[15px] font-medium text-foreground">
            So what does INNER JOIN do with unmatched rows?
          </p>
          <div className="mt-3 space-y-2">
            {[
              "Keeps them, filling the missing columns with NULL.",
              "Excludes them from the result entirely.",
              "Keeps them only if the column allows NULL values.",
            ].map((opt, i) => (
              <button
                key={i}
                onClick={() => {
                  setChoice(i);
                  setAnswered(true);
                }}
                className={cn(
                  "w-full rounded-md border px-4 py-3 text-left text-sm transition-colors",
                  answered && i === 1
                    ? "border-success/50 bg-success-soft text-success-foreground"
                    : answered && choice === i
                      ? "border-warn/50 bg-warn-soft text-warn-foreground"
                      : "border-input bg-card hover:border-primary/40",
                )}
              >
                {opt}
              </button>
            ))}
          </div>
          {answered && (
            <Btn className="mt-6" onClick={() => setStep(3)}>
              Continue
            </Btn>
          )}
        </Panel>
      )}

      {step === 3 && (
        <Panel title="Step 3 · Confirm & fix">
          {choice === 1 ? (
            <Pill tone="success">Confirmed — you've got the behaviour right</Pill>
          ) : (
            <Pill tone="warn">Not quite — read this one carefully</Pill>
          )}
          <p className="mt-4 text-[15px] leading-relaxed text-foreground">
            <span className="font-mono">LEFT JOIN</span> keeps every row from the left table, matched
            or not. Where there's no match, the right table's columns come back as{" "}
            <span className="font-mono">NULL</span> — which is exactly how “no orders” should look.
          </p>
          <Code className="mt-4">{`SELECT c.name, o.amount
FROM customers c
LEFT JOIN orders o
  ON c.id = o.customer_id;`}</Code>
          <div className="mt-4">
            <p className="rule-label mb-2">result</p>
            <ResultTable
              columns={["name", "amount"]}
              rows={[
                ["Aarav", "2400"],
                ["Aarav", "1500"],
                ["Neha", "990"],
                ["Rahul", null],
              ]}
            />
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            The NULL row is the counterexample: INNER JOIN could never produce it.
          </p>
          <Btn className="mt-6" onClick={() => setStep(4)}>
            Try it yourself
          </Btn>
        </Panel>
      )}

      {step === 4 && (
        <Panel title="Step 4 · Retry">
          <p className="text-[15px] leading-relaxed text-foreground">
            Same task, your turn: list every customer with their order amount, including those with no
            orders.
          </p>
          <textarea
            className={textarea}
            rows={6}
            spellCheck={false}
            value={retry}
            onChange={(e) => {
              setRetry(e.target.value);
              setRetryState("idle");
            }}
          />
          <Btn
            className="mt-4"
            onClick={() => setRetryState(hasLeftJoin(retry) ? "ok" : "wrong")}
          >
            Run query
          </Btn>
          {retryState === "wrong" && (
            <p className="diagnose-reveal mt-4 rounded-md border border-warn/40 bg-warn-soft p-4 text-sm text-warn-foreground">
              Rahul is still missing. You need the join that keeps unmatched left-side rows.
            </p>
          )}
          {retryState === "ok" && (
            <div className="diagnose-reveal mt-4 space-y-4">
              <p className="rounded-md border border-success/40 bg-success-soft p-4 text-sm text-success-foreground">
                4 rows returned — including Rahul with a NULL amount. That's it.
              </p>
              <Btn onClick={() => setStep(5)}>Continue to transfer test</Btn>
            </div>
          )}
        </Panel>
      )}

      {step === 5 && (
        <Panel title="Step 5 · Transfer">
          <p className="text-[15px] leading-relaxed text-foreground">
            New tables you haven't seen. List every product with its review rating — including
            products nobody has reviewed.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="rule-label mb-2">products</p>
              <ResultTable
                columns={["id", "title"]}
                rows={[
                  ["1", "Desk Lamp"],
                  ["2", "Notebook"],
                  ["3", "Keyboard"],
                ]}
              />
            </div>
            <div>
              <p className="rule-label mb-2">reviews</p>
              <ResultTable
                columns={["id", "product_id", "rating"]}
                rows={[
                  ["7", "1", "5"],
                  ["8", "3", "4"],
                ]}
              />
            </div>
          </div>
          <textarea
            className={textarea}
            rows={6}
            spellCheck={false}
            value={transfer}
            onChange={(e) => {
              setTransfer(e.target.value);
              setTransferState("idle");
            }}
          />
          <Btn
            className="mt-4"
            onClick={() => setTransferState(hasLeftJoin(transfer) ? "ok" : "wrong")}
          >
            Run query
          </Btn>
          {transferState === "wrong" && (
            <p className="diagnose-reveal mt-4 rounded-md border border-warn/40 bg-warn-soft p-4 text-sm text-warn-foreground">
              Notebook dropped out. Same shape of problem as the customers one — which join keeps it?
            </p>
          )}
          {transferState === "ok" && (
            <div className="diagnose-reveal mt-4 space-y-4">
              <ResultTable
                columns={["title", "rating"]}
                rows={[
                  ["Desk Lamp", "5"],
                  ["Notebook", null],
                  ["Keyboard", "4"],
                ]}
              />
              <Btn
                variant="success"
                onClick={() => {
                  recordDemonstrated("join");
                  setStep(6);
                }}
              >
                Record evidence
              </Btn>
            </div>
          )}
        </Panel>
      )}

      {step === 6 && (
        <Panel title="Step 6 · Evidence recorded">
          <div className="diagnose-reveal rounded-md border border-success/40 bg-success-soft p-5">
            <Pill tone="success">JOIN · Demonstrated</Pill>
            <p className="mt-3 text-[15px] leading-relaxed text-success-foreground">
              You applied JOIN correctly to a problem you'd never seen, after the misconception was
              named and fixed. That's transfer, not recall.
            </p>
          </div>
          <ol className="mt-6 space-y-2 text-sm text-muted-foreground">
            <li>1. Learn — INNER JOIN concept held correctly.</li>
            <li>2. Apply — unseen customers/orders task, INNER JOIN dropped a row.</li>
            <li>3. Diagnose — “INNER JOIN combines” mistaken for “INNER JOIN filters”.</li>
            <li>4. Fix — LEFT JOIN with the NULL counterexample.</li>
            <li>5. Verify — products/reviews solved independently.</li>
          </ol>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/app">
              <Btn>Back to dashboard</Btn>
            </Link>
            <Link to="/app/subjects">
              <Btn variant="outline">See My Subjects</Btn>
            </Link>
          </div>
        </Panel>
      )}
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="panel p-6">
      <p className="rule-label mb-4">{title}</p>
      {children}
    </section>
  );
}
