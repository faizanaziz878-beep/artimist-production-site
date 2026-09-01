export type VisualScene = {
  src: string;
  label: string;
  detail: string;
};

export type VisualChapter = {
  code: string;
  slug: string;
  title: string;
  intro: string;
  scenes: VisualScene[];
};

function residentialScene(number: number, label: string, detail: string, corrected = false): VisualScene {
  return {
    src: `/media/residential/residential-${String(number).padStart(2, "0")}${corrected ? "-corrected" : ""}.webp`,
    label,
    detail,
  };
}

function atlasScene(number: number, label: string, detail: string): VisualScene {
  return {
    src: `/media/atlas/atlas-${String(number).padStart(2, "0")}.webp`,
    label,
    detail,
  };
}

export const residentialChapters: VisualChapter[] = [
  {
    code: "R / 01",
    slug: "courtyard-residence",
    title: "Courtyard Residence",
    intro: "A warm domestic sequence organized around planted voids, long sightlines and rooms made for real life.",
    scenes: [
      residentialScene(1, "Primary bedroom", "A restrained palette keeps attention on proportion and daylight."),
      residentialScene(2, "Dining & family room", "A private social pavilion places one generous dining table beside a quiet lounge and courtyard." , true),
      residentialScene(3, "Stair hall", "A continuous stone landing gives the sculptural stair a clear, buildable arrival.", true),
      residentialScene(4, "Courtyard living", "A double-height room frames the planted void at the center of the home."),
      residentialScene(5, "Living room", "Layered seating, soft stone and warm timber balance clarity with comfort."),
      residentialScene(6, "Kitchen", "A precise working space connected to the larger social volume."),
      residentialScene(7, "Evening dining", "The home shifts into a quieter, more intimate register after dark."),
      residentialScene(8, "Guest suite", "The same material language is reinterpreted at a more intimate scale."),
      residentialScene(9, "Dressing room", "Storage and display are integrated into the architectural rhythm."),
      residentialScene(10, "Primary bath", "Stone planes and controlled daylight create quiet depth."),
      residentialScene(11, "Study", "A focused room with residential softness and clear visual order."),
    ],
  },
  {
    code: "R / 02",
    slug: "forest-house",
    title: "Forest House",
    intro: "A quiet residence placed between tall trees, where architecture recedes and daylight becomes the main material.",
    scenes: [
      residentialScene(12, "Day arrival", "The house appears as a precise, low-key object within the landscape."),
      residentialScene(13, "Twilight elevation", "Warm interiors become lanterns beneath the tree canopy."),
      residentialScene(14, "Garden threshold", "Long horizontal lines hold the architecture close to the ground."),
      residentialScene(15, "Living room", "A framed view turns the forest into the room's fourth wall."),
      residentialScene(16, "Kitchen & dining", "The social heart opens directly toward the garden."),
      residentialScene(17, "Upper gallery", "A bridge carries movement through the tall central volume."),
      residentialScene(18, "Primary bedroom", "A private room tuned to morning light and filtered views."),
      residentialScene(19, "Quiet room", "Soft daylight closes the sequence at an intimate scale."),
    ],
  },
];

export const atlasChapters: VisualChapter[] = [
  {
    code: "A / 01",
    slug: "night-home-hospitality",
    title: "Night, home & hospitality",
    intro: "Five distinct environments where evening light, landscape and material warmth create atmosphere.",
    scenes: [
      atlasScene(1, "Bowl Stroke / Exterior", "Night arrival and architectural identity."),
      residentialScene(13, "Forest House / Twilight", "Warm interiors register as quiet lanterns beneath the tree canopy."),
      residentialScene(7, "Evening dining", "A domestic social room shifts into an intimate night register."),
      residentialScene(10, "Stone bath", "Water, stone and controlled light create restorative depth."),
      residentialScene(4, "Courtyard living", "A planted void anchors the double-height heart of the home."),
    ],
  },
  {
    code: "A / 02",
    slug: "public-futures",
    title: "Public futures",
    intro: "Civic, cultural and learning environments drawn around collective movement, landscape and light.",
    scenes: [
      atlasScene(6, "Civic horizon", "A public landmark shaped as a continuous silhouette."),
      atlasScene(7, "Cultural threshold", "Landscape and enclosure meet at a porous edge."),
      atlasScene(8, "Gathering hall", "A luminous public interior."),
      atlasScene(9, "Residential arrival", "A calm threshold at dusk."),
      atlasScene(10, "Water garden", "Architecture held within a planted field."),
      atlasScene(11, "Campus approach", "A civic sequence anchored by landscape."),
      atlasScene(12, "Campus courtyard", "Learning spaces organized around shared outdoor rooms."),
      atlasScene(13, "Campus interior", "Material, daylight and view in balance."),
      atlasScene(14, "Harmonic Horizons", "Aerial view of a landscape-led cultural campus."),
      atlasScene(15, "Performance interior", "A room tuned to sound, gathering and view."),
    ],
  },
  {
    code: "A / 03",
    slug: "campus-community-leisure",
    title: "Community, leisure & living",
    intro: "Connected environments where movement, landscape, hospitality and everyday life establish the architecture.",
    scenes: [
      atlasScene(16, "Community pavilion", "A low public building opening onto a generous planted approach."),
      atlasScene(17, "Arrival lobby", "Reception, material warmth and a clear line of movement."),
      atlasScene(18, "Evening boulevard", "A landscaped arrival sequence after dark."),
      atlasScene(19, "Landscape district", "Homes, paths and planting organized as one community field."),
      atlasScene(20, "Bowling hall", "Leisure, identity and social energy in a single interior."),
      atlasScene(21, "Residential interior", "A calm city-facing room with warm neutral materiality."),
      atlasScene(22, "Campus aerial", "A connected set of public rooms and shaded routes."),
      residentialScene(12, "Forest arrival", "A low horizontal house sits precisely between mature trees."),
      residentialScene(14, "Garden threshold", "Long roof lines hold the architecture close to the ground."),
      residentialScene(5, "Courtyard lounge", "Layered seating and soft stone balance clarity with comfort."),
      residentialScene(6, "Social kitchen", "A precise working room opens toward the larger living sequence."),
    ],
  },
  {
    code: "A / 04",
    slug: "retail-hospitality",
    title: "Retail & hospitality",
    intro: "Destination spaces made memorable through atmosphere, movement, display and clear visual identity.",
    scenes: [
      atlasScene(27, "Retail hall", "Display, circulation and an exposed industrial rhythm."),
      atlasScene(28, "Food atelier", "A warm counter and open kitchen shape the guest experience."),
      atlasScene(29, "Private retail room", "Display and hospitality overlap at a more intimate scale."),
      atlasScene(30, "Rooftop lounge", "A social room opened toward the horizon."),
      atlasScene(31, "Landscape lodge", "A crafted timber threshold beside the water."),
      atlasScene(32, "Lodge interior", "A warm room centered on landscape and gathering."),
    ],
  },
  {
    code: "A / 05",
    slug: "wellness-sport",
    title: "Wellness & sport",
    intro: "Five final destination studies where movement, water, planting and social life share the frame.",
    scenes: [
      atlasScene(33, "Wellness pavilion", "A luminous public building reflected in water."),
      atlasScene(34, "Padel garden", "Sport is framed as a planted social destination."),
      atlasScene(35, "Club lounge", "A dark, warm counterpoint to the active courts."),
      atlasScene(36, "Pool court", "Water and filtered daylight create a restorative room."),
      atlasScene(37, "Padel interior", "The archive closes inside a landscape-led sports hall."),
    ],
  },
];

// board-01 is intentionally excluded site-wide. The plate was retired from
// the public Artimist visual archive and should not be presented again.
export const technicalBoards: VisualScene[] = Array.from({ length: 20 }, (_, index) => {
  const boardNumber = index + 2;
  return {
    src: `/media/technical/board-${String(boardNumber).padStart(2, "0")}.webp`,
    label: boardNumber < 8 ? "Parametric Pavilion" : boardNumber < 16 ? "Kinetic Origami Roof" : "Architectural Systems",
    detail: `Technical plate ${String(boardNumber).padStart(2, "0")} / 21`,
  };
});

export const residentialSceneCount = residentialChapters.reduce((total, chapter) => total + chapter.scenes.length, 0);
export const atlasSceneCount = atlasChapters.reduce((total, chapter) => total + chapter.scenes.length, 0);