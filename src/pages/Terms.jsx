import React from "react";
import { FileText } from "lucide-react";
import AyesmajLegalPage, { LegalSection, PolicyLink } from "@/components/ayesmaj/AyesmajLegalPage";
import { SITE } from "@/data/siteConfig";

export default function Terms() {
  return (
    <AyesmajLegalPage
      eyebrow="Studio terms"
      title="Terms of Use"
      intro="The essentials for browsing our work and beginning a project together—written for people, not paperwork."
      icon={FileText}
      accent="gold"
      metaDescription={`The terms that govern use of the ${SITE.name} website and our project engagements.`}
      highlights={[
        "Our portfolio and creative work remain protected.",
        "Every commissioned project gets its own written agreement.",
        "Pricing shown online is an indicative starting point.",
      ]}
      note={`This is a general template — have it reviewed for your jurisdiction (${SITE.jurisdiction}).`}
    >
      <LegalSection id="using-this-site" index={1} title="Using This Site">
        <p>
          Welcome to the website of {SITE.legalName}, a creative studio based in {SITE.location}. By browsing
          this site you agree to these terms. You may view the site for personal use and to evaluate working
          with us. You may not scrape, disrupt, attempt to gain unauthorized access to the site, or republish
          its content as your own.
        </p>
      </LegalSection>

      <LegalSection id="intellectual-property" index={2} title="Intellectual Property">
        <p>
          All content on this site—including portfolio work, imagery, video, 3D renders, animations, text,
          and the design of the site itself—is the property of {SITE.legalName} or of the clients for whom
          the work was created. It may not be copied, reproduced, or used commercially without prior written
          permission. Client names and trademarks shown in our portfolio belong to their respective owners
          and appear solely to document work performed.
        </p>
      </LegalSection>

      <LegalSection id="project-engagements" index={3} title="Project Engagements">
        <p>This website is informational. Commissioning work happens through a direct conversation:</p>
        <ul>
          <li>Quotes are provided individually via the <PolicyLink to="/Contact">Contact</PolicyLink> page.</li>
          <li>Each engagement has its own written proposal or agreement covering scope, price, timeline, and deliverables.</li>
          <li>Figures on our <PolicyLink to="/Pricing">Pricing</PolicyLink> page are indicative starting points, not binding offers.</li>
        </ul>
      </LegalSection>

      <LegalSection id="no-warranties" index={4} title="No Warranties">
        <p>
          The site and its content are provided &quot;as is&quot; and &quot;as available.&quot; We work to keep information current
          and accurate, but we make no warranties of any kind, express or implied, about the completeness or
          reliability of the site.
        </p>
      </LegalSection>

      <LegalSection id="limitation-liability" index={5} title="Limitation of Liability">
        <p>
          To the maximum extent permitted by law, {SITE.legalName} shall not be liable for any indirect,
          incidental, or consequential damages arising from your use of, or inability to use, this website.
          Nothing in these terms limits liability that cannot be limited under applicable law.
        </p>
      </LegalSection>

      <LegalSection id="governing-law" index={6} title="Governing Law">
        <p>
          These terms are governed by the laws of {SITE.jurisdiction}, without regard to conflict-of-law
          principles. Any disputes arising from these terms will be handled in the courts of that jurisdiction.
        </p>
      </LegalSection>

      <LegalSection id="changes" index={7} title="Changes to These Terms">
        <p>
          We may update these terms from time to time. The date at the top of this page shows the latest
          revision. Continued use of the site after changes are posted constitutes acceptance of the updated terms.
        </p>
      </LegalSection>

      <LegalSection id="contact" index={8} title="Contact">
        <p>
          Questions about these terms? Email <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or reach out
          through the <PolicyLink to="/Contact">Contact</PolicyLink> page.
        </p>
      </LegalSection>
    </AyesmajLegalPage>
  );
}
