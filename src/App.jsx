import React, { memo } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "layouts/MainLayout";
import { useTheme } from "hooks/useTheme";
import { publicRoutes } from "router";

import ScrollToTopOnNavigate from "components/Scroll/ScrollToTopOnNavigate/ScrollToTopOnNavigate";
import ScrollToTop from "components/Scroll/ScrollToTop/ScrollToTop";
import PageTransition from "components/PageTransition/PageTransition";
import "styles/App.scss";
import NotFound from "pages/NotFound";

// Import i18n configuration
import "./i18n";

const App = memo(() => {
  // Không cần truyền initialTheme vì useTheme đã tự động đọc từ document/localStorage
  const [theme, toggleTheme] = useTheme();

  return (
    <Router>
      <ScrollToTopOnNavigate />
      <ScrollToTop />
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
    </Router>
  );
});

App.displayName = 'App';

export default App;
