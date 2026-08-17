import React from "react";
import { Cookie } from "lucide-react";
import AyesmajLegalPage, { LegalSection, PolicyLink } from "@/components/ayesmaj/AyesmajLegalPage";
import { SITE, PROCESSORS } from "@/data/siteConfig";

export default function Cookies() {
  return (
    <AyesmajLegalPage
      eyebrow="Simple by choice"
      title="Cookie Policy"
      intro="No ad tracking. No mysterious data trail. Here is exactly what this website stores and why."
      icon={Cookie}
      accent="rose"
      metaDescription={`${SITE.name} uses no advertising or tracking cookies—here is exactly what the site stores and why.`}
      highlights={[
        "No advertising, analytics, or cross-site tracking cookies.",
        "Functional storage contains no personal identifiers.",
        "You can clear browser storage at any time.",
      ]}
    >
      <LegalSection id="short-version" index={1} title="The Short Version">
        <p>
          This site uses <strong>no advertising, analytics, or cross-site tracking cookies</strong>. We do
          not profile visitors, and we do not share browsing data with ad networks. That is why you will
          not see a cookie consent banner here—there is nothing non-essential to consent to.
        </p>
      </LegalSection>

      <LegalSection id="functional-storage" index={2} title="Functional Storage Only">
        <p>
          The site may use a small amount of functional browser storage (localStorage) strictly to make the
          interface work—for example, remembering interface state between pages. This storage:
        </p>
        <ul>
          <li>contains no personal identifiers,</li>
          <li>is never used for advertising or tracking, and</li>
          <li>stays in your browser—it is not transmitted to us or anyone else.</li>
        </ul>
      </LegalSection>

      <LegalSection id="third-party" index={3} title="Media & Infrastructure">
        <p>
          Parts of this site are delivered by third-party infrastructure. In particular, video content is
          streamed from a content delivery network. When your browser loads a page or plays a video, it makes
          a direct request to these services, which—as a technical necessity—see your IP address. The services are:
        </p>
        <ul>
          {PROCESSORS.map((processor) => (
            <li key={processor.name}><strong>{processor.name}</strong> — {processor.purpose}</li>
          ))}
        </ul>
        <p>None of these services set advertising or tracking cookies on our behalf.</p>
      </LegalSection>

      <LegalSection id="managing-storage" index={4} title="Managing Storage">
        <p>
          You can clear localStorage and cookies at any time through your browser settings. The site will
          keep working normally afterwards.
        </p>
      </LegalSection>

      <LegalSection id="changes-contact" index={5} title="Changes & Contact">
        <p>
          If our use of cookies or storage ever changes, we will update this page. For how we handle personal
          information more broadly, see our <PolicyLink to="/Privacy">Privacy Policy</PolicyLink>. Questions?{' '}
          Email <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
        </p>
      </LegalSection>
    </AyesmajLegalPage>
  );
}
