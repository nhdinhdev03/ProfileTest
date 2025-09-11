import React, { useState, useEffect, Suspense, lazy } from "react";
import { motion } from "framer-motion";
import Hero from "./components/Hero/Hero";
import BlogDetail from "./components/Blog/BlogDetail";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import MainLayout from "./Layouts/MainLayout";
import { useTheme } from "./hooks/useTheme";
import { smoothScrollTo } from "./utils/scroll";

// Lazy load components for better performance
const About = lazy(() => import("./components/About/About"));
const Skills = lazy(() => import("./components/Skills/Skills"));
const Projects = lazy(() => import("./components/Projects/Projects"));
const Blog = lazy(() => import("./components/Blog/Blog"));
const Contact = lazy(() => import("./components/Contact/Contact"));
import "./styles/App.scss";

function App() {
  const [theme, toggleTheme] = useTheme("dark");
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState("home");
  const [selectedBlogPost, setSelectedBlogPost] = useState(null);

  useEffect(() => {
    // Shorter loading time for better UX
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  // Khôi phục vị trí cuộn khi quay lại từ blog detail
  useEffect(() => {
    if (currentView === "home") {
      const savedScrollPosition = sessionStorage.getItem("blogScrollPosition");
      if (savedScrollPosition) {
        const restoreScrollPosition = () => {
          const blogSection = document.getElementById("blog");
          const savedPos = parseInt(savedScrollPosition);
          
          if (blogSection) {
            const blogSectionTop = blogSection.offsetTop - 80;
            const targetPosition = savedPos >= blogSectionTop - 100 ? savedPos : blogSectionTop;
            smoothScrollTo(targetPosition);
          } else {
            smoothScrollTo(savedPos);
          }
          
          sessionStorage.removeItem("blogScrollPosition");
        };

        // Tối ưu timing để giảm giật lag
        requestAnimationFrame(() => {
          setTimeout(restoreScrollPosition, 150);
        });
      }
    }
  }, [currentView]);



  const handleBlogPostSelect = (post) => {
    // Lưu vị trí cuộn hiện tại trước khi chuyển sang blog detail
    sessionStorage.setItem("blogScrollPosition", window.scrollY.toString());
    
    // Smooth transition
    document.body.style.overflow = 'hidden';
    
    // Delay ngắn để tránh flash
    requestAnimationFrame(() => {
      setSelectedBlogPost(post);
      setCurrentView("blog-detail");
      
      // Khôi phục scroll behavior
      setTimeout(() => {
        document.body.style.overflow = '';
      }, 50);
    });
  };

  const handleBackToBlog = () => {
    // Thêm class transition để smooth hơn
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
      setSelectedBlogPost(null);
      setCurrentView("home");
      
      // Khôi phục scroll sau khi component đã mount
      setTimeout(() => {
        document.body.style.overflow = '';
      }, 100);
    }, 100);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  // Render blog detail view
  if (currentView === "blog-detail" && selectedBlogPost) {
    return (
      <MainLayout theme={theme} toggleTheme={toggleTheme}>
        <BlogDetail post={selectedBlogPost} onBack={handleBackToBlog} />
      </MainLayout>
    );
  }

  // Render main portfolio view
  return (
    <MainLayout theme={theme} toggleTheme={toggleTheme}>
      <Hero />
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
        <About />
        <Skills />
        <Projects />
        <Blog onPostSelect={handleBlogPostSelect} />
        <Contact />
      </Suspense>
    </MainLayout>
  );
}

export default App;
