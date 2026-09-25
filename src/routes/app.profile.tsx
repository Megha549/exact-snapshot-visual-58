import { createFileRoute } from "@tanstack/react-router";
import { Pill, SectionHead } from "@/components/bits";
import { useBridge } from "@/lib/bridge-store";

export const Route = createFileRoute("/app/profile")({
  head: () => ({
    meta: [
      { title: "Profile — Bridge" },
      { name: "description", content: "Your course, subjects, interests and goal in Bridge." },
      { property: "og:title", content: "Profile — Bridge" },
      {
        property: "og:description",
        content: "The details that shape which concepts Bridge puts in front of you.",
      },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const { profile } = useBridge();

  const rows = [
    ["Name", profile.name],
    ["Course", profile.course || "—"],
    ["Year / semester", profile.year || "—"],
    ["Confidence level", profile.confidence],
    ["Goal", profile.goal],
  ];

  return (
    <div className="space-y-8">
      <SectionHead label="profile" title="Your profile" sub="Set during onboarding, for this demo session." />

      <div className="panel divide-y divide-border">
        {rows.map(([k, v]) => (
          <div key={k} className="flex flex-wrap justify-between gap-3 px-5 py-4 text-sm">
            <span className="text-muted-foreground">{k}</span>
            <span className="font-medium text-foreground">{v}</span>
          </div>
        ))}
        <div className="px-5 py-4">
          <p className="text-sm text-muted-foreground">Subjects</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {profile.subjects.length ? (
              profile.subjects.map((s) => (
                <Pill key={s} tone="accent">
                  {s}
                </Pill>
              ))
            ) : (
              <span className="text-sm text-foreground">—</span>
            )}
          </div>
        </div>
        <div className="px-5 py-4">
          <p className="text-sm text-muted-foreground">Interests</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {profile.interests.length ? (
              profile.interests.map((s) => (
                <Pill key={s} tone="quiet">
                  {s}
                </Pill>
              ))
            ) : (
              <span className="text-sm text-foreground">—</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
