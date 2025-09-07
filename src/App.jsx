import React, { useState, useEffect, Suspense, lazy } from "react";
import { motion } from "framer-motion";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import ThemeToggle from "./components/ThemeToggle/ThemeToggle";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

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

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);

    // Shorter loading time for better UX
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  if (isLoading) {
    return (
      <div className="loading-screen">
        <motion.div
          className="loading-spinner"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <div className="spinner"></div>
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

  return (
    <div className="App" data-theme={theme}>
      <Header />
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
          <Blog />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={<div className="loading-footer">Loading...</div>}>
        <Footer />
      </Suspense>
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      <ScrollToTop />
    </div>
  );
}

export default App;
