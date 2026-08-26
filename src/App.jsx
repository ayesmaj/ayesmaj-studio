import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { pagesConfig } from './pages.config'
import { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

const { Pages, Layout, mainPage } = pagesConfig;
const mainPageKey = mainPage ?? Object.keys(Pages)[0];
const MainPage = mainPageKey ? Pages[mainPageKey] : () => null;

const LayoutWrapper = ({ children, currentPageName }) => Layout
  ? <Layout currentPageName={currentPageName}>{children}</Layout>
  : <>{children}</>;

// Cinematic page transition — no filter/blur so position:fixed nav is never affected
const pageVariants = {
  initial: { opacity: 0, y: 12 },
  enter:   { opacity: 1, y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, y: -8,
    transition: { duration: 0.35, ease: [0.4, 0, 1, 1] } },
};

/* Unknown URLs are served the prerendered HOMEPAGE shell by the vercel.json
   catch-all rewrite, so their raw HTML arrives with the homepage canonical and
   index,follow - a soft 404 that Search Console surfaced as "Duplicate without
   user-selected canonical". A real 404 status is not possible behind the SPA
   rewrite without breaking client-only routes, so this applies the minimum
   Google honours at render time: a real title, noindex, and no inherited
   canonical. Removing the canonical is safe - Seo recreates it on the next
   page (its upsert creates the link element when missing). */
function NotFound() {
  useEffect(() => {
    document.title = 'Page not found | AYESMAJ Studios';
    document.head.querySelector('link[rel="canonical"]')?.remove();
    let robots = document.head.querySelector('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement('meta');
      robots.setAttribute('name', 'robots');
      document.head.appendChild(robots);
    }
    robots.setAttribute('content', 'noindex,nofollow');
    /* Cleanup matters: ~15 routed pages (About, Studio, Branding, Reel, the
       legal pages...) set only document.title and never render <Seo>, so
       without this a 404 -> SPA-navigate leaves them noindex for the whole
       session. AnimatePresence mode="wait" unmounts this before the next
       page's Seo effect runs, so pages that DO manage robots still win. */
    return () => { robots.setAttribute('content', 'index,follow'); };
  }, []);
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',
      height: '100vh', color: '#fff', background: '#0B0F0C' }}>
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: 80, lineHeight: 1 }}>404</p>
        <p style={{ color: 'rgba(255,255,255,0.4)' }}>Page not found</p>
        <a href="/" style={{ color: '#D8B75A', textDecoration: 'none', fontWeight: 600 }}>
          Back to the homepage
        </a>
      </div>
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname + location.search}
        variants={pageVariants}
        initial="initial"
        animate="enter"
        exit="exit"
        style={{ minHeight: '100vh' }}
      >
        {/* Pages are lazy-loaded (see pages.config.js), so a route change can
            suspend. The fallback is a plain block in the site background so a
            slow chunk reads as a pause, not a white flash. */}
        <Suspense fallback={<div style={{ minHeight: '100vh', background: '#0B0F0C' }} />}>
        <Routes location={location}>
          <Route path="/" element={
            <LayoutWrapper currentPageName={mainPageKey}>
              <MainPage />
            </LayoutWrapper>
          } />
          {[
            ["/services", "Services"],
            ["/services/branding", "ServiceBranding"],
            ["/services/web-design", "WebExperiences"],
            ["/services/ai-content", "AiMarketing"],
            ["/services/3d-cgi", "Worlds3D"],
            ["/services/motion-vfx", "AiVideos"],
            ["/services/storyboards", "Storyboards"],
            ["/interior-design", "InteriorDesign"],
            ["/interior-design/kitchens", "InteriorKitchens"],
            ["/interior-design/bathrooms", "InteriorBathrooms"],
            ["/he/interior-design/bathrooms", "InteriorBathroomsHe"],
            ["/interior-design/furniture-decor", "InteriorFurnitureDecor"],
            ["/interior-design/apartments", "InteriorApartments"],
            ["/interior-design/homes", "InteriorHomes"],
            ["/interior-design/buildings", "InteriorBuildings"],
            ["/interior-design/ai-scan-apartment", "InteriorAiScanApartment"],
            ["/interior-design/ai-scan-house", "InteriorAiScanHouse"],
            ["/interior-design/3d-floor-plan-apartment", "Interior3dPlanApartment"],
            ["/interior-design/3d-floor-plan-house", "Interior3dPlanHouse"],
            ["/interior-design/3d-building-visualization", "Interior3dBuilding"],
            ["/interior-design/ai-video-apartment", "InteriorAiVideoApartment"],
            ["/interior-design/ai-video-house", "InteriorAiVideoHouse"],
            ["/interior-design/compare-visualization-methods", "InteriorCompare"],
            ["/interior-design/complete-visual-presentation", "InteriorCompletePresentation"],
            ["/interior-design/client-presentation", "InteriorClientPresentation"],
            ["/interior-design/case-studies", "InteriorCaseStudies"],
            ["/interior-design/case-studies/:slug", "InteriorCaseStudy"],
          ].map(([path, pageName]) => {
            const ServicePage = Pages[pageName];
            return ServicePage ? (
              <Route
                key={path}
                path={path}
                element={
                  <LayoutWrapper currentPageName={pageName}>
                    <ServicePage />
                  </LayoutWrapper>
                }
              />
            ) : null;
          })}
          {Object.entries(Pages).map(([pageName, Page]) => (
            <Route
              key={pageName}
              path={`/${pageName}`}
              element={
                <LayoutWrapper currentPageName={pageName}>
                  <Page />
                </LayoutWrapper>
              }
            />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <Router>
        <AnimatedRoutes />
        <Toaster />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
