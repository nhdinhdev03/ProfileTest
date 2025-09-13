import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "layouts/MainLayout";
import { useTheme } from "hooks/useTheme";
import { publicRoutes } from "router";

import ScrollToTopOnNavigate from "components/Scroll/ScrollToTopOnNavigate/ScrollToTopOnNavigate";
import ScrollToTop from "components/Scroll/ScrollToTop/ScrollToTop";
import PageTransition from "components/PageTransition/PageTransition";
import LoadingSpinner from "components/Loading/LoadingSpinner";
import "styles/App.scss";
import NotFound from "pages/NotFound";

// Import i18n configuration
import "./i18n";


function App() {
  const [theme, toggleTheme] = useTheme("dark");

  // Render main portfolio view with React Router
  return (
    <Router>
      <ScrollToTopOnNavigate />
      <ScrollToTop />
      <Suspense 
        fallback={
          <div style={{ 
            minHeight: '100vh', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            background: 'var(--bg-primary)' 
          }}>
            <LoadingSpinner 
              message="Loading page..." 
              size="medium" 
              variant="truck"
              mobileOptimized={true}
            />
          </div>
        }
      >
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            const LayoutComponent = route.layout ?? MainLayout; // fallback
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <LayoutComponent theme={theme} toggleTheme={toggleTheme}>
                    <PageTransition>
                      <Page />
                    </PageTransition>
                  </LayoutComponent>
                }
              />
            );
          })}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
