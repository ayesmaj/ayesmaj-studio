/**
 * Hebrew copy for /he/interior-design/bathrooms.
 *
 * Transcreated (not translated) three ways, then each version was reviewed by a
 * Hebrew language editor, an Israeli interior architect checking trade
 * vocabulary, and a bidi typographer; a final editorial pass merged them.
 *
 * Voice rules held across the page:
 *  - Impersonal plural present (נוגעים, גוללים, רואים) for the reader, Hebrew
 *    infinitive for every CTA and every transform head. No אתם/לך/לכם — the
 *    audience is mixed, and Hebrew second person forces a gender.
 *  - Provenance labels stay literally accurate: "קונספט של הסטודיו", not
 *    "קונספט סטודיו" — in Israeli property Hebrew סטודיו reads as a studio
 *    APARTMENT, so the short form would advertise the wrong thing entirely.
 *  - "פרויקט ללקוח" for CLIENT PROJECT; the smichut "פרויקט לקוח" would make
 *    the client the author of the work.
 *
 * Two deliberate departures from the English source, both flagged to the owner:
 *  1. The five-stage ladder uses five distinct verbs (לצייר / לתכנן / לבנות /
 *     להלביש / להרגיש). English repeats "DESIGN IT." at stages 3 and 4; in
 *     Hebrew display type two identical giant words read as a bug, not a refrain.
 *  2. cmpBefore/cmpAfter stay חלל גולמי / חלל מוגמר rather than the architect's
 *     idiom מצב קיים / מצב מוצע. מצב קיים implies a survey of a room that was
 *     actually built and measured — a claim this studio does not make, and the
 *     caption itself says both frames are renders.
 */
export const T = {
  /* ── Hero ── */
  heroEyebrow: 'הדמיות חדרי רחצה',
  heroH1a: 'אבן.',
  heroH1b: 'מים.',
  heroH1c: 'אור.',
  heroCtaPrimary: 'לתכנן חדר רחצה',
  heroCtaGhost: 'לכיווני העיצוב',
  heroCredit: 'ארט דקו · קונספט של הסטודיו · אותו חדר לאורך העמוד',
  sampleTravertine: 'טרוורטין',
  sampleEmerald: 'ירוק אמרלד',
  sampleBrass: 'פליז',
  sampleBlush: 'ורוד פודרה',
  sampleGlass: 'זכוכית',

  /* ── Transform ── */
  t1Label: 'סקיצה', t1Head: 'לצייר.', t1Line: 'הרעיון מתחיל בסקיצת עיפרון במחברת.',
  t2Label: 'תוכנית', t2Head: 'לתכנן.', t2Line: 'הסקיצה הופכת לתוכנית אדריכלית מדויקת.',
  t3Label: 'תלת-ממד', t3Head: 'לבנות.', t3Line: 'התוכנית קמה לגובה — מודל לבן, בלי חומרים.',
  t4Label: 'חומרים', t4Head: 'להלביש.', t4Line: 'אבן, לכה, פליז וקטיפה נכנסים לתמונה.',
  t5Label: 'תוצאה', t5Head: 'להרגיש.', t5Line: 'אותו חדר — עכשיו מרגישים את האור.',

  /* ── Decisions ── */
  decEyebrow: 'התכנון הוא המוצר',
  decH2a: 'כל חדר רחצה',
  decH2b: 'מתחיל בהחלטות.',
  decCapPlanA: 'התוכנית',
  decCapPlanB: 'קונספט של הסטודיו',
  decCapRoomA: 'החדר',
  decCapRoomB: 'אותן ההחלטות — עכשיו בנויות',
  hsVanity: 'ארון אמבטיה',
  hsShower: 'מקלחון',
  hsTub: 'אמבטיה',
  hsStorage: 'אחסון',
  hsLighting: 'תאורה',
  hsMaterial: 'גימורים',
  hsCirculation: 'צירי תנועה',

  /* ── Material board ── */
  matEyebrow: 'לוח החומרים',
  matH2a: 'נוגעים בחומר',
  matH2b: 'והחדר משתנה.',
  matTravertine: 'טרוורטין',
  matEmerald: 'לכה בירוק אמרלד',
  matBrass: 'פליז מוברש',
  matCalacatta: 'שיש קלקטה',
  matFluted: 'זכוכית מחורצת',
  matVelvet: 'קטיפה בגוון פודרה',
  /* Template, not a suffix. The six material names are mixed gender, so the
     grammatical subject is the fixed masculine noun החומר and the name only
     fills the slot — otherwise the verb would have to agree six ways. */
  matCapSuffix: '{m} — החומר שמכתיב את החדר',
  matCapTag: 'קונספט של הסטודיו · אותה אדריכלות',

  /* ── Types ── */
  typEyebrow: 'ארבעה חדרים, ארבעה תפקידים',
  typH2a: 'חדר רחצה הורים, שירותים,',
  typH2b: 'אורחים, מקלחת פתוחה.',
  typPrimaryLabel: 'חדר רחצה הורים', typPrimaryLine: 'הספא הפרטי של הבית.',
  typPowderLabel: 'חדר שירותים', typPowderLine: 'קופסת תכשיטים קטנה.',
  typGuestLabel: 'חדר רחצה לאורחים', typGuestLine: 'אלגנטי וקומפקטי.',
  /* "חדר רטוב" is a waterproofing category in Israeli construction, not a
     room type a client would ask for. מקלחת פתוחה is the room. */
  typWetLabel: 'מקלחת פתוחה', typWetLine: 'אמבטיה ומקלחת בחלל אחד.',
  typTagClient: 'פרויקט ללקוח · וילה עם בריכה',
  typTagStudio: 'קונספט של הסטודיו',
  typScrollHint: 'גוררים הצידה',

  /* ── Compare ── */
  cmpBefore: 'חלל גולמי',
  cmpAfter: 'חלל מוגמר',
  cmpDragHint: 'גוררים להשוואה',
  cmpLedeA: 'אותו חדר. אותה אדריכלות.',
  cmpLedeB: 'תחושה אחרת לגמרי.',
  cmpTag: 'חדר רחצה הורים, וילה עם בריכה · שתי התמונות הן הדמיה · אותה מצלמה',

  /* ── Film ── */
  filmCredit: 'גוללים · טייק אחד רציף · מהדלת אל הדמדומים · קונספט של הסטודיו, נוצר בעזרת בינה מלאכותית',
  filmStage1: 'בסטילס רואים את העיצוב.',
  filmStage2a: 'התנועה הופכת אותו',
  filmStage2b: 'לחוויה.',

  /* ── Directions ── */
  dirEyebrow: 'כיווני עיצוב',
  dirH2a: 'חדר רחצה אחד.',
  dirH2b: 'ארבעה עולמות.',
  dirArtDecoLabel: 'ארט דקו',
  dirArtDecoLine: 'לכה בירוק אמרלד, פליז ושיש צבעוני — זה העולם של העמוד הזה.',
  dirOrganicLabel: 'אורגני מודרני',
  dirOrganicLine: 'טרוורטין, אלון בהיר, אריחי זליג\' ופשתן — רך וחם.',
  dirMinimalLabel: 'מינימליזם יוקרתי',
  dirMinimalLine: 'אבן אחת, חיפוי אלון רציף, תאורה נסתרת — דיוק שקט.',
  dirMediterraneanLabel: 'ים תיכוני',
  dirMediterraneanLine: 'טיח סיד, טרקוטה, אבן מסותתת ושמש חדה.',
  dirTag: 'אותו חדר, אותה מצלמה · קונספט של הסטודיו',

  /* ── Chrome ── */
  navProjects: 'עבודות',
  navServices: 'תחומי פעילות',
  navContact: 'יצירת קשר',
  navCta: 'להתחיל פרויקט',
  navAria: 'ניווט ראשי',
  footTagline: 'הדמיות תלת-ממד לאדריכלות ולעיצוב פנים.',
  footRights: 'כל הזכויות שמורות.',
  langNote: 'English',

  /* ── Accessible section names ── */
  heroAria: 'הדמיות חדרי רחצה',
  samplesAria: 'דוגמאות חומרים',
  transformAria: 'מסקיצה לחדר גמור',

  /* ── SEO ──
     U+200F (RLM) sits immediately after the pipe: the browser tab and a search
     result resolve the title in an LTR base while the page resolves it in RTL,
     and the pipe is a bidi-neutral that would otherwise jump sides. */
  seoTitle: 'עיצוב והדמיה של חדרי אמבטיה |‏ AYESMAJ Studios',
  seoDescription:
    'תכנון חדרי רחצה, בחירת אבן וכלים סניטריים והדמיות תלת-ממד פוטוריאליסטיות — חדר רחצה הורים, חדר שירותים ומקלחת פתוחה, הכול נסגר עוד לפני הביצוע.',
};
