/**
 * interiorDesign — single source of copy + structure for the Interior Design
 * Visualization world (/interior-design and children).
 *
 * All page copy lives HERE, not in components, so the twelve pages keep one
 * voice. Pages import and lay out; they do not invent content.
 *
 * Teaching spine: every method answers a different question. Scan = what
 * exists. Plan = where things are. 3D = how it connects. Render = what it
 * looks like. Video = what it feels like. Presentation = why approve or buy.
 */

export const IDV_BASE = '/interior-design';

export const IDV_EYEBROW = 'AYESMAJ STUDIOS / INTERIOR DESIGN VISUALIZATION';

// ── The four stages ─────────────────────────────────────────────────────────
export const STAGES = [
  {
    num: '01',
    key: 'capture',
    title: 'Capture',
    question: 'What exists now?',
    methods: ['AI apartment scan', 'AI house scan', 'Existing-condition capture'],
  },
  {
    num: '02',
    key: 'understand',
    title: 'Understand',
    question: 'How is the space organized?',
    methods: ['2D plan', '3D floor plans', 'Building visualization'],
  },
  {
    num: '03',
    key: 'experience',
    title: 'Experience',
    question: 'What will it feel like?',
    methods: ['Interior renders', 'AI video', 'Cinematic walkthrough'],
  },
  {
    num: '04',
    key: 'present',
    title: 'Present',
    question: 'How should it be communicated and sold?',
    methods: ['Brand identity', 'Website', 'Client presentation', 'Sales deck', 'Social campaign'],
  },
];

// ── The methods ─────────────────────────────────────────────────────────────
export const METHODS = {
  'ai-scan-apartment': {
    num: '01',
    stage: 'capture',
    label: 'AI Apartment Scan',
    route: `${IDV_BASE}/ai-scan-apartment`,
    question: 'What exists now?',
    headline: 'Capture the apartment as it exists today.',
    intro:
      'An AI-assisted scan turns photos, video, or an existing plan of the apartment into a clean spatial foundation — rooms, openings, and general geometry — fast enough to use in the first client conversation.',
    needs: ['Phone photos or video of each room', 'Any existing plan, even hand-drawn', 'Approximate overall dimensions if available'],
    reveals: ['The rooms that exist and how they connect', 'Openings, windows, and general geometry', 'A clean base for planning and visualization'],
    limits: [
      'AI-assisted capture is a design and communication foundation — not engineering, permit, or survey certification.',
      'Key measurements must be verified on site before construction decisions.',
      'A scan describes what exists; it does not propose the design.',
    ],
    bestFor: ['Apartment renovation', 'Remote design work', 'Furniture planning', 'Early design direction', 'Existing-condition communication'],
    combineWith: ['3d-floor-plan-apartment', 'ai-video-apartment'],
    cta: 'Scan my apartment project',
    workflow: ['SOURCE', 'SCAN', 'CLEAN PLAN', 'ROOM DETECTION', '3D BASE'],
  },
  'ai-scan-house': {
    num: '01',
    stage: 'capture',
    label: 'AI House Scan',
    route: `${IDV_BASE}/ai-scan-house`,
    question: 'What exists now?',
    headline: 'Turn the existing house into a clear visual foundation.',
    intro:
      'A house capture covers more than rooms: floors, garage, yard, pool, and the building footprint become one coherent picture the whole project can build on.',
    needs: ['Photos or video, inside and out', 'Existing plans if any survive', 'Lot boundaries or a rough site sketch'],
    reveals: ['Main and upper floors as one system', 'Garage, yard, pool, and openings', 'The building footprint in context'],
    limits: [
      'AI-assisted capture is a design and communication foundation — not engineering, permit, or survey certification.',
      'Structural assumptions must be confirmed by professionals before work begins.',
    ],
    bestFor: ['Whole-house renovation', 'Additions and extensions', 'Pre-purchase visualization', 'Existing-condition records'],
    combineWith: ['3d-floor-plan-house', 'ai-video-house', 'complete-visual-presentation'],
    cta: 'Scan my house project',
    workflow: ['SOURCE', 'SCAN', 'FLOORS', 'FOOTPRINT', '3D BASE'],
  },
  '3d-floor-plan-apartment': {
    num: '02',
    stage: 'understand',
    label: '3D Apartment Floor Plan',
    route: `${IDV_BASE}/3d-floor-plan-apartment`,
    question: 'How do the rooms connect?',
    headline: 'See the complete apartment in one glance.',
    intro:
      'A furnished 3D floor plan shows what a 2D drawing cannot: how furniture actually fits, how rooms flow into each other, and how daily life would move through the space.',
    needs: ['A plan, a scan, or both', 'The intended furniture direction', 'Priorities: storage, work, hosting, family'],
    reveals: ['Furniture at true scale', 'Circulation between rooms', 'Storage and kitchen relationships', 'Bedroom privacy and balcony connection'],
    limits: [
      'A 3D floor plan communicates the design; it does not replace construction documentation.',
      'Material and lighting decisions belong to renders and film, not the plan.',
    ],
    bestFor: ['Interior designers presenting layouts', 'Apartment owners approving a renovation', 'Rental and sales visualization', 'Furniture planning'],
    combineWith: ['ai-scan-apartment', 'ai-video-apartment'],
    cta: 'Create my 3D apartment plan',
    workflow: ['2D PLAN', '3D TOP-DOWN', 'FURNISHED', 'ROOM VIEWS'],
  },
  '3d-floor-plan-house': {
    num: '02',
    stage: 'understand',
    label: '3D House Floor Plan',
    route: `${IDV_BASE}/3d-floor-plan-house`,
    question: 'How does the whole home work?',
    headline: 'Understand the entire home before entering a room.',
    intro:
      'Multi-level living is hard to read from flat drawings. A 3D house plan shows public and private zones, the garage-to-kitchen route, stair alignment, and how indoor living meets the pool and yard.',
    needs: ['Plans or a house scan', 'Level heights and stair positions', 'Outdoor priorities: pool, lounge, kitchen'],
    reveals: ['Public versus private zones', 'Multi-level relationships and stair alignment', 'Garage-to-house route', 'Pool, balcony, and outdoor living connections'],
    limits: [
      'This communicates the design. It does not replace structural, engineering, or permit documentation.',
    ],
    bestFor: ['New-build homes', 'Whole-house renovations', 'Luxury listings', 'Client layout approval'],
    combineWith: ['ai-scan-house', 'ai-video-house', '3d-building-visualization'],
    cta: 'Visualize my complete house',
    workflow: ['GROUND FLOOR', 'UPPER FLOOR', 'WHOLE HOUSE', 'OUTDOOR LIVING'],
  },
  '3d-building-visualization': {
    num: '02',
    stage: 'understand',
    label: '3D Building Visualization',
    route: `${IDV_BASE}/3d-building-visualization`,
    question: 'What is the scale of the project?',
    headline: 'Show the scale before showing the unit.',
    intro:
      'For buildings and developments, the story starts above the unit: the full volume, the exploded levels, where a residence sits, and what the lobby, amenities, and roof promise.',
    needs: ['Massing or architectural model', 'Unit mix and level plans', 'The identity the project should carry'],
    reveals: ['The full building and its levels', 'Where each unit lives in the volume', 'Lobby, amenities, parking, and roof', 'The exterior identity buyers remember'],
    limits: [
      'Building visualization presents the project; sales and permit documentation remain the authority on specifications.',
    ],
    bestFor: ['Architects', 'Developers', 'Investors', 'Multi-family projects', 'Real-estate sales teams'],
    combineWith: ['3d-floor-plan-apartment', 'ai-video-apartment', 'complete-visual-presentation'],
    cta: 'Build my development presentation',
    workflow: ['FULL BUILDING', 'EXPLODED LEVELS', 'UNIT LOCATION', 'AMENITIES', 'IDENTITY'],
  },
  'ai-video-apartment': {
    num: '03',
    stage: 'experience',
    label: 'AI Apartment Video',
    route: `${IDV_BASE}/ai-video-apartment`,
    question: 'What will it feel like?',
    headline: 'Turn the apartment plan into a journey.',
    intro:
      'Movement is what plans and stills cannot give. An apartment film walks the client from the living room to the balcony and lets them feel sequence, light, and atmosphere before anything is built.',
    needs: ['Approved room imagery as first and last frames', 'A locked plan as the spatial source of truth', 'The mood the film should carry'],
    reveals: ['Movement and room sequence', 'Light across the day', 'Atmosphere and material feel', 'Social-ready vertical cuts'],
    limits: [
      'Video is not measurement documentation — plans remain the spatial source of truth.',
      'Strong source imagery is required; the film cannot rescue a weak base.',
      'Architecture stays locked: the film moves the camera, not the walls.',
    ],
    bestFor: ['Renovation approval', 'Rental and sales listings', 'Instagram and social campaigns', 'Design-reveal moments'],
    combineWith: ['3d-floor-plan-apartment', 'complete-visual-presentation'],
    cta: 'Create my apartment film',
    workflow: ['PLAN', 'LIVING', 'KITCHEN', 'BEDROOM', 'BATHROOM', 'BALCONY'],
  },
  'ai-video-house': {
    num: '03',
    stage: 'experience',
    label: 'AI House Video',
    route: `${IDV_BASE}/ai-video-house`,
    question: 'What will living here feel like?',
    headline: 'Show the life between the rooms.',
    intro:
      'A house film is about arrival and flow: the approach, the entry, the stair, the primary suite, and the moment the living room opens to the pool. It sells the life, not the drawing.',
    needs: ['The house plan and approved key frames', 'A locked architectural base', 'The audience: owner, buyer, or investor'],
    reveals: ['Arrival and entry sequence', 'Flow between levels and rooms', 'Indoor-outdoor transitions', 'The emotional value of the whole property'],
    limits: [
      'Video is not measurement documentation — plans remain the spatial source of truth.',
      'Architecture stays locked; the film never redesigns the house.',
    ],
    bestFor: ['Luxury-home presentation', 'Homeowner approval', 'Real-estate marketing', 'Website heroes', 'Investor storytelling'],
    combineWith: ['3d-floor-plan-house', 'complete-visual-presentation'],
    cta: 'Create my house film',
    workflow: ['FLOOR PLAN', 'EXTERIOR', 'ENTRY', 'LIVING', 'KITCHEN', 'STAIR', 'PRIMARY SUITE', 'BALCONY', 'OUTDOOR LOUNGE', 'POOL', 'FINAL HOME'],
  },
  'complete-visual-presentation': {
    num: '04',
    stage: 'present',
    label: 'Complete Visual Presentation',
    route: `${IDV_BASE}/complete-visual-presentation`,
    question: 'Why should the client approve, buy, or invest?',
    headline: 'From one plan to a complete visual campaign.',
    intro:
      'Visualization wins understanding; presentation wins decisions. Identity, website, deck, and social content turn the visuals into a system built for approval, sales, and launch.',
    needs: ['The visual assets from earlier stages', 'The audience and the decision at stake', 'Launch or presentation deadline'],
    reveals: ['One identity across every touchpoint', 'A presentation built for the decision moment', 'Launch-ready web and social assets'],
    limits: [
      'The system is modular — no project is forced to take every deliverable.',
    ],
    bestFor: ['Project launches', 'Investor and buyer presentations', 'Design-studio client decks', 'Development marketing'],
    combineWith: ['ai-video-house', '3d-building-visualization'],
    cta: 'Build my complete presentation',
    workflow: ['DISCOVER', 'CAPTURE', 'VISUALIZE', 'EXPERIENCE', 'BRAND', 'PRESENT', 'MARKET'],
  },
};

export const METHOD_ORDER = [
  'ai-scan-apartment',
  'ai-scan-house',
  '3d-floor-plan-apartment',
  '3d-floor-plan-house',
  '3d-building-visualization',
  'ai-video-apartment',
  'ai-video-house',
  'complete-visual-presentation',
];

// ── The communication problem (hub section 2) ───────────────────────────────
export const COMMUNICATION_GAP = {
  headline: 'The design may be clear to you. That does not mean the client can see it.',
  copy:
    'Designers read scale, circulation, proportion, and material from plans. Most clients see lines, symbols, and uncertainty. Visualization closes that gap before expensive revisions begin.',
  designer: ['Scale', 'Circulation', 'Material', 'Proportion', 'Sequence', 'Technical intent'],
  client: [
    'The complete room',
    'How furniture fits',
    'How spaces connect',
    'What the materials feel like',
    'What changes between options',
    'What the final result could become',
  ],
};

// ── "Which is best?" comparison (hub section 6 + compare page) ──────────────
export const COMPARISON = [
  { dim: 'Speed', note: 'Scans are fastest; plans follow; renders and film take the most care.', best: 'ai-scan-apartment' },
  { dim: 'Spatial clarity', note: 'Nothing beats a furnished 3D floor plan for understanding the whole layout at once.', best: '3d-floor-plan-house' },
  { dim: 'Visual realism', note: 'Photorealistic renders carry material, light, and atmosphere.', best: 'ai-video-apartment' },
  { dim: 'Emotional impact', note: 'Film wins. Movement and sequence create the feeling of already living there.', best: 'ai-video-house' },
  { dim: 'Editability', note: 'Plans change cheapest. Every approved plan change saves ten expensive render changes.', best: '3d-floor-plan-apartment' },
  { dim: 'Technical reliability', note: 'The plan is the spatial source of truth; scans and films defer to it.', best: '3d-floor-plan-house' },
  { dim: 'Best early in a project', note: 'Scan first. Capture reality before proposing anything.', best: 'ai-scan-house' },
  { dim: 'Best at the decision moment', note: 'Presentation systems: film plus deck plus identity close approvals.', best: 'complete-visual-presentation' },
  { dim: 'Best for buildings', note: 'Scale first — building visualization before unit plans.', best: '3d-building-visualization' },
];

export const COMPARISON_VERDICT = {
  question: 'Which method is best?',
  answer: 'None of them alone.',
  copy: 'The right method depends on what the client needs to understand next. The strongest presentations combine the right methods in the right order.',
};

// ── Client journey (hub section 7) ──────────────────────────────────────────
export const JOURNEY = [
  { stage: 'Early conversation', use: ['Scan', 'Existing-condition plan', 'References'], point: 'Agree on what exists before proposing anything.' },
  { stage: 'Layout approval', use: ['2D plan', '3D floor plan', 'Furniture arrangement'], point: 'Approve the bones while change is still cheap.' },
  { stage: 'Design approval', use: ['Photorealistic room images', 'Materials', 'Before-and-after'], point: 'Let the client see the finished room, not imagine it.' },
  { stage: 'Final presentation', use: ['Cinematic video', 'Website', 'Branded presentation'], point: 'Deliver the project as an experience, not a folder of files.' },
  { stage: 'Sales or investment', use: ['Building visualization', 'Property film', 'Investor experience'], point: 'Give buyers and investors a world to believe in.' },
];

// ── Why AYESMAJ (hub section 8) ─────────────────────────────────────────────
export const CAPABILITIES = [
  { title: 'Spatial visualization', items: ['Scans', 'Floor plans', '3D floor plans', 'Interior visualization', 'Building visualization'] },
  { title: 'Cinematic content', items: ['AI video', 'Motion', 'Camera transitions', 'Walkthroughs', 'Social films'] },
  { title: 'Branding', items: ['Naming', 'Logo', 'Typography', 'Color', 'Project identity'] },
  { title: 'Digital experience', items: ['Website', 'Interactive presentation', 'Client portal', 'Investor page'] },
  { title: 'Marketing', items: ['Campaign imagery', 'Social media', 'Sales deck', 'Property presentation', 'Launch assets'] },
];

// ── Recommender (hub section 18 + compare page) ─────────────────────────────
export const GOALS = [
  { key: 'existing', label: 'Understand the existing property', stack: ['ai-scan-house', '3d-floor-plan-house'] },
  { key: 'layout', label: 'Approve a new layout', stack: ['3d-floor-plan-apartment', 'ai-scan-apartment'] },
  { key: 'furniture', label: 'Plan furniture and circulation', stack: ['3d-floor-plan-apartment'] },
  { key: 'materials', label: 'Approve interior materials', stack: ['3d-floor-plan-apartment', 'ai-video-apartment'] },
  { key: 'house', label: 'Present a complete house', stack: ['ai-scan-house', '3d-floor-plan-house', 'ai-video-house'] },
  { key: 'emotion', label: 'Create the emotional experience', stack: ['ai-video-house', 'complete-visual-presentation'] },
  { key: 'building', label: 'Explain a building or development', stack: ['3d-building-visualization', '3d-floor-plan-apartment', 'ai-video-apartment'] },
  { key: 'sales', label: 'Build a sales or investor presentation', stack: ['3d-building-visualization', 'ai-video-house', 'complete-visual-presentation'] },
];

// ── Case studies ────────────────────────────────────────────────────────────
export const CASE_STUDIES = [
  {
    slug: 'poolside-villa',
    name: 'Poolside Villa',
    kind: 'New-build house',
    audience: 'Homeowners approving a complete design direction',
    challenge:
      'Two flat floor plans had to become a home the owners could walk through in their minds — every room, both levels, and the pool terrace that ties the house together.',
    methods: ['House plan set', 'Room-by-room master frames', 'Cinematic sequence direction'],
    why:
      'The plans anchor the geometry; twenty-nine master frames walk the full sequence from ground floor to pool at water level, in one consistent architecture.',
    system: ['Floor plans', '29-frame visual sequence', 'Film-ready storyboard'],
  },
  {
    slug: 'maison-valmont',
    name: 'Maison Valmont',
    kind: 'Renovation and restoration',
    audience: 'Owners deciding whether a full restoration is worth it',
    challenge:
      'The value of a restoration is invisible in the ruined rooms. The owners needed to see the same salon, dining room, and entrance restored — and the road between the two states.',
    methods: ['Existing-condition capture', 'Before-and-after room pairs', 'Eight-stage process sequence', 'Transformation film'],
    why:
      'Before-and-after pairs make the decision tangible; the staged process shows the path; the film delivers the reveal.',
    system: ['Before/after sets', 'Process sequence', 'Transformation film', 'Detail gallery'],
  },
  {
    slug: 'the-patel',
    name: 'The Patel',
    kind: 'Residential development',
    audience: 'Buyers and investors evaluating a Miami tower',
    challenge:
      'A development sells twice: the building at skyline scale, then the individual residence. Both stories needed one identity.',
    methods: ['Building visualization', 'Unit floor plan and interiors', 'Brand identity', 'Cinematic hero films'],
    why:
      'Scale first — the tower in its Miami light — then the drill-down into Residence 1802 with its own plan and rooms, carried by one brand.',
    system: ['Tower and environment renders', 'Unit plan + room set', 'Desktop and mobile films', 'Project identity'],
  },
];

// ── Final CTA ───────────────────────────────────────────────────────────────
export const FINAL_CTA = {
  headline: 'The project already exists in your mind. Let the client see it.',
  copy:
    'Send a floor plan, scan, 3D model, reference image, or early idea. We will turn it into a complete visual presentation built for understanding, approval, and impact.',
  primary: { label: 'Start an Interior Design Project', to: '/Contact' },
  secondary: { label: 'View Case Studies', to: `${IDV_BASE}/case-studies` },
};
