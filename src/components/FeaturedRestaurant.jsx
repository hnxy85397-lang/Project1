import React from 'react';
import { motion } from 'framer-motion';
import { Star, Clock, MapPin, Navigation, Award, ExternalLink } from 'lucide-react';
import { restaurants } from '../data/restaurants';

const featured = restaurants.find((r) => r.id === 5); // River Curve

const FeaturedRestaurant = () => {
  if (!featured) return null;

  return (
    <section id="featured" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary rounded-full text-sm font-semibold font-kanit mb-3">
            ⭐ ร้านแนะนำพิเศษ
          </span>
          <h2 className="section-title text-gray-900 dark:text-white">
            ร้านยอดนิยม
            <br />
            <span className="gradient-text">ประจำเดือนนี้</span>
          </h2>
        </motion.div>

        {/* Featured Banner */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-card rounded-3xl overflow-hidden"
        >
          <div className="grid lg:grid-cols-2">
            {/* Image Side */}
            <div className="img-zoom-container relative h-80 lg:h-auto min-h-80">
              <img
                src={featured.image}
                alt={featured.name}
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20 lg:bg-gradient-to-l" />

              {/* Award Badge */}
              <div className="absolute top-6 left-6 flex items-center gap-2 bg-gradient-to-r from-secondary to-primary px-4 py-2 rounded-full text-white font-bold font-kanit shadow-lg">
                <Award size={16} />
                ร้านแนะนำ #1
              </div>

              {/* Rating */}
              <div className="absolute bottom-6 left-6 flex items-center gap-2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-white">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < Math.floor(featured.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}
                  />
                ))}
                <span className="font-bold text-sm">{featured.rating}</span>
                <span className="text-gray-300 text-xs">/ 5.0</span>
              </div>
            </div>

            {/* Info Side */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-kanit font-semibold">
                  {featured.category}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-kanit font-semibold ${
                  featured.isOpen ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-600'
                }`}>
                  {featured.isOpen ? '🟢 เปิดอยู่' : '🔴 ปิดแล้ว'}
                </span>
              </div>

              <h3 className="text-3xl md:text-4xl font-bold font-prompt text-gray-900 dark:text-white mb-4">
                {featured.name}
              </h3>

              <p className="text-gray-600 dark:text-gray-300 font-kanit text-base leading-relaxed mb-6">
                {featured.description}
              </p>

              {/* Details */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock size={16} className="text-primary" />
                  </div>
                  <span className="font-kanit">{featured.openTime}</span>
                </div>
                <div className="flex items-start gap-3 text-gray-600 dark:text-gray-400">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <MapPin size={16} className="text-accent" />
                  </div>
                  <span className="font-kanit">{featured.address}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                  <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-secondary text-sm font-bold">฿</span>
                  </div>
                  <span className="font-kanit">ราคาโดยประมาณ ฿{featured.priceRange} ต่อคน</span>
                </div>
              </div>

              {/* Review Quote */}
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-5 mb-8 border-l-4 border-primary">
                <p className="text-gray-600 dark:text-gray-300 font-kanit italic text-sm">
                  "บรรยากาศดีมากๆ ริมน้ำสวยงาม อาหารอร่อยมาก ซีฟู้ดสดมาก ราคาสมเหตุสมผล จะกลับมาอีกแน่นอนค่ะ"
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xs font-bold">
                    N
                  </div>
                  <span className="text-gray-500 dark:text-gray-400 text-sm font-kanit">คุณนภา สุขใจ</span>
                  <div className="flex ml-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star key={i} size={12} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 bg-gradient-to-r from-primary to-secondary text-white font-bold font-kanit rounded-xl hover:shadow-xl hover:shadow-primary/30 hover:scale-105 transition-all duration-300">
                  <ExternalLink size={16} />
                  ดูรายละเอียด
                </button>
                <a
                  href={featured.googleMap}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3.5 px-6 border-2 border-accent text-accent font-bold font-kanit rounded-xl hover:bg-accent hover:text-white transition-all duration-300"
                >
                  <Navigation size={16} />
                  นำทาง
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedRestaurant;
