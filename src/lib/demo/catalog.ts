import { categoryDetail } from "@/lib/categories";
import type { Species } from "./types";

/** Sample plant catalogue for Discover. Every garden plant references one of these records. */
export const SPECIES: readonly Species[] = [
  // Indoor plants
  {
    id: "monstera",
    commonName: "Monstera",
    scientificName: "Monstera deliciosa",
    category: "Indoor plants",
    summary: "Big, split leaves that grow happily in bright, indirect light.",
    light: "Bright, indirect light",
    water: "When the top 5 cm of soil is dry",
    difficulty: "Easy",
    waterEveryDays: 7,
    feedEveryDays: 30,
    care: {
      simple: "Water when the top of the soil feels dry. Keep it out of hot, direct sun.",
      standard:
        "Water when the top 5 cm of soil is dry, then let extra water drain away. Feed monthly in spring and summer and wipe the leaves so they can soak up light.",
      advanced:
        "Aim for evenly moist, well-aerated soil (an aroid mix with bark and perlite). Provide a moss pole for aerial roots; fertilise every 4 weeks at half strength during active growth and pause in winter.",
    },
    californiaTip: "Keep it away from heater vents in winter; dry indoor air browns leaf edges.",
    tags: ["swiss cheese plant", "tropical", "pet caution"],
  },
  {
    id: "snake-plant",
    commonName: "Snake plant",
    scientificName: "Dracaena trifasciata",
    category: "Indoor plants",
    summary: "Upright, architectural leaves that cope with low light and missed waterings.",
    light: "Low to bright, indirect light",
    water: "When the soil is fully dry",
    difficulty: "Easy",
    waterEveryDays: 18,
    feedEveryDays: 60,
    care: {
      simple: "Water only when the soil is completely dry. Less is more.",
      standard:
        "Let the soil dry right through before watering, roughly every 2 to 3 weeks. Too much water is the most common problem.",
      advanced:
        "Use a gritty cactus mix in a terracotta pot. Water deeply when the pot feels light; in winter stretch to monthly. Feed sparingly, every 2 months in summer.",
    },
    californiaTip: "Fine in air-conditioned rooms; avoid cold drafts below 10°C.",
    tags: ["sansevieria", "low light", "beginner"],
  },
  {
    id: "pothos",
    commonName: "Golden pothos",
    scientificName: "Epipremnum aureum",
    category: "Indoor plants",
    summary: "A trailing, forgiving vine for shelves and hanging pots.",
    light: "Medium to bright, indirect light",
    water: "When the top half of the soil is dry",
    difficulty: "Easy",
    waterEveryDays: 8,
    feedEveryDays: 30,
    care: {
      simple: "Water when the leaves start to look a little soft. Trim long stems if you like.",
      standard:
        "Water when the top half of the soil is dry. Pinch back long trails to keep it full, and root the cuttings in water.",
      advanced:
        "Brighter light keeps variegation strong. Prune just above a node to encourage branching; feed monthly with a balanced liquid fertiliser in the growing season.",
    },
    californiaTip: "Grows nearly year-round indoors in coastal climates.",
    tags: ["devil's ivy", "trailing", "cuttings"],
  },
  {
    id: "fiddle-leaf-fig",
    commonName: "Fiddle-leaf fig",
    scientificName: "Ficus lyrata",
    category: "Indoor plants",
    summary: "A statement tree with large, violin-shaped leaves. Dislikes being moved.",
    light: "Bright light with some gentle sun",
    water: "When the top 5 cm of soil is dry",
    difficulty: "Challenging",
    waterEveryDays: 9,
    feedEveryDays: 30,
    care: {
      simple: "Keep it in one bright spot and water when the top of the soil is dry.",
      standard:
        "Give it the brightest spot you have and keep it there. Water when the top 5 cm is dry and rotate a quarter turn each month for even growth.",
      advanced:
        "Sudden leaf drop usually follows a change in light, temperature or watering rhythm. Keep conditions steady, water thoroughly with good drainage and feed monthly in spring and summer.",
    },
    californiaTip: "Santa Ana winds through open windows can scorch the leaves.",
    tags: ["ficus", "statement plant"],
  },
  {
    id: "peace-lily",
    commonName: "Peace lily",
    scientificName: "Spathiphyllum wallisii",
    category: "Indoor plants",
    summary: "Glossy leaves and white blooms; it droops to tell you it is thirsty.",
    light: "Low to medium, indirect light",
    water: "Keep lightly moist",
    difficulty: "Easy",
    waterEveryDays: 6,
    feedEveryDays: 45,
    care: {
      simple: "Water when the leaves begin to droop. It perks up within hours.",
      standard:
        "Keep the soil lightly moist but not soggy. It enjoys humidity, so a bathroom or kitchen suits it well.",
      advanced:
        "Use filtered or rested tap water if leaf tips brown. Feed every 6 weeks at quarter strength; divide crowded clumps in spring.",
    },
    californiaTip: "Hard water in parts of Southern California can brown the tips; let tap water sit overnight.",
    tags: ["flowering", "humidity", "pet caution"],
  },
  // Succulents and cacti
  {
    id: "echeveria",
    commonName: "Echeveria",
    scientificName: "Echeveria elegans",
    category: "Succulents and cacti",
    summary: "Neat rosettes of blue-grey leaves that blush in full sun.",
    light: "Full sun to bright light",
    water: "Soak, then let dry completely",
    difficulty: "Easy",
    waterEveryDays: 14,
    feedEveryDays: null,
    care: {
      simple: "Lots of sun, very little water. Let the soil dry out completely.",
      standard:
        "Water deeply, then wait until the soil is fully dry. Avoid getting water in the rosette and remove dried lower leaves.",
      advanced:
        "Use a mineral-heavy mix (pumice, grit). Stretching means it needs more light; reduce water in winter dormancy.",
    },
    californiaTip: "Thrives outdoors in most coastal gardens; protect from frost inland.",
    tags: ["mexican snowball", "rosette", "water-wise"],
  },
  {
    id: "aloe-vera",
    commonName: "Aloe vera",
    scientificName: "Aloe vera",
    category: "Succulents and cacti",
    summary: "Fleshy, upright leaves with a soothing gel. Very drought tolerant.",
    light: "Full sun to bright light",
    water: "Every 2 to 3 weeks",
    difficulty: "Easy",
    waterEveryDays: 18,
    feedEveryDays: null,
    care: {
      simple: "Sunny spot, water rarely. If leaves go thin, give it a drink.",
      standard:
        "Water deeply every 2 to 3 weeks in summer and monthly in winter. Pups can be separated to make new plants.",
      advanced:
        "Brown, reddish leaves signal too much sun or too little water. Repot only when pups crowd the pot, using a wide, shallow container.",
    },
    californiaTip: "Happy outdoors year-round along the coast.",
    tags: ["medicinal", "pups", "water-wise"],
  },
  {
    id: "golden-barrel",
    commonName: "Golden barrel cactus",
    scientificName: "Echinocactus grusonii",
    category: "Succulents and cacti",
    summary: "A slow-growing globe of golden spines that loves heat.",
    light: "Full sun",
    water: "Monthly in summer, rarely in winter",
    difficulty: "Easy",
    waterEveryDays: 28,
    feedEveryDays: null,
    care: {
      simple: "Full sun and hardly any water. Wear gloves when handling.",
      standard:
        "Water about once a month in the warm season and barely at all in winter. Plant in very fast-draining soil.",
      advanced:
        "Acclimate gradually to full desert sun to avoid scarring. A low-nitrogen cactus feed once in spring is plenty.",
    },
    californiaTip: "A natural fit for desert and inland Southern California gardens.",
    tags: ["desert", "spines", "water-wise"],
  },
  {
    id: "jade-plant",
    commonName: "Jade plant",
    scientificName: "Crassula ovata",
    category: "Succulents and cacti",
    summary: "A tree-like succulent with glossy, coin-shaped leaves.",
    light: "Bright light with some sun",
    water: "When the soil is dry",
    difficulty: "Easy",
    waterEveryDays: 14,
    feedEveryDays: 90,
    care: {
      simple: "Water when the soil is dry and keep it in a bright spot.",
      standard:
        "Water thoroughly when the soil is dry. Wrinkled leaves mean thirsty; soft, yellow leaves mean too wet.",
      advanced:
        "Prune in spring to shape a thick trunk. Winter stress (cool nights, sun) brings red edges and sometimes star-shaped flowers.",
    },
    californiaTip: "Grows into a shrub outdoors in frost-free gardens.",
    tags: ["money plant", "bonsai"],
  },
  // Herbs
  {
    id: "basil",
    commonName: "Sweet basil",
    scientificName: "Ocimum basilicum",
    category: "Herbs",
    summary: "Fragrant summer herb. Pinch often for bushy plants and more leaves.",
    light: "6+ hours of sun",
    water: "Keep evenly moist",
    difficulty: "Easy",
    waterEveryDays: 2,
    feedEveryDays: 21,
    care: {
      simple: "Sunny window, regular water. Pinch off the tops so it stays bushy.",
      standard:
        "Keep the soil evenly moist and pinch above a pair of leaves every week. Remove flower spikes to keep the leaves tasty.",
      advanced:
        "Harvest from the top down to the second node. Basil sulks below 10°C; feed lightly every 3 weeks for steady leaf growth.",
    },
    californiaTip: "Plant out after nights stay above 10°C, usually April to May.",
    tags: ["culinary", "annual", "pinching"],
  },
  {
    id: "rosemary",
    commonName: "Rosemary",
    scientificName: "Salvia rosmarinus",
    category: "Herbs",
    summary: "A tough, evergreen herb that loves sun and dry soil.",
    light: "Full sun",
    water: "Every 1 to 2 weeks once established",
    difficulty: "Easy",
    waterEveryDays: 10,
    feedEveryDays: null,
    care: {
      simple: "Lots of sun and not too much water. Snip sprigs whenever you cook.",
      standard:
        "Water deeply but infrequently. Trim after flowering to keep it compact and avoid cutting into old, bare wood.",
      advanced:
        "Needs sharp drainage; root rot is the main risk. In pots use a gritty mix and water when the top 5 cm is dry.",
    },
    californiaTip: "Drought tolerant and loved by bees across most California regions.",
    tags: ["culinary", "evergreen", "pollinators", "water-wise"],
  },
  {
    id: "mint",
    commonName: "Spearmint",
    scientificName: "Mentha spicata",
    category: "Herbs",
    summary: "Vigorous and refreshing. Best grown in its own pot.",
    light: "Sun to part shade",
    water: "Keep moist",
    difficulty: "Easy",
    waterEveryDays: 3,
    feedEveryDays: 30,
    care: {
      simple: "Keep it in a pot and water often. Cut it back when it gets leggy.",
      standard:
        "Mint spreads fast, so grow it in a container. Keep the soil moist and cut stems back by half in midsummer for fresh growth.",
      advanced:
        "Divide every 2 years to refresh vigour. Watch for rust (orange spots); remove affected stems and improve airflow.",
    },
    californiaTip: "Appreciates afternoon shade in hot inland summers.",
    tags: ["culinary", "tea", "spreading"],
  },
  {
    id: "thyme",
    commonName: "Common thyme",
    scientificName: "Thymus vulgaris",
    category: "Herbs",
    summary: "A low, woody herb for sunny edges and pots.",
    light: "Full sun",
    water: "When the soil is dry",
    difficulty: "Easy",
    waterEveryDays: 7,
    feedEveryDays: null,
    care: {
      simple: "Sunny spot, light watering. Trim after it flowers.",
      standard:
        "Water when the soil is dry and trim lightly after flowering to stop it going woody.",
      advanced:
        "Replace plants every 3 to 4 years as they lignify. Lean soil intensifies flavour; skip fertiliser.",
    },
    californiaTip: "Great between stepping stones in water-wise gardens.",
    tags: ["culinary", "ground cover", "water-wise"],
  },
  // Flowers
  {
    id: "lavender",
    commonName: "English lavender",
    scientificName: "Lavandula angustifolia",
    category: "Flowers",
    summary: "Silvery, scented shrublet with purple summer spikes.",
    light: "Full sun",
    water: "Every 1 to 2 weeks once established",
    difficulty: "Easy",
    waterEveryDays: 10,
    feedEveryDays: null,
    care: {
      simple: "Sun and good drainage. Cut off old flowers after they fade.",
      standard:
        "Water deeply but rarely once established. Shear by about a third after flowering to keep the plant tidy.",
      advanced:
        "Never cut into bare wood; leave some green on every stem. Avoid mulching right up to the crown to prevent rot.",
    },
    californiaTip: "Pairs well with California natives in low-water borders.",
    tags: ["fragrant", "pollinators", "water-wise"],
  },
  {
    id: "california-poppy",
    commonName: "California poppy",
    scientificName: "Eschscholzia californica",
    category: "Flowers",
    summary: "The state flower: bright orange cups that open in the sun.",
    light: "Full sun",
    water: "Rain-fed in winter; little summer water",
    difficulty: "Easy",
    waterEveryDays: 12,
    feedEveryDays: null,
    care: {
      simple: "Scatter seeds in autumn and let winter rain do the work.",
      standard:
        "Sow directly in autumn; poppies dislike transplanting. Little water is needed once they bloom.",
      advanced:
        "Let some seed pods ripen and split for next year's self-sown plants. Rich soil and extra water lead to floppy growth.",
    },
    californiaTip: "Native statewide; ideal for meadow strips and slopes.",
    tags: ["native", "state flower", "self-seeding"],
  },
  {
    id: "autumn-sage",
    commonName: "Autumn sage",
    scientificName: "Salvia greggii",
    category: "Flowers",
    summary: "Long-blooming, hummingbird-friendly flowers on a small shrub.",
    light: "Full sun to light shade",
    water: "Every 1 to 2 weeks",
    difficulty: "Easy",
    waterEveryDays: 9,
    feedEveryDays: null,
    care: {
      simple: "Sunny spot, occasional water. Trim it back in late winter.",
      standard:
        "Water every week or two in summer. Cut back by a third in late winter for a fresh flush of blooms.",
      advanced:
        "Deadhead lightly through the season to extend flowering from spring into autumn.",
    },
    californiaTip: "A hummingbird magnet in Southern California gardens.",
    tags: ["hummingbirds", "long blooming", "water-wise"],
  },
  // Vines and climbers
  {
    id: "star-jasmine",
    commonName: "Star jasmine",
    scientificName: "Trachelospermum jasminoides",
    category: "Vines and climbers",
    summary: "Evergreen climber with sweetly scented white flowers in spring.",
    light: "Sun to part shade",
    water: "Weekly in summer",
    difficulty: "Easy",
    waterEveryDays: 7,
    feedEveryDays: 60,
    care: {
      simple: "Give it a fence to climb and water weekly in summer.",
      standard:
        "Tie young stems to a support. Water weekly in warm weather and trim after flowering to keep it neat.",
      advanced:
        "Thin congested growth after bloom to improve airflow. A spring feed with a slow-release fertiliser supports flowering.",
    },
    californiaTip: "Widely grown on fences across coastal and valley gardens.",
    tags: ["fragrant", "evergreen", "fence"],
  },
  {
    id: "bougainvillea",
    commonName: "Bougainvillea",
    scientificName: "Bougainvillea spectabilis",
    category: "Vines and climbers",
    summary: "Vivid papery bracts that flourish in heat and sun.",
    light: "Full sun",
    water: "Deep, infrequent watering",
    difficulty: "Moderate",
    waterEveryDays: 10,
    feedEveryDays: 30,
    care: {
      simple: "Hot, sunny wall and not too much water. It flowers best a little dry.",
      standard:
        "Water deeply then let the soil dry. Prune after each bloom cycle; wear gloves because of the thorns.",
      advanced:
        "Mild water stress encourages flowering. Feed with a bloom fertiliser monthly in summer; avoid disturbing the roots when planting.",
    },
    californiaTip: "Flourishes in Southern California; may die back in Central Valley frosts.",
    tags: ["colour", "thorns", "heat"],
  },
  {
    id: "passion-vine",
    commonName: "Blue passion flower",
    scientificName: "Passiflora caerulea",
    category: "Vines and climbers",
    summary: "Intricate flowers and a vigorous habit; host plant for Gulf fritillary butterflies.",
    light: "Full sun",
    water: "Weekly in summer",
    difficulty: "Moderate",
    waterEveryDays: 7,
    feedEveryDays: 45,
    care: {
      simple: "Sunny trellis and weekly water. Trim it if it gets too big.",
      standard:
        "Water weekly in warm months and prune hard in early spring to control size.",
      advanced:
        "Caterpillars may chew the leaves; that is expected as it is a butterfly host. Feed with a balanced fertiliser every 6 weeks.",
    },
    californiaTip: "Supports Gulf fritillary butterflies throughout much of the state.",
    tags: ["butterflies", "flowering", "vigorous"],
  },
  // Shrubs
  {
    id: "manzanita",
    commonName: "Manzanita 'Howard McMinn'",
    scientificName: "Arctostaphylos densiflora",
    category: "Shrubs",
    summary: "California native with red bark and pink winter flowers.",
    light: "Full sun to part shade",
    water: "Monthly in summer once established",
    difficulty: "Moderate",
    waterEveryDays: 30,
    feedEveryDays: null,
    care: {
      simple: "Very little summer water and no fertiliser. Let it be.",
      standard:
        "Water monthly in the first summers, then rarely. Avoid overhead summer watering, which invites fungal problems.",
      advanced:
        "Needs excellent drainage and no added fertiliser. Prune only dead wood, just after flowering.",
    },
    californiaTip: "A native that supports early-season bees and hummingbirds.",
    tags: ["native", "red bark", "water-wise"],
  },
  {
    id: "ceanothus",
    commonName: "California lilac",
    scientificName: "Ceanothus 'Ray Hartman'",
    category: "Shrubs",
    summary: "A native shrub smothered in blue flowers each spring.",
    light: "Full sun",
    water: "Rare summer water once established",
    difficulty: "Moderate",
    waterEveryDays: 21,
    feedEveryDays: null,
    care: {
      simple: "Plant in sun and water rarely once it is settled.",
      standard:
        "Water through the first summer, then only occasionally. Tip-prune after flowering if needed.",
      advanced:
        "Short-lived if overwatered in summer heat. Avoid heavy pruning into old wood.",
    },
    californiaTip: "Native statewide and a pollinator favourite.",
    tags: ["native", "blue flowers", "pollinators"],
  },
  {
    id: "toyon",
    commonName: "Toyon",
    scientificName: "Heteromeles arbutifolia",
    category: "Shrubs",
    summary: "Evergreen native with white summer flowers and red winter berries.",
    light: "Sun to part shade",
    water: "Occasional deep water",
    difficulty: "Easy",
    waterEveryDays: 21,
    feedEveryDays: null,
    care: {
      simple: "Tough and easy. Water now and then in summer.",
      standard:
        "Water deeply every few weeks in summer while young. Berries feed birds in winter.",
      advanced:
        "Can be trained as a small tree by removing lower branches over a few seasons.",
    },
    californiaTip: "Also called California holly; great for wildlife hedges.",
    tags: ["native", "berries", "birds"],
  },
  // Trees
  {
    id: "olive",
    commonName: "Olive tree",
    scientificName: "Olea europaea",
    category: "Trees",
    summary: "Silvery, drought-tolerant Mediterranean tree with sculptural trunks.",
    light: "Full sun",
    water: "Deep water every 2 to 3 weeks in summer",
    difficulty: "Easy",
    waterEveryDays: 18,
    feedEveryDays: null,
    care: {
      simple: "Lots of sun and a deep drink every few weeks in summer.",
      standard:
        "Water deeply and infrequently. Prune in late winter to open the canopy and let light in.",
      advanced:
        "Thin crossing branches to improve airflow and reduce olive knot. Fruitless varieties avoid messy drop.",
    },
    californiaTip: "Thrives in most California climates outside the high mountains.",
    tags: ["mediterranean", "evergreen", "water-wise"],
  },
  {
    id: "japanese-maple",
    commonName: "Japanese maple",
    scientificName: "Acer palmatum",
    category: "Trees",
    summary: "Delicate, layered leaves with stunning autumn colour.",
    light: "Morning sun, afternoon shade",
    water: "Keep evenly moist",
    difficulty: "Moderate",
    waterEveryDays: 4,
    feedEveryDays: null,
    care: {
      simple: "Shade from hot afternoon sun and keep the soil moist.",
      standard:
        "Give it morning sun and afternoon shade. Water regularly and mulch to keep roots cool.",
      advanced:
        "Leaf scorch comes from heat, wind and salty water. Deep-water less often, leach salts and add shade cloth in heatwaves.",
    },
    californiaTip: "Needs afternoon shade in inland and Central Valley summers.",
    tags: ["autumn colour", "shade", "courtyard"],
  },
  {
    id: "coast-live-oak",
    commonName: "Coast live oak",
    scientificName: "Quercus agrifolia",
    category: "Trees",
    summary: "An iconic native evergreen oak that supports hundreds of species.",
    light: "Full sun",
    water: "No summer water once established",
    difficulty: "Easy",
    waterEveryDays: 30,
    feedEveryDays: null,
    care: {
      simple: "Plant it, water it while young, then leave it be.",
      standard:
        "Water young trees monthly in summer for 2 to 3 years. Keep irrigation and lawn away from the trunk.",
      advanced:
        "Summer water near the root crown invites oak root fungus. Leave leaf litter as natural mulch.",
    },
    californiaTip: "Native to coastal California; a cornerstone of local wildlife.",
    tags: ["native", "wildlife", "evergreen"],
  },
  // Aquatic plants
  {
    id: "water-lily",
    commonName: "Hardy water lily",
    scientificName: "Nymphaea 'Marliacea Chromatella'",
    category: "Aquatic plants",
    summary: "Floating pads and soft yellow flowers for still water.",
    light: "6+ hours of sun",
    water: "Keep the pond topped up",
    difficulty: "Moderate",
    waterEveryDays: 7,
    feedEveryDays: 30,
    care: {
      simple: "Lots of sun and keep the pond full. Remove old leaves.",
      standard:
        "Top up the pond weekly in summer and remove yellowing pads. Push an aquatic fertiliser tablet into the pot monthly.",
      advanced:
        "Plant in a wide basket 30 to 45 cm below the surface. Divide every 3 years when blooms decline.",
    },
    californiaTip: "Evaporation is high in summer; top up with rested water.",
    tags: ["pond", "flowering"],
  },
  {
    id: "papyrus",
    commonName: "Dwarf papyrus",
    scientificName: "Cyperus papyrus 'Nanus'",
    category: "Aquatic plants",
    summary: "Feathery heads on tall stems for pond edges and water bowls.",
    light: "Sun to part shade",
    water: "Keep roots in water",
    difficulty: "Easy",
    waterEveryDays: 5,
    feedEveryDays: 45,
    care: {
      simple: "Keep its feet wet. Cut off brown stems.",
      standard:
        "Stand the pot in 5 to 15 cm of water. Trim faded stems at the base to keep it fresh.",
      advanced:
        "Frost-tender: in colder regions overwinter indoors in a bright spot with the pot in a saucer of water.",
    },
    californiaTip: "Evergreen in frost-free coastal gardens.",
    tags: ["pond edge", "architectural"],
  },
  {
    id: "lotus",
    commonName: "Sacred lotus",
    scientificName: "Nelumbo nucifera",
    category: "Aquatic plants",
    summary: "Large round leaves and dramatic summer flowers above the water.",
    light: "Full sun",
    water: "Keep submerged",
    difficulty: "Challenging",
    waterEveryDays: 5,
    feedEveryDays: 21,
    care: {
      simple: "A big, sunny pot of water. Feed in summer.",
      standard:
        "Grow in a wide, round container in full sun. Feed every 3 weeks once aerial leaves appear.",
      advanced:
        "Tubers are fragile; plant horizontally without burying the growing tip. Stop feeding in late summer.",
    },
    californiaTip: "Loves Central Valley heat; blooms July to August.",
    tags: ["pond", "dramatic"],
  },
  // Vegetables
  {
    id: "tomato",
    commonName: "Tomato 'Early Girl'",
    scientificName: "Solanum lycopersicum",
    category: "Vegetables",
    summary: "A reliable, early-ripening tomato for California summers.",
    light: "Full sun",
    water: "Deep, regular watering",
    difficulty: "Moderate",
    waterEveryDays: 3,
    feedEveryDays: 14,
    care: {
      simple: "Sun, steady water and a cage to lean on.",
      standard:
        "Water deeply and regularly at the base. Feed every 2 weeks once flowers form and tie stems to a cage.",
      advanced:
        "Uneven watering causes blossom-end rot and cracking. Mulch, keep moisture steady and remove leaves touching the soil.",
    },
    californiaTip: "Plant after the last frost; many regions get two crops.",
    tags: ["summer", "edible", "raised bed"],
  },
  {
    id: "lettuce",
    commonName: "Butterhead lettuce",
    scientificName: "Lactuca sativa",
    category: "Vegetables",
    summary: "Tender cool-season leaves; harvest outer leaves as needed.",
    light: "Sun to part shade",
    water: "Keep evenly moist",
    difficulty: "Easy",
    waterEveryDays: 2,
    feedEveryDays: 21,
    care: {
      simple: "Cool spot, regular water. Pick outer leaves to eat.",
      standard:
        "Keep the soil evenly moist and harvest outer leaves. Sow a little every few weeks for a steady supply.",
      advanced:
        "Heat triggers bolting and bitterness. Grow autumn to spring, or with afternoon shade in summer.",
    },
    californiaTip: "Best sown September to March in most regions.",
    tags: ["cool season", "edible", "salad"],
  },
  {
    id: "zucchini",
    commonName: "Zucchini",
    scientificName: "Cucurbita pepo",
    category: "Vegetables",
    summary: "Fast, productive summer squash. One or two plants feed a household.",
    light: "Full sun",
    water: "Deep watering 2 to 3 times a week",
    difficulty: "Easy",
    waterEveryDays: 3,
    feedEveryDays: 21,
    care: {
      simple: "Sun and plenty of water. Pick them small and often.",
      standard:
        "Water at the base to avoid powdery mildew. Harvest at 15 to 20 cm for the best flavour.",
      advanced:
        "Hand-pollinate early flowers if fruit shrivels. Remove mildewed leaves and improve spacing.",
    },
    californiaTip: "Plant April to June; mildew is common in coastal fog.",
    tags: ["summer", "edible", "productive"],
  },
  {
    id: "bell-pepper",
    commonName: "Bell pepper",
    scientificName: "Capsicum annuum",
    category: "Vegetables",
    summary: "Sweet peppers that ripen from green to red in summer heat.",
    light: "Full sun",
    water: "Keep evenly moist",
    difficulty: "Moderate",
    waterEveryDays: 3,
    feedEveryDays: 21,
    care: {
      simple: "Warm, sunny spot and steady water.",
      standard:
        "Peppers love heat. Keep moisture even and support heavy plants with a stake.",
      advanced:
        "Night temperatures below 13°C slow fruit set. Feed lower-nitrogen once flowering begins.",
    },
    californiaTip: "Thrives in Central Valley and inland heat.",
    tags: ["summer", "edible"],
  },
  // Fruit
  {
    id: "meyer-lemon",
    commonName: "Meyer lemon",
    scientificName: "Citrus × meyeri",
    category: "Fruit",
    summary: "Sweet, fragrant lemons on a compact tree that suits pots.",
    light: "Full sun",
    water: "When the top 5 cm of soil is dry",
    difficulty: "Moderate",
    waterEveryDays: 5,
    feedEveryDays: 45,
    care: {
      simple: "Sunny spot, regular water and citrus food a few times a year.",
      standard:
        "Water when the top 5 cm is dry. Feed with citrus fertiliser in late winter, spring and summer.",
      advanced:
        "Yellowing between veins suggests low iron or magnesium; use a citrus feed with micronutrients. Remove suckers below the graft.",
    },
    californiaTip: "Fruits nearly year-round in coastal and Southern California.",
    tags: ["citrus", "container", "edible"],
  },
  {
    id: "fig",
    commonName: "Fig 'Black Mission'",
    scientificName: "Ficus carica",
    category: "Fruit",
    summary: "A classic California fig with sweet, dark fruit twice a year.",
    light: "Full sun",
    water: "Deep water every 1 to 2 weeks",
    difficulty: "Easy",
    waterEveryDays: 10,
    feedEveryDays: null,
    care: {
      simple: "Sunny spot and a deep drink every week or two in summer.",
      standard:
        "Water deeply every 1 to 2 weeks while fruiting. Prune lightly in winter to shape.",
      advanced:
        "Produces a spring breba crop and a main late-summer crop. Net against birds as fruit softens.",
    },
    californiaTip: "Brought by Spanish missions; thrives across the state.",
    tags: ["edible", "deciduous", "heritage"],
  },
  {
    id: "strawberry",
    commonName: "Strawberry 'Albion'",
    scientificName: "Fragaria × ananassa",
    category: "Fruit",
    summary: "Everbearing berries from spring to autumn in pots or beds.",
    light: "Full sun",
    water: "Keep evenly moist",
    difficulty: "Easy",
    waterEveryDays: 2,
    feedEveryDays: 21,
    care: {
      simple: "Sun and regular water. Pick berries when fully red.",
      standard:
        "Keep moist and mulch with straw to keep fruit clean. Remove runners to boost berries.",
      advanced:
        "Replace plants every 3 years. Watch for slugs and grey mould in damp weather.",
    },
    californiaTip: "'Albion' was bred in California for long seasons.",
    tags: ["edible", "container", "berries"],
  },
];

export function getSpecies(id: string): Species | undefined {
  return SPECIES.find((s) => s.id === id);
}

export function speciesImage(species: Species): string {
  return categoryDetail(species.category).image;
}

/** Case-insensitive search over names, category, summary and tags. */
export function matchesSearch(species: Species, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return [species.commonName, species.scientificName, species.category, species.summary, ...species.tags]
    .join(" ")
    .toLowerCase()
    .includes(q);
}
