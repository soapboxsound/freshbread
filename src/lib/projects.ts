export type Project = {
  slug: string;
  title: string;
  client: string;
  year: string;
  category: string;
  summary: string;
  src: string;
  poster: string;
  song?: string;
  artist?: string;
  agency?: string;
};

/** Started from the parked SPBX showcase reel — credits still filling in. */
export const projects: Project[] = [
  {
    slug: "brunch",
    title: "Brunch.",
    client: "American Express",
    year: "2024",
    category: "Advertising",
    summary: "Music supervision for a national Amex spot.",
    src: "/reel/brunch.mp4",
    poster: "/reel/thumbs/brunch.jpg",
  },
  {
    slug: "homecoming",
    title: "Homecoming.",
    client: "American Express",
    year: "2024",
    category: "Advertising",
    summary: "Cue strategy and clearances for a broadcast package.",
    src: "/reel/homecoming.mp4",
    poster: "/reel/thumbs/homecoming.jpg",
  },
  {
    slug: "neworleans",
    title: "New Orleans.",
    client: "American Express",
    year: "2024",
    category: "Advertising",
    summary: "Supervision and licensing for a location-driven campaign film.",
    src: "/reel/neworleans.mp4",
    poster: "/reel/thumbs/neworleans.jpg",
  },
  {
    slug: "puppy",
    title: "Puppy.",
    client: "American Express",
    year: "2024",
    category: "Advertising",
    summary: "Music direction for a high-visibility consumer spot.",
    src: "/reel/puppy.mp4",
    poster: "/reel/thumbs/puppy.jpg",
  },
];

