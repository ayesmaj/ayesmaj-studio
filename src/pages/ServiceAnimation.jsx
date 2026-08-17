import React from 'react';
import { Navigate } from 'react-router-dom';

// Legacy service URL. Motion, film, VFX, and animation now share one
// canonical service/work destination so visitors never encounter two
// competing versions of the same offer.
export default function ServiceAnimation() {
  return <Navigate replace to="/AiVideos" />;
}
