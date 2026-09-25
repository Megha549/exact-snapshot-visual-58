import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type ConceptStatus = {
  id: string;
  name: string;
  academic: "Strong" | "Moderate" | "Weak";
  practical: "Not assessed" | "Needs Practice" | "Demonstrated";
};

export type Profile = {
  name: string;
  course: string;
  year: string;
  subjects: string[];
  interests: string[];
  confidence: string;
  goal: string;
};

export type EvidenceItem = {
  concept: string;
  subject: string;
  note: string;
  at: string;
};

export const SUBJECTS = [
  { id: "dbms", name: "DBMS", blurb: "Databases, SQL, query reasoning", ready: true },
  { id: "python", name: "Python", blurb: "Scripting and program logic", ready: false },
  { id: "stats", name: "Statistics", blurb: "Inference and data reasoning", ready: false },
  { id: "os", name: "Operating Systems", blurb: "Processes, memory, scheduling", ready: false },
  { id: "net", name: "Networking", blurb: "Protocols and layered design", ready: false },
  { id: "ml", name: "Machine Learning", blurb: "Models, training, evaluation", ready: false },
];

export const SUBJECT_TAGS = ["DBMS", "Python", "Statistics", "OS", "Networking", "ML"];
export const INTEREST_TAGS = [
  "Web Dev",
  "Data Science",
  "AI/ML",
  "Backend Systems",
  "Product",
  "Research",
];

const INITIAL_CONCEPTS: ConceptStatus[] = [
  { id: "select", name: "SELECT & Filtering", academic: "Strong", practical: "Needs Practice" },
  { id: "join", name: "JOIN", academic: "Strong", practical: "Not assessed" },
  { id: "group", name: "GROUP BY / HAVING", academic: "Moderate", practical: "Not assessed" },
  { id: "null", name: "NULL Handling", academic: "Weak", practical: "Not assessed" },
  { id: "sub", name: "Subqueries", academic: "Moderate", practical: "Not assessed" },
];

type SessionLog = { concept: string; result: string; at: string };

type Store = {
  onboarded: boolean;
  profile: Profile;
  concepts: ConceptStatus[];
  evidence: EvidenceItem[];
  sessions: SessionLog[];
  completeOnboarding: (p: Profile) => void;
  recordDemonstrated: (conceptId: string) => void;
};

const defaultProfile: Profile = {
  name: "",
  course: "",
  year: "",
  subjects: [],
  interests: [],
  confidence: "",
  goal: "",
};

const BridgeContext = createContext<Store | null>(null);

export function BridgeProvider({ children }: { children: ReactNode }) {
  const [onboarded, setOnboarded] = useState(false);
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [concepts, setConcepts] = useState<ConceptStatus[]>(INITIAL_CONCEPTS);
  const [evidence, setEvidence] = useState<EvidenceItem[]>([]);
  const [sessions, setSessions] = useState<SessionLog[]>([]);

  const completeOnboarding = useCallback((p: Profile) => {
    setProfile(p);
    setOnboarded(true);
  }, []);

  const recordDemonstrated = useCallback((conceptId: string) => {
    const at = new Date().toLocaleString(undefined, {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
    setConcepts((prev) =>
      prev.map((c) => (c.id === conceptId ? { ...c, practical: "Demonstrated" } : c)),
    );
    setConcepts((prev) => {
      const concept = prev.find((c) => c.id === conceptId);
      if (concept) {
        setEvidence((e) =>
          e.some((x) => x.concept === concept.name)
            ? e
            : [
                {
                  concept: concept.name,
                  subject: "DBMS",
                  note: "Applied the concept to two unseen problems after a diagnosed misconception.",
                  at,
                },
                ...e,
              ],
        );
        setSessions((s) => [
          { concept: concept.name, result: "Demonstrated", at },
          ...s.filter((x) => x.concept !== concept.name),
        ]);
      }
      return prev;
    });
  }, []);

  const value = useMemo(
    () => ({
      onboarded,
      profile,
      concepts,
      evidence,
      sessions,
      completeOnboarding,
      recordDemonstrated,
    }),
    [onboarded, profile, concepts, evidence, sessions, completeOnboarding, recordDemonstrated],
  );

  return <BridgeContext.Provider value={value}>{children}</BridgeContext.Provider>;
}

export function useBridge() {
  const ctx = useContext(BridgeContext);
  if (!ctx) throw new Error("useBridge must be used inside BridgeProvider");
  return ctx;
}
