import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const LEGACY_SLUGS = {
  'ashe-ritual-roast': 'ashe',
  'ashe-product-reveal': 'ashe',
  'ashe-full-campaign': 'ashe',
  'boom-chicka-pop-strawberry': 'boom-chica',
  'boom-chicka-pop-lemon-cream': 'boom-chica',
  'boom-chicka-pop-choc-fudge': 'boom-chica',
  'character-design': 'characters',
  'noam-audio': 'noam',
  blenday: 'blenday',
};

/** Redirect the retired case-study template into the unified brand system. */
export default function BrandingCaseStudy() {
  const { search } = useLocation();
  const slug = new URLSearchParams(search).get('slug');
  const canonicalSlug = LEGACY_SLUGS[slug] || slug;

  return canonicalSlug
    ? <Navigate replace to={`/BrandDetail?slug=${encodeURIComponent(canonicalSlug)}`} />
    : <Navigate replace to="/Branding" />;
}
