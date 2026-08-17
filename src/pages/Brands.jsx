import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

/**
 * Legacy route kept for old bookmarks. The canonical brand portfolio now
 * lives at /Branding, so visitors never have to choose between two galleries.
 */
export default function Brands() {
  const { search } = useLocation();
  return <Navigate replace to={`/Branding${search}`} />;
}
