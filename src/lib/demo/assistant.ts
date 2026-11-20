import { SPECIES, getSpecies } from "./catalog";
import type { Species } from "./types";

/**
 * Simulated DenseShade AI. Everything here is local demonstration data:
 * no real model, image analysis or botanical database is connected.
 */

function hash(text: string): number {
  let h = 0;
  for (const ch of text) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return h;
}

export interface IdentifyResult {
  species: Species;
  confidence: number; // 0-100
  alternatives: { species: Species; confidence: number }[];
}

/** Picks a demo match from the given pool (e.g. the user's garden species), seeded by the photo's name/size. */
export function simulateIdentify(seed: string, poolIds: string[]): IdentifyResult {
  const pool = (poolIds.length ? poolIds : SPECIES.map((s) => s.id)).map(getSpecies).filter((s): s is Species => !!s);
  const h = hash(seed);
  const species = pool[h % pool.length]!;
  const confidence = 62 + (h % 24);
  const sameCat = SPECIES.filter((s) => s.id !== species.id && s.category === species.category);
  const others = SPECIES.filter((s) => s.id !== species.id && s.category !== species.category);
  const alts = [...sameCat, ...others].slice(0, 2);
  return {
    species,
    confidence,
    alternatives: alts.map((s, i) => ({ species: s, confidence: Math.max(8, Math.round((100 - confidence) / (i + 1.6))) })),
  };
}

export interface HealthScenario {
  id: string;
  symptom: string;
  causes: string[];
  checks: string[];
  nextSteps: string[];
}

export const HEALTH_SCENARIOS: readonly HealthScenario[] = [
  {
    id: "yellow",
    symptom: "Yellowing lower leaves",
    causes: ["Soil staying wet for too long", "Natural ageing of older leaves", "Low nutrients after a long time in one pot"],
    checks: ["Push a finger 3-5 cm into the soil: is it still damp?", "Check the pot has a drainage hole", "See whether only the oldest leaves are affected"],
    nextSteps: ["Let the top of the soil dry before watering again", "Remove fully yellow leaves gently", "Feed lightly in the growing season if it hasn't been fed recently"],
  },
  {
    id: "scorch",
    symptom: "Brown, crispy leaf edges or tips",
    causes: ["Strong afternoon sun or heat", "Dry air or uneven watering", "Salt build-up from fertiliser"],
    checks: ["Note how many hours of direct sun the spot gets", "Check whether the soil dries out completely between waterings", "Look for white crust on the soil surface"],
    nextSteps: ["Move to softer light or add afternoon shade", "Water deeply and more evenly", "Flush the pot with plain water once"],
  },
  {
    id: "spots",
    symptom: "Small spots or speckles on leaves",
    causes: ["Sap-sucking pests such as spider mites", "A fungal leaf spot after wet foliage", "Water splashes in bright sun"],
    checks: ["Look under leaves with good light for tiny moving dots or webbing", "Wipe a leaf with a white tissue and check for residue", "Notice whether spots are spreading over a few days"],
    nextSteps: ["Rinse leaves gently and isolate the plant if pests are seen", "Water at the soil, not over the leaves", "Remove badly affected leaves with clean scissors"],
  },
  {
    id: "droop",
    symptom: "Drooping or wilting",
    causes: ["Thirst - the soil is very dry", "Too much water causing root stress", "Recent move or repotting shock"],
    checks: ["Lift the pot: does it feel very light or very heavy?", "Check whether the stem base feels soft", "Think about any recent changes in place or pot"],
    nextSteps: ["If dry, water slowly and check again in a few hours", "If wet, pause watering and improve drainage", "Give it a calm, stable spot for a week"],
  },
];

export function simulateHealth(seed: string): { scenario: HealthScenario; confidence: number } {
  const h = hash(seed);
  return { scenario: HEALTH_SCENARIOS[h % HEALTH_SCENARIOS.length]!, confidence: 40 + (h % 25) };
}

export interface KnowledgeAnswer {
  question: string;
  keywords: string[];
  simple: string;
  advanced: string;
  speciesIds: string[];
  followUps: string[];
}

export const KNOWLEDGE: readonly KnowledgeAnswer[] = [
  {
    question: "How often should I water my Monstera?",
    keywords: ["monstera", "water", "watering", "often"],
    simple: "Water when the top few centimetres of soil feel dry, usually about once a week. Let extra water drain away.",
    advanced: "Monstera prefers a cycle of thorough watering followed by partial drying (top 25-30% of the mix). Frequency depends on light, pot size and mix; in bright indirect light expect 5-9 days, less often in winter. A chunky aroid mix with bark and perlite reduces the risk of root rot.",
    speciesIds: ["monstera"],
    followUps: ["Why are my Monstera leaves not splitting?", "Which indoor plants are easy for beginners?"],
  },
  {
    question: "Why are my Monstera leaves not splitting?",
    keywords: ["split", "fenestration", "monstera", "holes"],
    simple: "Splits come with age and good light. Give it brighter, indirect light and something to climb.",
    advanced: "Fenestration is a juvenile-to-mature transition driven by plant maturity, light intensity and vertical support. Young plants and those in low light produce entire leaves. A moss pole, bright indirect light and steady feeding encourage mature leaves over time.",
    speciesIds: ["monstera"],
    followUps: ["How often should I water my Monstera?"],
  },
  {
    question: "Which indoor plants are easy for beginners?",
    keywords: ["easy", "beginner", "indoor", "low light", "start"],
    simple: "Snake plant and pothos are very forgiving. Peace lily tells you when it's thirsty by drooping.",
    advanced: "Good starter plants tolerate irregular watering and a range of light: snake plant (CAM photosynthesis, drought tolerant), pothos (fast feedback, easy propagation) and peace lily (visible turgor loss when dry). Avoid fiddle-leaf fig until you have stable bright light.",
    speciesIds: ["snake-plant", "pothos", "peace-lily"],
    followUps: ["How often should I water my Monstera?", "What grows well in a California summer-dry garden?"],
  },
  {
    question: "What grows well in a California summer-dry garden?",
    keywords: ["california", "dry", "drought", "native", "summer"],
    simple: "Manzanita, California poppy, lavender and rosemary love dry summers once settled in.",
    advanced: "Mediterranean-climate plants are adapted to winter rain and summer drought. California natives like manzanita and California poppy dislike summer irrigation once established; Mediterranean herbs such as lavender and rosemary need sharp drainage. Plant in autumn so roots establish with winter rain.",
    speciesIds: ["manzanita", "california-poppy", "lavender", "rosemary"],
    followUps: ["When should I prune lavender?", "How do I care for a Meyer lemon in a pot?"],
  },
  {
    question: "When should I prune lavender?",
    keywords: ["prune", "lavender", "trim", "cut"],
    simple: "Trim lightly right after flowering. Don't cut into the old bare wood.",
    advanced: "Shear about a third of the soft growth after the main flush of flowers, keeping a rounded shape. Lavender rarely regrows from leafless old wood, so stay within green growth. A second light tidy in early autumn is fine in mild California regions.",
    speciesIds: ["lavender"],
    followUps: ["What grows well in a California summer-dry garden?"],
  },
  {
    question: "How do I care for a Meyer lemon in a pot?",
    keywords: ["lemon", "citrus", "meyer", "pot", "fruit"],
    simple: "Give it full sun, water when the top soil dries, and feed with citrus food in spring and summer.",
    advanced: "Container citrus needs 6-8 hours of sun, a free-draining mix and consistent moisture without waterlogging. Use a citrus fertiliser with micronutrients (iron, zinc, manganese) during active growth; yellowing between green veins often signals deficiency. Protect from frost below about -2 °C.",
    speciesIds: ["meyer-lemon"],
    followUps: ["Why are my tomato leaves curling?", "What grows well in a California summer-dry garden?"],
  },
  {
    question: "Why are my tomato leaves curling?",
    keywords: ["tomato", "curl", "curling", "leaves"],
    simple: "Often it's heat or uneven watering. Water deeply and regularly, and mulch the soil.",
    advanced: "Physiological leaf roll is a common response to heat, wind and irregular moisture and is usually harmless. Curling with mottling or distortion may indicate viruses or herbicide drift. Even, deep watering and mulch reduce stress; check undersides for aphids or whitefly.",
    speciesIds: ["tomato"],
    followUps: ["How do I care for a Meyer lemon in a pot?"],
  },
];

export const SUGGESTED_QUESTIONS = KNOWLEDGE.slice(0, 4).map((k) => k.question);

/** Finds the closest sample answer by keyword overlap; null when nothing matches. */
export function simulateAnswer(question: string): KnowledgeAnswer | null {
  const q = question.toLowerCase();
  const exact = KNOWLEDGE.find((k) => k.question.toLowerCase() === q);
  if (exact) return exact;
  let best: KnowledgeAnswer | null = null;
  let score = 0;
  for (const k of KNOWLEDGE) {
    const s = k.keywords.filter((w) => q.includes(w)).length;
    if (s > score) [best, score] = [k, s];
  }
  return best;
}
