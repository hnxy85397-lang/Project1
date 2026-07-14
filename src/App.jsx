import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import SearchBar from './components/SearchBar';
import RestaurantGrid from './components/RestaurantGrid';
import FeaturedRestaurant from './components/FeaturedRestaurant';
import Statistics from './components/Statistics';
import ReviewCarousel from './components/ReviewCarousel';
import SaraburiHighlights from './components/SaraburiHighlights';
import Footer from './components/Footer';
import LoginPage from './components/LoginPage';
import { useDarkMode } from './hooks/useDarkMode';
import { useAuth } from './hooks/useAuth';
import { restaurants } from './data/restaurants';

function App() {
  const { isDark, toggle } = useDarkMode();
  const { currentUser, login, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('ทั้งหมด');

  const filteredRestaurants = useMemo(() => {
    let filtered = [...restaurants];

    if (activeCategory !== 'ทั้งหมด') {
      filtered = filtered.filter((r) => r.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.category.toLowerCase().includes(q) ||
          r.address.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }

    return filtered;
  }, [searchQuery, activeCategory]);

  return (
    <AnimatePresence mode="wait">
      {!currentUser ? (
        /* ─── Login Gate ─── */
        <motion.div
          key="login"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.4 }}
        >
          <LoginPage onLogin={login} />
        </motion.div>
      ) : (
        /* ─── Main Site ─── */
        <motion.div
          key="main"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300"
        >
          <Navbar
            isDark={isDark}
            toggleDark={toggle}
            currentUser={currentUser}
            onLogout={logout}
          />
          <HeroSection />
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
          <RestaurantGrid restaurants={filteredRestaurants} />
          <FeaturedRestaurant />
          <Statistics />
          <ReviewCarousel />
          <SaraburiHighlights />
          <Footer />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App;
