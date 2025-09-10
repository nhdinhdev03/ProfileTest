import React, { useState, useEffect, Suspense, lazy } from "react";
import { motion } from "framer-motion";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import BlogDetail from "./components/Blog/BlogDetail";

// Lazy load components for better performance
const About = lazy(() => import("./components/About/About"));
const Skills = lazy(() => import("./components/Skills/Skills"));
const Projects = lazy(() => import("./components/Projects/Projects"));
const Blog = lazy(() => import("./components/Blog/Blog"));
const Contact = lazy(() => import("./components/Contact/Contact"));
const Footer = lazy(() => import("./components/Footer/Footer"));
import "./styles/App.scss";

function App() {
  const [theme, setTheme] = useState("dark");
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState("home");
  const [selectedBlogPost, setSelectedBlogPost] = useState(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);

    // Shorter loading time for better UX
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  // Helper function cho smooth scroll animation
  const smoothScrollTo = (targetY) => {
    const startY = window.scrollY;
    const distance = targetY - startY;
    const duration = Math.min(Math.abs(distance) * 0.5, 600); // Giảm duration để mượt hơn
    let start = null;

    const easeInOutCubic = (t) => {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    };

    const animate = (timestamp) => {
      if (start === null) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutCubic(progress);
      
      const currentY = startY + distance * easedProgress;
      window.scrollTo(0, currentY);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

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

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

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
    return (
      <div className="loading-screen">
        <motion.div
          className="loader-orbital-3d"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: [0.98, 1, 0.98] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Professional orbital ring loader (minimal, 3D) */}
          <svg
            className="pro-loader"
            viewBox="0 0 300 300"
            width="220"
            height="220"
            aria-labelledby="loaderTitle"
          >
            <title id="loaderTitle">Loading animation</title>
            <defs>
              <linearGradient id="ringA" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="50%" stopColor="#a78bfa" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
              <linearGradient id="ringB" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#93c5fd" />
                <stop offset="100%" stopColor="#67e8f9" />
              </linearGradient>
              <filter
                id="softShadow"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feDropShadow
                  dx="0"
                  dy="15"
                  stdDeviation="12"
                  floodColor="#000000"
                  floodOpacity="0.35"
                />
              </filter>
              <filter
                id="innerGlow"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feGaussianBlur stdDeviation="4" result="b" />
                <feComposite in="SourceGraphic" in2="b" operator="over" />
              </filter>
            </defs>

            {/* Elevated glass disc (3D tilt via CSS) */}
            <g transform="translate(150 150)" filter="url(#softShadow)">
              <ellipse
                rx="110"
                ry="68"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1"
              />
            </g>

            {/* Outer rotating ring */}
            <g transform="translate(150 150) rotate(-16)">
              <circle
                r="100"
                fill="none"
                stroke="url(#ringA)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray="140 40"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0"
                  to="360"
                  dur="12s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>

            {/* Middle counter-rotating ring */}
            <g transform="translate(150 150) rotate(10)">
              <circle
                r="78"
                fill="none"
                stroke="url(#ringB)"
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray="100 30"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="360"
                  to="0"
                  dur="9s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>

            {/* Inner segmented ring */}
            <g transform="translate(150 150)">
              <circle
                r="55"
                fill="none"
                stroke="#6366f1"
                strokeOpacity="0.6"
                strokeWidth="4"
                strokeDasharray="18 12"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  values="0;60;0"
                  dur="6s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>

            {/* Core pulse */}
            <g transform="translate(150 150)">
              <circle r="10" fill="#a78bfa" filter="url(#innerGlow)">
                <animate
                  attributeName="r"
                  values="8;12;8"
                  dur="2.2s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="fill"
                  values="#a78bfa;#22d3ee;#a78bfa"
                  dur="4.4s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          </svg>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Loading Portfolio...
        </motion.p>
      </div>
    );
  }

  // Render blog detail view
  if (currentView === "blog-detail" && selectedBlogPost) {
    return (
      <div className="App" data-theme={theme}>
        <Header theme={theme} toggleTheme={toggleTheme} />
        <main>
          <BlogDetail post={selectedBlogPost} onBack={handleBackToBlog} />
        </main>
        <Suspense fallback={<div className="loading-footer">Loading...</div>}>
          <Footer />
        </Suspense>
      </div>
    );
  }

  // Render main portfolio view
  return (
    <div className="App" data-theme={theme}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main>
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
      </main>
      <Suspense fallback={<div className="loading-footer">Loading...</div>}>
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
