import React from 'react';
import { motion } from 'framer-motion';
import { highlights } from '../data/highlights';

const SaraburiHighlights = () => {
  return (
    <section id="highlights" className="py-20 px-4 bg-gray-50/50 dark:bg-gray-900/30">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold font-kanit mb-3">
            🗺️ เกี่ยวกับสระบุรี
          </span>
          <h2 className="section-title text-gray-900 dark:text-white">
            ไฮไลท์
            <span className="gradient-text"> จังหวัดสระบุรี</span>
          </h2>
          <p className="section-subtitle">ของกินขึ้นชื่อ สถานที่ท่องเที่ยว ตลาด คาเฟ่ และจุดเช็คอินสุดฮิต</p>
        </motion.div>

        {/* Hero Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-3xl overflow-hidden mb-6 group cursor-pointer hover:shadow-2xl transition-shadow duration-500"
        >
          <div className="grid md:grid-cols-2 h-64 md:h-80">
            <div className="img-zoom-container overflow-hidden">
              <img
                src={highlights[1].image}
                alt={highlights[1].title}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8 md:p-10 flex flex-col justify-center bg-gradient-to-br from-accent/5 to-transparent">
              <span
                className="inline-block px-3 py-1 rounded-full text-xs font-kanit font-semibold mb-4 text-white"
                style={{ backgroundColor: highlights[1].color }}
              >
                {highlights[1].tag}
              </span>
              <h3 className="text-3xl font-bold font-prompt text-gray-900 dark:text-white mb-2">
                {highlights[1].title}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 font-kanit mb-2">{highlights[1].subtitle}</p>
              <p className="text-gray-600 dark:text-gray-300 font-kanit leading-relaxed">
                {highlights[1].description}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Grid of remaining highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.filter((_, i) => i !== 1).map((highlight, index) => (
            <motion.div
              key={highlight.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card rounded-2xl overflow-hidden group card-hover cursor-pointer"
            >
              <div className="img-zoom-container h-44 overflow-hidden">
                <img
                  src={highlight.image}
                  alt={highlight.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <span
                    className="px-2.5 py-1 rounded-full text-xs font-kanit font-semibold text-white"
                    style={{ backgroundColor: highlight.color }}
                  >
                    {highlight.tag}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-gray-900 dark:text-white font-prompt text-lg mb-1 group-hover:text-primary transition-colors">
                  {highlight.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-kanit mb-2">{highlight.subtitle}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300 font-kanit line-clamp-2">
                  {highlight.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-secondary to-accent p-0.5"
        >
          <div className="bg-white dark:bg-gray-900 rounded-[calc(1.5rem-2px)] p-8 md:p-12 text-center">
            <div className="text-4xl mb-4">🏞️</div>
            <h3 className="text-2xl md:text-3xl font-bold font-prompt text-gray-900 dark:text-white mb-3">
              สระบุรี — เมืองแห่งธรรมชาติและอาหารอร่อย
            </h3>
            <p className="text-gray-600 dark:text-gray-300 font-kanit max-w-2xl mx-auto leading-relaxed">
              จังหวัดสระบุรีตั้งอยู่ทางภาคกลางของประเทศไทย มีเขื่อนป่าสักชลสิทธิ์อันยิ่งใหญ่ 
              อุทยานแห่งชาติที่สวยงาม และร้านอาหารที่หลากหลาย เป็นจุดหมายยอดนิยมสำหรับนักท่องเที่ยวสุดสัปดาห์
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              {['ก๋วยเตี๋ยวเรือ', 'เขื่อนป่าสัก', 'มวกเหล็ก', 'ตลาดน้ำ', 'คาเฟ่ธรรมชาติ'].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-primary/10 dark:bg-primary/20 text-primary rounded-full text-sm font-kanit font-semibold"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SaraburiHighlights;
