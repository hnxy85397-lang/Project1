import React, { useState, useEffect, useRef } from 'react';
import { Moon, Sun, Menu, X, MapPin, LogOut, ChevronDown, User, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ isDark, toggleDark, currentUser, onLogout }) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  // Close user-menu on outside click
  useEffect(() => {
    const handler = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'ร้านอาหาร', href: '#restaurants' },
    { label: 'ยอดนิยม', href: '#featured' },
    { label: 'สถิติ', href: '#stats' },
    { label: 'รีวิว', href: '#reviews' },
    { label: 'เกี่ยวกับสระบุรี', href: '#highlights' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 shadow-lg border-b border-white/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <span className="text-xl">🍜</span>
            </div>
            <div>
              <span className="text-lg font-bold font-prompt bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Saraburi
              </span>
              <span className="block text-xs text-gray-500 dark:text-gray-400 font-kanit -mt-1">
                Food Guide
              </span>
            </div>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors duration-200 font-kanit relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300 rounded-full" />
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Dark mode toggle */}
            <button
              onClick={toggleDark}
              className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:scale-110 transition-all duration-200"
            >
              {isDark ? (
                <Sun size={18} className="text-yellow-400" />
              ) : (
                <Moon size={18} className="text-gray-600" />
              )}
            </button>

            {/* ── User session chip (desktop) ── */}
            {currentUser ? (
              <div className="relative hidden md:block" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen((v) => !v)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-primary/10 dark:hover:bg-primary/20 border border-gray-200 dark:border-gray-700 transition-all duration-200 group"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-full border border-primary/30"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                  <span className="text-sm font-kanit font-medium text-gray-700 dark:text-gray-300 max-w-[110px] truncate">
                    {currentUser.name}
                  </span>
                  {currentUser.role === 'admin' && (
                    <Shield size={12} className="text-primary flex-shrink-0" />
                  )}
                  <ChevronDown
                    size={14}
                    className={`text-gray-400 transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Dropdown */}
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-52 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
                    >
                      {/* user info */}
                      <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                        <p className="font-semibold text-gray-900 dark:text-white font-kanit text-sm">
                          {currentUser.name}
                        </p>
                        <p className="text-xs text-gray-400 font-kanit mt-0.5">
                          @{currentUser.username}
                          {currentUser.role === 'admin' && (
                            <span className="ml-1.5 px-1.5 py-0.5 bg-primary/10 text-primary rounded-full text-[10px] font-bold">Admin</span>
                          )}
                        </p>
                      </div>
                      {/* logout */}
                      <button
                        onClick={() => { setUserMenuOpen(false); onLogout(); }}
                        className="w-full flex items-center gap-2.5 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 font-kanit text-sm transition-colors duration-150"
                      >
                        <LogOut size={15} />
                        ออกจากระบบ
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <a
                href="#restaurants"
                className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-secondary text-white text-sm font-semibold font-kanit shadow-lg hover:shadow-primary/40 hover:scale-105 transition-all duration-300"
              >
                <MapPin size={15} />
                ค้นหาร้าน
              </a>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-700/50"
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="py-2 px-4 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-primary/10 hover:text-primary font-kanit transition-all duration-200"
                >
                  {link.label}
                </a>
              ))}
              {/* Mobile user info + logout */}
              {currentUser && (
                <>
                  <div className="h-px bg-gray-200 dark:bg-gray-700 my-1" />
                  <div className="flex items-center gap-3 px-4 py-2">
                    <img src={currentUser.avatar} alt={currentUser.name} className="w-8 h-8 rounded-full border border-primary/30" />
                    <div>
                      <p className="text-sm font-semibold font-kanit text-gray-800 dark:text-gray-200">{currentUser.name}</p>
                      <p className="text-xs text-gray-400 font-kanit">@{currentUser.username}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => { setMenuOpen(false); onLogout(); }}
                    className="flex items-center gap-2 py-2 px-4 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 font-kanit transition-all duration-200"
                  >
                    <LogOut size={16} />
                    ออกจากระบบ
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
