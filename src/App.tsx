import React, { useState } from 'react';
import './globals.css';
import TitleBar from './components/layout/TitleBar.tsx';
import { AppSidebar } from './components/layout/AppSidebar.tsx';

// Import all pages
import HomePage from './components/pages/Home.tsx';
import DashboardPage from './components/pages/Dashboard.tsx';
import ProfilePage from './components/pages/Profile.tsx';
import SettingsPage from './components/pages/Settings.tsx';
import HelpPage from './components/pages/Help.tsx';
import FaqPage from './components/pages/Faq.tsx';
import ContactPage from './components/pages/Contact.tsx';
import AboutPage from './components/pages/About.tsx';

// Page mapping
const pageComponents: Record<string, React.ComponentType> = {
  home: HomePage,
  dashboard: DashboardPage,
  profile: ProfilePage,
  settings: SettingsPage,
  help: HelpPage,
  faq: FaqPage,
  contact: ContactPage,
  about: AboutPage,
};

function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
  };

  const CurrentPageComponent = pageComponents[currentPage] || HomePage;

  return (
    <div className="app-container">
      <TitleBar />
      <div className="flex">
        <AppSidebar 
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
        <main 
          className="flex-1 overflow-auto" 
          style={{ 
            backgroundColor: '#EAF4F4', 
            height: 'calc(100vh - 60px)',
            marginLeft: '60px' // Matches collapsed sidebar width
          }}
        >
          <CurrentPageComponent />
        </main>
      </div>
    </div>
  );
}

export default App;
