import React from 'react';
import { Search, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { categories } from '../data/restaurants';

const SearchBar = ({ searchQuery, setSearchQuery, activeCategory, setActiveCategory }) => {
  return (
    <section className="py-8 px-4 -mt-8 relative z-20">
      <div className="max-w-4xl mx-auto">
        {/* Search Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-card rounded-2xl p-4 md:p-6 mb-4"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ค้นหาร้านอาหาร ประเภทอาหาร หรือที่อยู่..."
              className="w-full pl-12 pr-12 py-3.5 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 text-gray-800 dark:text-gray-200 placeholder-gray-400 font-kanit focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200 text-sm md:text-base"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </motion.div>

        {/* Category Filter Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap gap-2 justify-center"
        >
          {categories.map((cat, index) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(cat)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`px-4 py-2 rounded-full text-sm font-medium font-kanit border transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-primary to-secondary text-white border-transparent shadow-lg shadow-primary/30'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-primary hover:text-primary dark:hover:border-primary dark:hover:text-primary'
              }`}
            >
              {cat === 'ทั้งหมด' && '🍽️ '}
              {cat === 'คาเฟ่' && '🌿 '}
              {cat === 'ก๋วยเตี๋ยว' && '🍜 '}
              {cat === 'อาหารไทย' && '🍛 '}
              {cat === 'ชาบู' && '🫕 '}
              {cat === 'ปิ้งย่าง' && '🥩 '}
              {cat === 'ร้านกาแฟ' && '☕ '}
              {cat === 'ของหวาน' && '🍮 '}
              {cat === 'อาหารอีสาน' && '🌶️ '}
              {cat === 'Fast Food' && '🍔 '}
              {cat}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SearchBar;
