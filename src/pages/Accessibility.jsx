import React from "react";
import { Accessibility as AccessibilityIcon } from "lucide-react";
import AyesmajLegalPage, { LegalSection, PolicyLink } from "@/components/ayesmaj/AyesmajLegalPage";
import { SITE } from "@/data/siteConfig";

export default function Accessibility() {
  return (
    <AyesmajLegalPage
      eyebrow="Access for everyone"
      title="Accessibility"
      intro="Cinematic should still be usable. We design the experience so more people can explore, understand, and connect."
      icon={AccessibilityIcon}
      accent="cyan"
      metaDescription={`Our commitment to an accessible ${SITE.name} website, what we have built in, and how to reach us with feedback.`}
      highlights={[
        "Keyboard navigation and visible focus are built in.",
        "Motion adapts to your reduced-motion preference.",
        "We welcome feedback and treat accessibility as ongoing work.",
      ]}
    >
      <LegalSection id="our-commitment" index={1} title="Our Commitment">
        <p>
          {SITE.legalName} builds cinematic, media-rich websites—and we believe that should never come at
          the cost of usability. We want everyone to browse this site, understand our work, and get in touch,
          regardless of ability or the technology they use. We aim toward WCAG 2.1 AA guidelines and treat
          accessibility as ongoing work, not a checkbox.
        </p>
      </LegalSection>

      <LegalSection id="built-in" index={2} title="What We’ve Built In">
        <ul>
          <li>Real HTML text throughout—headings, navigation, and body copy are never baked into images.</li>
          <li>Visible keyboard focus on links, buttons, and form fields, so the site can be navigated without a mouse.</li>
          <li>Respect for your system’s reduced-motion preference when <code>prefers-reduced-motion</code> is set.</li>
          <li>Alternative text on meaningful images, with fallbacks when media fails to load.</li>
          <li>A color palette chosen for readable contrast between text and background.</li>
          <li>Responsive layouts that reflow to any screen size without horizontal scrolling.</li>
        </ul>
      </LegalSection>

      <LegalSection id="limitations" index={3} title="Known Limitations">
        <p>We are honest about where the experience is not perfect yet:</p>
        <ul>
          <li>Some pages are heavy with video and 3D content, which can load slowly on limited connections or older devices.</li>
          <li>Not all video content has captions or transcripts yet.</li>
          <li>Some portfolio pieces are inherently visual; we are working on richer text descriptions for them.</li>
        </ul>
        <p>We review these limitations as the site evolves and prioritize fixes that unblock real visitors.</p>
      </LegalSection>

      <LegalSection id="feedback" index={4} title="Feedback">
        <p>
          If you hit a barrier anywhere on this site—something unreadable, unreachable by keyboard, or
          confusing with a screen reader—please tell us. Email <a href={`mailto:${SITE.email}`}>{SITE.email}</a>{' '}
          or use the <PolicyLink to="/Contact">Contact</PolicyLink> page, and include the page and what went wrong.
          We take reports seriously and will do our best to fix issues promptly.
        </p>
      </LegalSection>
    </AyesmajLegalPage>
  );
}
