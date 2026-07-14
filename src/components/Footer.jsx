import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube, Heart, ExternalLink } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-gray-900 dark:bg-black text-white pt-16 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* About */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg text-2xl">
                🍜
              </div>
              <div>
                <h3 className="text-xl font-bold font-prompt bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Saraburi Food Guide
                </h3>
                <p className="text-gray-400 text-xs font-kanit">รวมร้านอาหารเด็ดจังหวัดสระบุรี</p>
              </div>
            </div>
            <p className="text-gray-400 font-kanit text-sm leading-relaxed mb-6 max-w-md">
              เราคือแหล่งรวมข้อมูลร้านอาหารที่ดีที่สุดในจังหวัดสระบุรี 
              ค้นหา รีวิว และแนะนำร้านอาหาร คาเฟ่ และสถานที่ท่องเที่ยวที่น่าสนใจ
              เพื่อช่วยให้คุณค้นพบประสบการณ์อาหารที่ดีที่สุด
            </p>
            {/* Social */}
            <div className="flex gap-3">
              {[
                { icon: <Facebook size={18} />, href: '#', label: 'Facebook', color: '#1877F2' },
                { icon: <Instagram size={18} />, href: '#', label: 'Instagram', color: '#E4405F' },
                { icon: <Youtube size={18} />, href: '#', label: 'YouTube', color: '#FF0000' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{ '--hover-color': social.color }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold font-kanit text-white mb-4 text-sm uppercase tracking-wider">
              ลิงก์ด่วน
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: 'ร้านอาหารทั้งหมด', href: '#restaurants' },
                { label: 'ร้านแนะนำ', href: '#featured' },
                { label: 'สถิติ', href: '#stats' },
                { label: 'รีวิว', href: '#reviews' },
                { label: 'เกี่ยวกับสระบุรี', href: '#highlights' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-primary font-kanit text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold font-kanit text-white mb-4 text-sm uppercase tracking-wider">
              ติดต่อเรา
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-400 text-sm font-kanit">
                <MapPin size={16} className="text-primary flex-shrink-0 mt-0.5" />
                <span>จังหวัดสระบุรี ประเทศไทย 18000</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm font-kanit">
                <Phone size={16} className="text-secondary flex-shrink-0" />
                <span>062-xxx-xxxx</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm font-kanit">
                <Mail size={16} className="text-accent flex-shrink-0" />
                <span>info@saraburi-food.com</span>
              </li>
              <li>
                <a
                  href="https://maps.google.com/?q=สระบุรี"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-kanit text-gray-400 hover:text-accent transition-colors duration-200 mt-2"
                >
                  <ExternalLink size={14} />
                  ดูบน Google Maps
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm font-kanit text-center md:text-left">
              © {year} Saraburi Food Guide. สงวนลิขสิทธิ์ทุกประการ
            </p>
            <p className="text-gray-600 text-xs font-kanit flex items-center gap-1">
              สร้างด้วย <Heart size={12} className="text-primary fill-primary" /> สำหรับชาวสระบุรี
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
