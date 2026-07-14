import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchX } from 'lucide-react';
import RestaurantCard from './RestaurantCard';

const RestaurantGrid = ({ restaurants }) => {
  return (
    <section id="restaurants" className="py-16 px-4 bg-gray-50/50 dark:bg-gray-900/50">
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
            🍽️ ร้านอาหารทั้งหมด
          </span>
          <h2 className="section-title text-gray-900 dark:text-white">
            ร้านอาหารแนะนำ
            <br />
            <span className="gradient-text">จังหวัดสระบุรี</span>
          </h2>
          <p className="section-subtitle">พบกับร้านอาหารที่ดีที่สุดในจังหวัดสระบุรี คัดสรรโดยทีมงานผู้เชี่ยวชาญ</p>
        </motion.div>

        {/* Results Count */}
        {restaurants.length > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-gray-500 dark:text-gray-400 font-kanit mb-6 text-center"
          >
            พบ <span className="text-primary font-semibold">{restaurants.length}</span> ร้านอาหาร
          </motion.p>
        )}

        {/* Grid */}
        <AnimatePresence mode="wait">
          {restaurants.length > 0 ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {restaurants.map((restaurant, index) => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                  index={index}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <SearchX size={60} className="text-gray-300 dark:text-gray-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-500 dark:text-gray-400 font-kanit mb-2">
                ไม่พบร้านอาหาร
              </h3>
              <p className="text-gray-400 dark:text-gray-500 font-kanit">
                ลองค้นหาด้วยคำอื่น หรือเปลี่ยนหมวดหมู่
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default RestaurantGrid;
