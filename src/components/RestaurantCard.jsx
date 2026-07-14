import React, { useState } from 'react';
import { Star, Clock, MapPin, ExternalLink, Navigation, DollarSign, Tag } from 'lucide-react';
import { motion } from 'framer-motion';

const categoryColors = {
  'คาเฟ่': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  'ก๋วยเตี๋ยว': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  'อาหารไทย': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  'ชาบู': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  'ปิ้งย่าง': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  'ร้านกาแฟ': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  'ของหวาน': 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
  'อาหารอีสาน': 'bg-lime-100 text-lime-700 dark:bg-lime-900/30 dark:text-lime-400',
  'Fast Food': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
};

const RestaurantCard = ({ restaurant, index }) => {
  const [imgError, setImgError] = useState(false);

  const fallbackImages = {
    'ก๋วยเตี๋ยว': 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&q=80',
    'คาเฟ่': 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&q=80',
    'อาหารไทย': 'https://images.unsplash.com/photo-1559410545-0bdcd187e0a6?w=600&q=80',
    'ชาบู': 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=600&q=80',
    'ปิ้งย่าง': 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80',
    'ร้านกาแฟ': 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80',
    'ของหวาน': 'https://images.unsplash.com/photo-1541014741259-de529411b96a?w=600&q=80',
    'อาหารอีสาน': 'https://images.unsplash.com/photo-1562802378-063ec186a863?w=600&q=80',
    'Fast Food': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80',
  };

  const imageSrc = imgError
    ? fallbackImages[restaurant.category] || 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80'
    : restaurant.image;

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={13}
        className={i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}
      />
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group glass-card rounded-2xl overflow-hidden card-hover cursor-pointer"
    >
      {/* Image */}
      <div className="img-zoom-container relative h-52 overflow-hidden">
        <img
          src={imageSrc}
          alt={restaurant.name}
          onError={() => setImgError(true)}
          loading="lazy"
          className="w-full h-full object-cover"
        />
        {/* Overlay with status */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Open/Closed Badge */}
        <div className="absolute top-3 right-3">
          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold font-kanit ${
            restaurant.isOpen
              ? 'bg-green-500 text-white'
              : 'bg-gray-500 text-white'
          }`}>
            {restaurant.isOpen ? '🟢 เปิดอยู่' : '🔴 ปิดแล้ว'}
          </span>
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium font-kanit backdrop-blur-md bg-white/80 ${
            categoryColors[restaurant.category] || 'bg-gray-100 text-gray-700'
          }`}>
            {restaurant.category}
          </span>
        </div>

        {/* Rating overlay bottom */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-lg">
          <Star size={13} className="text-yellow-400 fill-yellow-400" />
          <span className="text-white text-xs font-bold">{restaurant.rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-lg text-gray-900 dark:text-white font-prompt mb-1 line-clamp-1 group-hover:text-primary transition-colors duration-200">
          {restaurant.name}
        </h3>

        {/* Stars */}
        <div className="flex items-center gap-1 mb-3">
          {renderStars(restaurant.rating)}
          <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">({restaurant.rating})</span>
        </div>

        {/* Info Grid */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
            <Clock size={14} className="text-primary flex-shrink-0" />
            <span className="font-kanit">{restaurant.openTime}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
            <DollarSign size={14} className="text-secondary flex-shrink-0" />
            <span className="font-kanit">ราคา ~฿{restaurant.priceRange} | {restaurant.price}</span>
          </div>
          <div className="flex items-start gap-2 text-gray-600 dark:text-gray-400 text-sm">
            <MapPin size={14} className="text-accent flex-shrink-0 mt-0.5" />
            <span className="font-kanit line-clamp-2">{restaurant.address}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-500 dark:text-gray-400 text-sm font-kanit line-clamp-2 mb-4">
          {restaurant.description}
        </p>

        {/* Tags */}
        {restaurant.tags && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {restaurant.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 px-2 py-0.5 bg-gray-100 dark:bg-gray-700/50 text-gray-600 dark:text-gray-400 rounded-full text-xs font-kanit"
              >
                <Tag size={10} />
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-gradient-to-r from-primary to-secondary text-white text-sm font-semibold font-kanit rounded-xl hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02] transition-all duration-200">
            <ExternalLink size={14} />
            รายละเอียด
          </button>
          <a
            href={restaurant.googleMap}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-2.5 px-4 border border-accent text-accent text-sm font-semibold font-kanit rounded-xl hover:bg-accent hover:text-white transition-all duration-200"
          >
            <Navigation size={14} />
            Maps
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default RestaurantCard;
