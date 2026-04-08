const WordArray = [

  // ─── 3-LETTER WORDS (easy, very visual) ──────────────────────────
  "ant", "ape", "arm", "axe",
  "bag", "bat", "bed", "bee", "bow", "box", "bug", "bus", "bun",
  "cab", "can", "cap", "car", "cat", "cop", "cow", "cup",
  "dog", "dot", "ear", "egg", "eye",
  "fan", "fin", "fly", "fox",
  "gem", "gun",
  "hat", "hen", "hug",
  "jar", "jaw", "jet", "jug",
  "key", "leg", "lip", "log",
  "map", "mop", "mug",
  "net", "oar", "owl",
  "pan", "paw", "pea", "pen", "pig", "pin", "pot",
  "rat", "rod", "rug", "sun",
  "tap", "tie", "toe", "top",
  "van", "web", "wig",
  "yam", "zip", "zoo",

  // ─── 4-LETTER WORDS ───────────────────────────────────────────────

  // Animals
  "bear", "bird", "bull", "calf", "crab", "deer", "duck",
  "flea", "frog", "goat", "hare", "hawk", "lamb", "lion", "mole",
  "moth", "mule", "slug", "swan", "toad", "wolf", "worm", "wren",

  // Food & Drink
  "bean", "beef", "beer", "beet", "cake", "clam", "corn",
  "date", "fish", "kiwi",
  "lamb", "leek", "lime", "milk", "mint", "pear",
  "peas", "plum", "pork", "rice", "roll",
  "sage", "soup", "taco", "tart", "tuna",

  // Objects / Tools
  "bell", "belt", "bike", "bolt", "bomb", "bone", "book",
  "boot", "bowl", "bulb", "cane", "cape", "cart", "clip", "club",
  "coat", "comb", "cord", "cork", "cuff", "dart", "desk",
  "dish", "dock", "dome", "door", "drum", "flag",
  "fork", "gate", "gear", "gown",
  "harp", "hive", "hook", "horn", "hose", "iron",
  "kite", "knob", "lamp", "lace", "lens", "lock", "loom",
  "mask", "mast", "mitt", "nail", "oven",
  "pail", "pipe", "plug", "pump", "rack", "rake", "ring", "rope",
  "sail", "sock", "sofa", "sled", "tray",
  "tuba", "tube", "vase", "vest", "wand", "well", "whip", "wire",

  // Body Parts
  "back", "chin", "claw", "foot", "fist", "hair", "hand",
  "head", "heel", "knee", "lips", "nail", "neck", "nose",
  "palm", "shin", "skin", "tail", "wing",

  // Nature / Places / Weather
  "arch", "cave", "cove", "dune", "dust", "farm",
  "fire", "foam", "hill", "isle",
  "lake", "lava", "leaf", "mist", "moon", "moss",
  "peak", "pond", "rain", "reef", "rock", "sand", "seed", "snow",
  "star", "stem", "surf", "tide", "tree", "vine", "wave", "wind",

  // Actions (drawable)
  "bite", "blow", "chop", "clap", "cook",
  "dive", "draw", "drop", "fall", "grab",
  "hide", "jump", "kick", "knit", "leap", "lift",
  "pour", "pull", "push", "ride", "roll",
  "sing", "skip", "slam", "swim",
  "toss", "walk", "wave", "wink",

  // ─── 5-LETTER WORDS ───────────────────────────────────────────────

  // Animals
  "bison", "cobra", "crane", "eagle", "gecko", "goose", "hippo",
  "horse", "hyena", "llama", "lemur", "moose", "mouse", "otter",
  "panda", "quail", "raven", "rhino", "shark", "sheep",
  "skunk", "sloth", "snail", "snake", "squid", "stork", "tiger",
  "trout", "viper", "whale", "zebra",

  // Food & Drinks
  "apple", "bacon", "bagel", "bread", "broth", "candy", "chips",
  "cocoa", "cream", "donut", "grape", "gravy", "guava", "honey",
  "juice", "lemon", "mango", "melon", "nacho", "olive", "onion",
  "pasta", "peach", "pizza", "prawn", "salad",
  "sauce", "sushi", "syrup", "toast", "wafer",

  // Clothing / Accessories
  "apron", "beret", "boots", "cloak", "dress",
  "glove", "jeans", "scarf", "shawl", "shirt",
  "shoes", "skirt", "socks", "tiara",

  // Objects / Household
  "alarm", "anvil", "arrow", "badge", "banjo", "basin", "blade",
  "broom", "brush", "canoe", "chair", "chest", "clock",
  "crate", "crown", "easel", "fence", "flute", "frame",
  "globe", "grill", "ladle", "lance",
  "lever", "light", "medal", "mixer",
  "pedal", "piano", "plank", "plate",
  "purse", "quilt", "razor", "shelf",
  "sieve", "spade", "spear",
  "stamp", "stool", "stove", "sword", "table", "torch",
  "tongs", "wheel", "whisk",

  // Nature / Outdoor
  "beach", "brook", "cloud", "coral",
  "creek", "daisy", "delta",
  "field", "flame", "flood", "frost", "grass", "grove", "hedge",
  "holly", "maple", "ocean", "petal", "plant", "poppy",
  "river", "shore", "spray", "storm", "swamp", "thorn", "trail",
  "trunk", "tulip",

  // People / Characters
  "angel", "boxer", "bride", "chief", "clown", "coach", "devil",
  "diver", "fairy", "giant", "ghost", "guard", "ninja", "nurse",
  "pilot", "pirate", "queen", "rider", "robot", "saint", "scout",
  "witch",

  // Actions / Verbs (drawable)
  "blink", "blush", "brush", "build", "carry", "catch",
  "chase", "cheer", "climb", "crawl", "dance",
  "drink", "drive", "drown", "float",
  "growl", "kneel", "laugh", "march", "paint", "plant", "point",
  "punch", "reach", "shoot", "shout", "skate", "sleep",
  "slide", "smell", "snore", "spray", "stand", "stomp",
  "throw", "twist", "watch", "write", "yawn",

  // ─── 6-LETTER WORDS ───────────────────────────────────────────────

  // Animals
  "badger", "beaver", "beetle", "canary", "donkey", "falcon",
  "ferret", "iguana", "jaguar", "lizard", "magpie",
  "monkey", "osprey", "parrot", "pigeon", "rabbit",
  "salmon", "spider", "toucan", "turkey", "turtle", "walrus",
  "weasel",

  // Food & Drinks
  "almond", "banana", "butter", "carrot", "celery",
  "cherry", "cookie", "garlic", "ginger", "hotdog",
  "lentil", "lobster","muffin", "noodle", "oyster", "pickle",
  "potato", "pretzel","radish", "raisin", "shrimp", "squash",
  "tomato", "turnip", "waffle", "walnut", "yogurt",

  // Clothing / Accessories
  "bonnet", "buckle", "button", "collar",
  "gloves", "hoodie", "jacket", "kimono", "mitten", "tuxedo",
  "ribbon", "sandal", "turban", "zipper",

  // Objects / Tools / Household
  "anchor", "basket", "bottle", "bucket", "candle", "cannon",
  "carpet", "castle", "cradle", "dagger",
  "hammer", "ladder", "magnet", "mirror",
  "needle", "paddle", "pillow",
  "puppet", "rocket", "saddle", "shield",
  "shovel", "sickle", "sponge", "statue",
  "teapot", "thread", "thimble","wallet", "wrench",

  // Nature / Places / Weather
  "bridge", "cactus", "canyon", "cavern",
  "crater", "desert", "forest", "flower", "garden", "geyser",
  "grotto", "jungle", "lagoon", "meadow",
  "meteor", "puddle", "rapids", "valley", "seaweed",
  "shadow", "stream", "sunset", "tunnel",
  "volcano","willow",

  // People / Characters
  "archer", "artist", "barber", "butler", "cowboy", "doctor",
  "farmer", "jester", "knight", "pirate", "potter",
  "prince", "ranger", "sailor", "skater", "surfer", "viking",
  "wizard",

  // Actions / Verbs (drawable)
  "bowing", "boxing", "crying", "digging",
  "hiding", "hopping","ironing","jogging","jumping","kicking",
  "kissing","melting","pouring","pulling",
  "rowing",  "skating","skiing", "sleeping",
  "smiling","surfing", "typing",  "waving",
  "writing","yawning",

];

export const getRandomWords = (count = 3) => {
  const shuffled = [...WordArray].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export default WordArray;