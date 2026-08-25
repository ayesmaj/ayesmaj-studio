/**
 * Conversion tracking — one place for every "this visitor became a lead" signal.
 *
 * Two systems listen:
 *   GA4 (G-R044ZFNS4V)        — works immediately, no setup needed.
 *   Google Ads (AW-18408920292) — needs a conversion action created in the Ads UI first.
 *
 * TO FINISH THE ADS SIDE (5 minutes, once):
 *   Google Ads -> Goals -> Conversions -> New conversion action -> Website ->
 *   enter ayesmajstudios.com -> "Add a conversion action manually":
 *      Category: Submit lead form   Name: Contact form submit   Value: use a value (see below)
 *   Then "Use Google tag" -> it shows a snippet containing send_to: 'AW-18408920292/XXXXXXXX'.
 *   Copy the part after the slash into ADS_LABELS.lead below. Repeat for a "Phone call" action
 *   (Category: Contact) and paste that label into ADS_LABELS.phoneClick.
 *
 * Until a label is filled in, the Ads call is skipped silently and GA4 still records everything,
 * so nothing here can break the site or report a conversion that did not happen.
 */

const ADS_ID = 'AW-18408920292';

/** Paste the label that follows the slash in the Ads snippet, e.g. 'AbC-D_efGhIjKlM'. */
export const ADS_LABELS = {
  lead: '',        // contact form submitted
  phoneClick: '',  // tapped the phone number
};

/**
 * A lead is worth a real amount to the business even before it closes. Google's bidding gets
 * materially better when it can optimize toward value rather than raw count. This is a
 * placeholder average lead value — set it to your own number once you know it, or leave it:
 * it is only used for reporting, never shown to visitors.
 */
const LEAD_VALUE = { value: 100, currency: 'USD' };

const gtag = (...args) => {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag(...args);
};

function adsConversion(label, extra = {}) {
  if (!label) return; // conversion action not created yet — GA4 still has the event
  gtag('event', 'conversion', { send_to: `${ADS_ID}/${label}`, ...extra });
}

/** Contact form successfully submitted and the emails went out. */
export function trackLead(detail = {}) {
  gtag('event', 'generate_lead', {
    ...LEAD_VALUE,
    service: detail.service || 'unspecified',
    budget: detail.budget || 'unspecified',
    project_type: detail.projectType || 'unspecified',
  });
  adsConversion(ADS_LABELS.lead, LEAD_VALUE);
}

/** Visitor tapped the phone number (nav or footer). */
export function trackPhoneClick(where = 'unknown') {
  gtag('event', 'phone_click', { location: where });
  adsConversion(ADS_LABELS.phoneClick);
}

/** Visitor clicked a "Start a project" style CTA — a quality signal, not a conversion. */
export function trackCtaClick(where = 'unknown') {
  gtag('event', 'cta_click', { location: where });
}
