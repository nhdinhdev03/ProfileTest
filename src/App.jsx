import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoadingScreen from "components/LoadingScreen/LoadingScreen";
import MainLayout from "layouts/MainLayout";
import { useTheme } from "hooks/useTheme";
import { publicRoutes } from "router";
import { ROUTES } from "router/routeConstants";
import ScrollToTopOnNavigate from "components/Scroll/ScrollToTopOnNavigate/ScrollToTopOnNavigate";
import ScrollToTop from "components/Scroll/ScrollToTop/ScrollToTop";
import "styles/App.scss";

function App() {
  const [theme, toggleTheme] = useTheme("dark");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Shorter loading time for better UX
    setTimeout(() => setIsLoading(false), 1200);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  // Render main portfolio view with React Router
  return (
    <Router>
      {/* Thêm ScrollToTopOnNavigate component để tự động cuộn lên đầu trang khi chuyển trang */}
      <ScrollToTopOnNavigate />
      {/* Thêm ScrollToTop để hiển thị nút cuộn lên đầu trang khi người dùng cuộn xuống */}
      <ScrollToTop />
      <Routes>
        {publicRoutes.map((route, index) => {
          const Page = route.component;
          const Layout = route.layout || MainLayout;
          
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout theme={theme} toggleTheme={toggleTheme}>
                  <Page />
                </Layout>
              }
            />
          );
        })}
        {/* Redirect to home if no match */}
        <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
      </Routes>
    </Router>
  );
}

export default App;
