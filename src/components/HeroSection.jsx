import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Utensils, Star } from 'lucide-react';

const HERO_IMAGE = "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=90";

const HeroSection = () => {
  const scrollToRestaurants = () => {
    document.getElementById('restaurants')?.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToFeatured = () => {
    document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt="อาหารไทยสระบุรี"
          className="w-full h-full object-cover"
          loading="eager"
        />
        {/* Multi-layer gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-transparent to-accent/20" />
      </div>

      {/* Animated Background Blobs */}
      <div className="absolute inset-0 z-1 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="blob w-96 h-96 bg-primary/20 top-1/4 -left-20"
        />
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="blob w-80 h-80 bg-secondary/20 bottom-1/4 -right-20"
        />
        <motion.div
          animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          className="blob w-64 h-64 bg-accent/15 top-1/3 right-1/4"
        />
      </div>

      {/* Floating Particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-white/30 z-10"
          style={{
            left: `${10 + i * 12}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.4,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-kanit mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          🗺️ จังหวัดสระบุรี ประเทศไทย
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold font-prompt text-white mb-4 leading-tight"
        >
          🍜 Saraburi
          <br />
          <span className="bg-gradient-to-r from-secondary via-primary to-accent bg-clip-text text-transparent">
            Food Guide
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-white/90 font-kanit mb-10 max-w-2xl mx-auto"
        >
          รวมร้านอาหารเด็ด จังหวัดสระบุรี
          <br />
          <span className="text-secondary">ค้นหา • รีวิว • แนะนำ</span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={scrollToRestaurants}
            className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold font-kanit rounded-2xl shadow-2xl shadow-primary/30 hover:shadow-primary/50 hover:scale-105 transition-all duration-300 text-lg"
          >
            <Utensils size={20} />
            ดูร้านอาหาร
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
          </button>
          <button
            onClick={scrollToFeatured}
            className="flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white font-semibold font-kanit rounded-2xl hover:bg-white/20 hover:scale-105 transition-all duration-300 text-lg"
          >
            <Star size={20} className="text-secondary" />
            แนะนำร้านดัง
          </button>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex items-center justify-center gap-8 mt-14 text-white"
        >
          {[
            { label: 'ร้านอาหาร', value: '12+' },
            { label: 'ประเภทอาหาร', value: '9' },
            { label: 'รีวิวลูกค้า', value: '500+' },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <div className="text-2xl font-bold font-prompt text-secondary">{item.value}</div>
              <div className="text-xs text-white/70 font-kanit mt-0.5">{item.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/60 cursor-pointer"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        onClick={scrollToRestaurants}
      >
        <span className="text-xs font-kanit">เลื่อนลง</span>
        <ChevronDown size={24} />
      </motion.div>
    </section>
  );
};

export default HeroSection;
