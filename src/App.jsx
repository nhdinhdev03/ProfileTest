import React, { useState, useEffect, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import MainLayout from "./Layouts/MainLayout";
import { useTheme } from "./hooks/useTheme";
import { smoothScrollTo } from "./utils/scroll";
import { publicRoutes } from "./router";
import { ROUTES } from "./router/routeConstants";
import "./styles/App.scss";

function App() {
  const [theme, toggleTheme] = useTheme("dark");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Shorter loading time for better UX
    setTimeout(() => setIsLoading(false), 1500);
  }, []);



  if (isLoading) {
    return <LoadingScreen />;
  }

  // Render main portfolio view with React Router
  return (
    <Router>
      <Suspense
        fallback={
          <div className="loading-section">
            <motion.div
              className="loading-spinner"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <div className="spinner"></div>
            </motion.div>
          </div>
        }
      >
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
      </Suspense>
    </Router>
  );
}

export default App;
