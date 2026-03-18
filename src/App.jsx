import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { pagesConfig } from './pages.config'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const { Pages, Layout, mainPage } = pagesConfig;
const mainPageKey = mainPage ?? Object.keys(Pages)[0];
const MainPage = mainPageKey ? Pages[mainPageKey] : () => null;

const LayoutWrapper = ({ children, currentPageName }) => Layout
  ? <Layout currentPageName={currentPageName}>{children}</Layout>
  : <>{children}</>;

function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <Router>
        <Routes>
          <Route path="/" element={
            <LayoutWrapper currentPageName={mainPageKey}>
              <MainPage />
            </LayoutWrapper>
          } />
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
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: '#fff', background: '#0B0F0C' }}>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: 80, lineHeight: 1 }}>404</p>
                <p style={{ color: 'rgba(255,255,255,0.4)' }}>Page not found</p>
              </div>
            </div>
          } />
        </Routes>
      </Router>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App
