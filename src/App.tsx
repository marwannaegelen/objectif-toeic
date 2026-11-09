import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Background } from "./components/layout/Background";
import { pageVariants } from "./lib/motion";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import QuizPage from "./pages/QuizPage";
import TestPage from "./pages/TestPage";
import DesignSystemPage from "./pages/DesignSystemPage";
import NotFoundPage from "./pages/NotFoundPage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  const reduce = useReducedMotion();
  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={location.pathname}
        variants={reduce ? undefined : pageVariants}
        initial={reduce ? false : "initial"}
        animate={reduce ? undefined : "enter"}
        exit={reduce ? undefined : "exit"}
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/design" element={<DesignSystemPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </motion.main>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <>
      <Background />
      <ScrollToTop />
      <Navbar />
      <AnimatedRoutes />
      <Footer />
    </>
  );
}
