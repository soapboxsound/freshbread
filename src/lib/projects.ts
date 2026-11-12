export type Project = {
  slug: string;
  title: string;
  client: string;
  year: string;
  category: string;
  summary: string;
};

export const projects: Project[] = [
  {
    slug: "signal-loss",
    title: "Signal Loss",
    client: "Placeholder Brand",
    year: "2026",
    category: "Campaign",
    summary: "A restless score for a product that never sleeps.",
  },
  {
    slug: "night-shift",
    title: "Night Shift",
    client: "Placeholder Studio",
    year: "2026",
    category: "Film",
    summary: "Warm low-end and sharp needles for a late-city story.",
  },
  {
    slug: "room-tone",
    title: "Room Tone",
    client: "Placeholder Series",
    year: "2025",
    category: "Episodic",
    summary: "Cue language that feels lived-in, not pasted on.",
  },
  {
    slug: "first-rise",
    title: "First Rise",
    client: "Placeholder Launch",
    year: "2025",
    category: "Brand",
    summary: "Opening motif for a company finding its voice.",
  },
];
