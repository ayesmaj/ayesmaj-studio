/**
 * pages.config.js - Page routing configuration
 * 
 * This file is AUTO-GENERATED. Do not add imports or modify PAGES manually.
 * Pages are auto-registered when you create files in the ./pages/ folder.
 * 
 * THE ONLY EDITABLE VALUE: mainPage
 * This controls which page is the landing page (shown when users visit the app).
 * 
 * Example file structure:
 * 
 *   import HomePage from './pages/HomePage';
 *   import Dashboard from './pages/Dashboard';
 *   import Settings from './pages/Settings';
 *   
 *   export const PAGES = {
 *       "HomePage": HomePage,
 *       "Dashboard": Dashboard,
 *       "Settings": Settings,
 *   }
 *   
 *   export const pagesConfig = {
 *       mainPage: "HomePage",
 *       Pages: PAGES,
 *   };
 * 
 * Example with Layout (wraps all pages):
 *
 *   import Home from './pages/Home';
 *   import Settings from './pages/Settings';
 *   import __Layout from './Layout.jsx';
 *
 *   export const PAGES = {
 *       "Home": Home,
 *       "Settings": Settings,
 *   }
 *
 *   export const pagesConfig = {
 *       mainPage: "Home",
 *       Pages: PAGES,
 *       Layout: __Layout,
 *   };
 *
 * To change the main page from HomePage to Dashboard, use find_replace:
 *   Old: mainPage: "HomePage",
 *   New: mainPage: "Dashboard",
 *
 * The mainPage value must match a key in the PAGES object exactly.
 */
import { lazy } from 'react';

const About = lazy(() => import('./pages/About'));
const Animations = lazy(() => import('./pages/Animations'));
const BrandDetail = lazy(() => import('./pages/BrandDetail'));
const Branding = lazy(() => import('./pages/Branding'));
const BrandingCaseStudy = lazy(() => import('./pages/BrandingCaseStudy'));
const Brands = lazy(() => import('./pages/Brands'));
const Clients = lazy(() => import('./pages/Clients'));
const Contact = lazy(() => import('./pages/Contact'));
const Home = lazy(() => import('./pages/Home'));
const Pricing = lazy(() => import('./pages/Pricing'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const Reel = lazy(() => import('./pages/Reel'));
const ServiceAnimation = lazy(() => import('./pages/ServiceAnimation'));
const Services = lazy(() => import('./pages/Services'));
const System = lazy(() => import('./pages/System'));
const WebExperiences = lazy(() => import('./pages/WebExperiences'));
const AiMarketing = lazy(() => import('./pages/AiMarketing'));
const Worlds3D = lazy(() => import('./pages/Worlds3D'));
const Work = lazy(() => import('./pages/Work'));
const AiVideos = lazy(() => import('./pages/AiVideos'));
const AiPosts = lazy(() => import('./pages/AiPosts'));
const Storyboards = lazy(() => import('./pages/Storyboards'));
const Studio = lazy(() => import('./pages/Studio'));
const ServiceBranding = lazy(() => import('./pages/ServiceBranding'));
const Insights = lazy(() => import('./pages/Insights'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const Cookies = lazy(() => import('./pages/Cookies'));
const Accessibility = lazy(() => import('./pages/Accessibility'));
const Faq = lazy(() => import('./pages/Faq'));
import __Layout from './Layout.jsx';


export const PAGES = {
    "About": About,
    "Animations": Animations,
    "BrandDetail": BrandDetail,
    "Branding": Branding,
    "BrandingCaseStudy": BrandingCaseStudy,
    "Brands": Brands,
    "Clients": Clients,
    "Contact": Contact,
    "Home": Home,
    "Pricing": Pricing,
    "ProjectDetail": ProjectDetail,
    "Reel": Reel,
    "ServiceAnimation": ServiceAnimation,
    "Services": Services,
    "System": System,
    "WebExperiences": WebExperiences,
    "AiMarketing": AiMarketing,
    "Worlds3D": Worlds3D,
    "Work": Work,
    "AiVideos": AiVideos,
    "AiPosts": AiPosts,
    "Storyboards": Storyboards,
    "ServiceBranding": ServiceBranding,
    "Insights": Insights,
    "Studio": Studio,
    "Privacy": Privacy,
    "Terms": Terms,
    "Cookies": Cookies,
    "Accessibility": Accessibility,
    "Faq": Faq,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};