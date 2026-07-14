import React from 'react';
import { motion } from 'framer-motion';
import { useCounter } from '../hooks/useCounter';
import { restaurants } from '../data/restaurants';

const StatCard = ({ label, value, icon, color, suffix = '' }) => {
  const { count, ref } = useCounter(value, 2000);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="glass-card rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300 group"
    >
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300"
        style={{ background: `${color}20`, boxShadow: `0 8px 24px ${color}30` }}
      >
        {icon}
      </div>
      <div
        className="text-4xl font-bold font-prompt mb-2"
        style={{ color }}
      >
        {count}{suffix}
      </div>
      <div className="text-gray-500 dark:text-gray-400 font-kanit text-sm">
        {label}
      </div>
    </motion.div>
  );
};

const Statistics = () => {
  const totalRestaurants = restaurants.length;
  const openNow = restaurants.filter((r) => r.isOpen).length;
  const highRated = restaurants.filter((r) => r.rating >= 4.5).length;
  const topRating = Math.round(
    (restaurants.reduce((sum, r) => sum + r.rating, 0) / restaurants.length) * 10
  ) / 10;

  const stats = [
    {
      label: 'ร้านอาหารทั้งหมด',
      value: totalRestaurants,
      icon: '🍽️',
      color: '#FF6B35',
      suffix: '+',
    },
    {
      label: 'เปิดให้บริการตอนนี้',
      value: openNow,
      icon: '🟢',
      color: '#22C55E',
      suffix: '',
    },
    {
      label: 'ร้านคะแนน 4.5+',
      value: highRated,
      icon: '⭐',
      color: '#FFB703',
      suffix: '',
    },
    {
      label: 'รีวิวจากลูกค้า',
      value: 500,
      icon: '💬',
      color: '#2EC4B6',
      suffix: '+',
    },
  ];

  return (
    <section id="stats" className="py-20 px-4 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 dark:from-primary/10 dark:to-accent/10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-semibold font-kanit mb-3">
            📊 สถิติข้อมูล
          </span>
          <h2 className="section-title text-gray-900 dark:text-white">
            ตัวเลขที่
            <span className="gradient-text"> น่าประทับใจ</span>
          </h2>
          <p className="section-subtitle">สถิติล่าสุดของร้านอาหารในจังหวัดสระบุรี</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              <StatCard {...stat} />
            </motion.div>
          ))}
        </div>

        {/* Bottom Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 glass-card rounded-2xl p-6 md:p-8 text-center"
        >
          <div className="flex flex-wrap items-center justify-center gap-8">
            <div>
              <div className="text-5xl font-bold font-prompt gradient-text">{topRating}</div>
              <div className="text-gray-500 dark:text-gray-400 font-kanit text-sm mt-1">คะแนนเฉลี่ย / 5.0</div>
            </div>
            <div className="hidden md:block w-px h-12 bg-gray-200 dark:bg-gray-700" />
            <div className="max-w-sm">
              <p className="text-gray-600 dark:text-gray-300 font-kanit">
                🌟 ร้านอาหารในสระบุรีมีคะแนนรีวิวเฉลี่ยสูงมาก แสดงถึงคุณภาพและบริการที่ยอดเยี่ยม
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Statistics;
