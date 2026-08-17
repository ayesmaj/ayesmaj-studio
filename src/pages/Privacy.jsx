import React from "react";
import { ShieldCheck } from "lucide-react";
import AyesmajLegalPage, { LegalSection, PolicyLink } from "@/components/ayesmaj/AyesmajLegalPage";
import { SITE, PROCESSORS } from "@/data/siteConfig";

export default function Privacy() {
  return (
    <AyesmajLegalPage
      eyebrow="Privacy & data"
      title="Privacy Policy"
      intro="Your ideas are personal. This is the plain-language view of what we collect, why we need it, and how we protect it."
      icon={ShieldCheck}
      accent="violet"
      metaDescription={`How ${SITE.name} collects, uses, and protects your information.`}
      highlights={[
        "We collect only the information you choose to send us.",
        "We do not sell your data or build advertising profiles.",
        "You can ask to access, correct, or delete your information.",
      ]}
      note={`This is a general template — have it reviewed for your jurisdiction (${SITE.jurisdiction}).`}
    >
      <LegalSection id="who-we-are" index={1} title="Who We Are">
        <p>
          {SITE.legalName} is a creative studio based in {SITE.location}. This policy explains what
          information we collect when you use our website, why we collect it, and the choices you have.
          If anything here is unclear, email us at <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
        </p>
      </LegalSection>

      <LegalSection id="information-we-collect" index={2} title="Information We Collect">
        <p>
          The only personal information we actively collect is what you choose to send us through the
          contact form on our <PolicyLink to="/Contact">Contact</PolicyLink> page:
        </p>
        <ul>
          <li>Your name</li>
          <li>Your email address</li>
          <li>Your phone number (optional)</li>
          <li>Your company, project needs, timeline, budget, and project brief</li>
        </ul>
        <p>
          Like any website, our hosting infrastructure also processes basic technical data (such as IP
          address and browser type) to deliver pages securely. We do not run user accounts and we do not
          collect payment details through this website.
        </p>
      </LegalSection>

      <LegalSection id="how-we-use-information" index={3} title="How We Use Your Information">
        <p>
          We use the information you send us to respond to your inquiry, prepare quotes, and deliver
          projects you commission. We do not sell your data, and we do not use it to build advertising
          profiles.
        </p>
      </LegalSection>

      <LegalSection id="service-providers" index={4} title="Service Providers">
        <p>
          We rely on a small number of third-party services to operate this site. Each one processes only
          the data needed for its purpose:
        </p>
        <div className="ayz-policy-table-wrap">
          <table className="ayz-policy-table">
            <thead><tr><th scope="col">Processor</th><th scope="col">Purpose</th></tr></thead>
            <tbody>
              {PROCESSORS.map((processor) => (
                <tr key={processor.name}><td>{processor.name}</td><td>{processor.purpose}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </LegalSection>

      <LegalSection id="cookies-tracking" index={5} title="Cookies & Tracking">
        <p>
          This site does not use advertising or cross-site tracking cookies, and we do not run third-party
          analytics trackers. For the full details of what the site stores in your browser, see our{' '}
          <PolicyLink to="/Cookies">Cookie Policy</PolicyLink>.
        </p>
      </LegalSection>

      <LegalSection id="data-retention" index={6} title="Data Retention">
        <p>
          We keep correspondence only as long as needed to handle your inquiry and meet ordinary business
          and legal record-keeping obligations. If you would like your messages deleted, email us and we
          will remove them.
        </p>
      </LegalSection>

      <LegalSection id="your-rights" index={7} title="Your Rights">
        <p>
          You can ask us at any time to access, correct, or delete the personal information we hold about
          you, or to stop contacting you. Send your request to <a href={`mailto:${SITE.email}`}>{SITE.email}</a>{' '}
          and we will respond promptly.
        </p>
      </LegalSection>

      <LegalSection id="contact" index={8} title="Contact">
        <p>
          Questions about this policy? Email <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or reach out
          through the <PolicyLink to="/Contact">Contact</PolicyLink> page.
        </p>
      </LegalSection>
    </AyesmajLegalPage>
  );
}
