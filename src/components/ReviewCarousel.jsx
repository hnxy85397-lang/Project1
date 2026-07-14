import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { reviews } from '../data/reviews';

const ReviewCarousel = () => {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + reviews.length) % reviews.length);
  const next = () => setCurrent((c) => (c + 1) % reviews.length);

  const getVisible = () => {
    const items = [];
    for (let i = -1; i <= 1; i++) {
      const idx = (current + i + reviews.length) % reviews.length;
      items.push({ review: reviews[idx], offset: i });
    }
    return items;
  };

  return (
    <section id="reviews" className="py-20 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary rounded-full text-sm font-semibold font-kanit mb-3">
            💬 รีวิวจากลูกค้า
          </span>
          <h2 className="section-title text-gray-900 dark:text-white">
            เสียงจาก
            <span className="gradient-text"> ลูกค้าจริง</span>
          </h2>
          <p className="section-subtitle">ความคิดเห็นจากผู้ที่ได้สัมผัสประสบการณ์จริง</p>
        </motion.div>

        {/* Carousel */}
        <div className="relative flex items-center justify-center gap-4 min-h-64">
          {/* Prev Button */}
          <button
            onClick={prev}
            className="absolute left-0 z-20 w-12 h-12 rounded-full glass-card flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-primary hover:scale-110 transition-all duration-200 shadow-lg"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Cards */}
          <div className="flex items-center justify-center gap-6 w-full px-16">
            {getVisible().map(({ review, offset }) => (
              <motion.div
                key={review.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: offset === 0 ? 1 : 0.5,
                  scale: offset === 0 ? 1 : 0.85,
                  x: offset * 20,
                  zIndex: offset === 0 ? 10 : 0,
                }}
                transition={{ duration: 0.4 }}
                className={`glass-card rounded-2xl p-6 md:p-8 flex-shrink-0 w-full max-w-lg ${
                  offset !== 0 ? 'hidden md:block' : ''
                }`}
              >
                {/* Quote Icon */}
                <Quote size={32} className="text-primary/30 mb-4 fill-primary/10" />

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < review.rating
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300 dark:text-gray-600'
                      }
                    />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-gray-700 dark:text-gray-300 font-kanit text-base leading-relaxed mb-6">
                  "{review.comment}"
                </p>

                {/* Reviewer */}
                <div className="flex items-center gap-3">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-12 h-12 rounded-full border-2 border-primary/20"
                    onError={(e) => {
                      e.target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${review.name}&backgroundColor=FF6B35&textColor=ffffff`;
                    }}
                  />
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white font-kanit">
                      {review.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 font-kanit">
                      {review.restaurant} · {review.date}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={next}
            className="absolute right-0 z-20 w-12 h-12 rounded-full glass-card flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-primary hover:scale-110 transition-all duration-200 shadow-lg"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? 'w-6 h-2.5 bg-primary'
                  : 'w-2.5 h-2.5 bg-gray-300 dark:bg-gray-600 hover:bg-primary/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewCarousel;
