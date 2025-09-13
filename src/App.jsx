import React, { useEffect, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingScreen from "components/LoadingScreen/LoadingScreen";
import MainLayout from "layouts/MainLayout";
import { useTheme } from "hooks/useTheme";
import { useLoadingManager } from "hooks/useLoadingManager";
import { publicRoutes } from "router";

import ScrollToTopOnNavigate from "components/Scroll/ScrollToTopOnNavigate/ScrollToTopOnNavigate";
import ScrollToTop from "components/Scroll/ScrollToTop/ScrollToTop";
import "styles/App.scss";
import NotFound from "pages/NotFound";


function App() {
  const [theme, toggleTheme] = useTheme("dark");
  
  // Define loading tasks for the portfolio
  const loadingTasks = [
    { id: 'theme', name: 'Theme', description: 'Loading theme settings...' },
    { id: 'components', name: 'Components', description: 'Loading components...' },
    { id: 'routes', name: 'Routes', description: 'Preparing routes...' },
    { id: 'assets', name: 'Assets', description: 'Loading assets...' },
    { id: 'finalize', name: 'Finalize', description: 'Finalizing portfolio...' }
  ];

  const {
    isLoading,
    progress,
    currentTask,
    completeTask,
    updateTaskProgress
  } = useLoadingManager(loadingTasks);

  useEffect(() => {
    if (!isLoading) return;

    const loadSequentially = async () => {
      // Load theme
      updateTaskProgress('theme', 100);
      await new Promise(resolve => setTimeout(resolve, 200));
      completeTask('theme');

      // Load components
      updateTaskProgress('components', 50);
      await new Promise(resolve => setTimeout(resolve, 300));
      updateTaskProgress('components', 100);
      completeTask('components');

      // Prepare routes
      updateTaskProgress('routes', 100);
      await new Promise(resolve => setTimeout(resolve, 200));
      completeTask('routes');

      // Load assets
      updateTaskProgress('assets', 70);
      await new Promise(resolve => setTimeout(resolve, 250));
      updateTaskProgress('assets', 100);
      completeTask('assets');

      // Finalize
      updateTaskProgress('finalize', 100);
      await new Promise(resolve => setTimeout(resolve, 150));
      completeTask('finalize');
    };

    loadSequentially();
  }, [isLoading, completeTask, updateTaskProgress]);

  if (isLoading) {
    return (
      <LoadingScreen 
        isLoading={isLoading}
        progress={progress}
        currentTask={currentTask}
        onComplete={() => console.log('Portfolio loaded successfully!')}
      />
    );
  }

  // Render main portfolio view with React Router
  return (
    <Router>
      <ScrollToTopOnNavigate />
      <ScrollToTop />
      {/* Single Suspense wrapper (fallback null to tránh double loading) */}
      <Suspense fallback={null}>
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
