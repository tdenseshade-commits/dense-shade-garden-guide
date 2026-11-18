import { addDays, format, subDays } from "date-fns";

import type { CareLog, CareTask, CareType, DemoState, DemoUser, FeedPost, GardenPlant, Health } from "./types";

export const DEMO_VERSION = 1;

/** Sample community members. "me" is the signed-in person. */
export const DEMO_USERS: readonly DemoUser[] = [
  { id: "u-maya", name: "Maya Torres", email: "maya@example.com", region: "Central Coast", experience: "advanced", bio: "Native plant nerd in San Luis Obispo.", avatar: "Shrubs", joinedOn: "2025-03-02" },
  { id: "u-jordan", name: "Jordan Lee", email: "jordan@example.com", region: "San Francisco Bay Area", experience: "intermediate", bio: "Balcony herbs and too many pothos.", avatar: "Herbs", joinedOn: "2025-06-18" },
  { id: "u-priya", name: "Priya Shah", email: "priya@example.com", region: "Inland Southern California", experience: "beginner", bio: "First year growing tomatoes!", avatar: "Vegetables", joinedOn: "2026-01-09" },
  { id: "u-sam", name: "Sam Okafor", email: "sam@example.com", region: "Desert regions", experience: "intermediate", bio: "Cacti, citrus and a tiny pond.", avatar: "Succulents and cacti", joinedOn: "2025-11-21" },
];

type PlantSeed = [id: string, speciesId: string, nickname: string, location: string, health: Health, notes: string, waterDueOffset: number];

// 20 plants covering all ten categories. waterDueOffset: days from today (negative = overdue).
const PLANTS: PlantSeed[] = [
  ["p-monstera", "monstera", "Big Monty", "Living room, by the east window", "thriving", "New leaf unfurling every few weeks.", 0],
  ["p-snake", "snake-plant", "Sergeant", "Bedroom corner", "healthy", "Barely needs anything.", 9],
  ["p-pothos", "pothos", "Goldie", "Kitchen shelf", "healthy", "Trailing nicely over the shelf edge.", 2],
  ["p-fiddle", "fiddle-leaf-fig", "Fig Newton", "Hallway near skylight", "needs_attention", "Dropped two lower leaves after moving.", -2],
  ["p-peace", "peace-lily", "Serenity", "Bathroom", "healthy", "Droops dramatically when thirsty.", 1],
  ["p-echeveria", "echeveria", "Rosette", "South windowsill", "thriving", "Pink edges coming in with the sun.", 6],
  ["p-aloe", "aloe-vera", "Doc", "Patio table", "healthy", "Two pups ready to separate.", 4],
  ["p-basil", "basil", "Pesto", "Kitchen window box", "needs_attention", "Started to flower; pinch the tips.", 0],
  ["p-rosemary", "rosemary", "Rosie", "Front path bed", "thriving", "Bees love it.", 5],
  ["p-mint", "mint", "Mojito", "Container by back door", "healthy", "Kept in a pot so it doesn't spread.", -1],
  ["p-lavender", "lavender", "Provence", "Sunny border", "healthy", "Prune after flowering.", 7],
  ["p-poppy", "california-poppy", "Sunny", "Meadow strip", "thriving", "Self-seeding happily.", 3],
  ["p-jasmine", "star-jasmine", "Starlight", "Side fence trellis", "healthy", "Smells amazing in the evening.", 2],
  ["p-bougainvillea", "bougainvillea", "Fuchsia", "Garage wall", "struggling", "Few bracts this year; may be overwatered.", 8],
  ["p-manzanita", "manzanita", "Red Bark", "Slope by driveway", "healthy", "Summer-dry; water only monthly.", 12],
  ["p-olive", "olive", "Athena", "Courtyard pot", "thriving", "Small crop of olives this autumn.", 6],
  ["p-maple", "japanese-maple", "Ember", "Shaded north corner", "needs_attention", "Leaf tips scorched in the heatwave.", 0],
  ["p-lily", "water-lily", "Lotus Pond Lily", "Patio water bowl", "healthy", "Top up the bowl in hot weather.", 1],
  ["p-tomato", "tomato", "Big Red", "Raised bed 1", "healthy", "Staked and fruiting.", -1],
  ["p-lemon", "meyer-lemon", "Sunny Meyer", "Large pot on patio", "thriving", "Lots of blossom.", 3],
];

const ISO = (d: Date) => format(d, "yyyy-MM-dd");

/** Builds the full, interconnected demonstration state relative to `now`. */
export function makeSeed(now: Date = new Date()): DemoState {
  const plants: GardenPlant[] = PLANTS.map(([id, speciesId, nickname, location, health, notes], i) => ({
    id,
    speciesId,
    nickname,
    location,
    health,
    notes,
    addedOn: ISO(subDays(now, 30 + i * 9)),
    archived: false,
    observations: [
      { id: `${id}-o1`, date: subDays(now, 14 + i).toISOString(), text: `Settled in well at ${location.toLowerCase()}.` },
      { id: `${id}-o2`, date: subDays(now, 3 + (i % 4)).toISOString(), text: notes },
    ],
  }));

  const tasks: CareTask[] = PLANTS.map(([id, , , , , , offset]) => ({
    id: `t-water-${id}`,
    plantId: id,
    type: "water" as CareType,
    dueOn: ISO(addDays(now, offset)),
    repeatEveryDays: 7,
    completedAt: null,
    note: "",
  }));

  const extra: [string, CareType, number, string][] = [
    ["p-monstera", "fertilise", 0, "Half-strength liquid feed."],
    ["p-fiddle", "inspect", -1, "Check for root rot after leaf drop."],
    ["p-basil", "prune", 0, "Pinch off flower spikes."],
    ["p-lavender", "prune", 4, "Light trim after flowering."],
    ["p-monstera", "clean", 3, "Wipe dust from leaves."],
    ["p-aloe", "repot", 10, "Separate pups into new pots."],
    ["p-tomato", "fertilise", -3, "Tomato feed for fruiting."],
    ["p-maple", "inspect", 2, "Look for more scorch."],
    ["p-lemon", "fertilise", 6, "Citrus feed."],
  ];
  extra.forEach(([plantId, type, offset, note], i) =>
    tasks.push({ id: `t-x${i}`, plantId, type, dueOn: ISO(addDays(now, offset)), repeatEveryDays: null, completedAt: null, note }),
  );

  // Completed examples, mirrored in the care history.
  const done: [string, CareType, number][] = [
    ["p-snake", "water", 0],
    ["p-peace", "clean", 1],
    ["p-rosemary", "prune", 2],
    ["p-olive", "fertilise", 3],
  ];
  const logs: CareLog[] = [];
  done.forEach(([plantId, type, ago], i) => {
    const at = subDays(now, ago).toISOString();
    tasks.push({ id: `t-done${i}`, plantId, type, dueOn: ISO(subDays(now, ago)), repeatEveryDays: null, completedAt: at, note: "" });
    logs.push({ id: `l-done${i}`, plantId, type, doneAt: at, note: "", taskId: `t-done${i}` });
  });
  PLANTS.forEach(([id], i) =>
    logs.push({ id: `l-w-${id}`, plantId: id, type: "water", doneAt: subDays(now, 5 + (i % 6)).toISOString(), note: "", taskId: null }),
  );

  const posts: FeedPost[] = [
    { id: "f1", userId: "u-maya", speciesId: "manzanita", plantId: null, caption: "Manzanita bark glowing after the first rain. Zero summer water, all year happy.", postedAt: subDays(now, 1).toISOString(), likedBy: ["u-jordan", "u-sam"], comments: [{ id: "c1", userId: "u-priya", text: "So pretty! Is it hard to start?", postedAt: subDays(now, 1).toISOString() }] },
    { id: "f2", userId: "me", speciesId: "monstera", plantId: "p-monstera", caption: "Big Monty pushed out another split leaf this week.", postedAt: subDays(now, 2).toISOString(), likedBy: ["u-maya"], comments: [] },
    { id: "f3", userId: "u-jordan", speciesId: "basil", plantId: null, caption: "Balcony basil harvest — pinching the tips really works.", postedAt: subDays(now, 3).toISOString(), likedBy: ["me", "u-priya"], comments: [] },
    { id: "f4", userId: "u-priya", speciesId: "tomato", plantId: null, caption: "First ripe tomato of my life!", postedAt: subDays(now, 4).toISOString(), likedBy: ["u-maya", "u-jordan", "u-sam"], comments: [{ id: "c2", userId: "u-sam", text: "Congrats! Keep watering evenly.", postedAt: subDays(now, 4).toISOString() }] },
    { id: "f5", userId: "u-sam", speciesId: "water-lily", plantId: null, caption: "Even in the desert, a little bowl pond works.", postedAt: subDays(now, 6).toISOString(), likedBy: [], comments: [] },
  ];

  return {
    version: DEMO_VERSION,
    seededAt: now.toISOString(),
    plants,
    tasks,
    logs,
    posts,
    settings: {
      avatar: null,
      notifications: { careReminders: true, weeklySummary: true, seasonalTips: false, communityActivity: false },
      reminderTime: "08:00",
    },
  };
}
