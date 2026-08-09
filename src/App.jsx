import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { pagesConfig } from './pages.config'
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
          <Route path="*" element={
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',
              height: '100vh', color: '#fff', background: '#0B0F0C' }}>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: 80, lineHeight: 1 }}>404</p>
                <p style={{ color: 'rgba(255,255,255,0.4)' }}>Page not found</p>
              </div>
            </div>
          } />
        </Routes>
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
