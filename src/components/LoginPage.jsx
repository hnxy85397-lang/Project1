import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Eye,
  EyeOff,
  User,
  Lock,
  LogIn,
  AlertCircle,
  Utensils,
  Star,
  MapPin,
} from 'lucide-react';

/* ── decorative food emoji that float behind the form ── */
const FOOD_EMOJIS = ['🍜', '🍛', '☕', '🥩', '🍮', '🌶️', '🍔', '🫕', '🍚'];

/* ── demo hint cards ── */
const DEMO_ACCOUNTS = [
  { username: 'admin', password: 'admin123', label: 'Admin', color: '#FF6B35' },
  { username: 'user',  password: 'user123',  label: 'User',  color: '#2EC4B6' },
  { username: 'demo',  password: 'demo123',  label: 'Demo',  color: '#FFB703' },
];

/* ─────────────────────────────────────────────── */
const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  /* clear error when user types */
  useEffect(() => { setError(''); }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      setError('กรุณากรอกชื่อผู้ใช้และรหัสผ่าน');
      triggerShake();
      return;
    }

    setLoading(true);
    /* small artificial delay for UX polish */
    await new Promise((r) => setTimeout(r, 700));

    const result = onLogin(username, password);
    setLoading(false);

    if (!result.success) {
      setError(result.error);
      triggerShake();
      setPassword('');
    }
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const fillDemo = (acc) => {
    setUsername(acc.username);
    setPassword(acc.password);
    setError('');
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-gray-950">

      {/* ── full-screen background image ── */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=85"
          alt="background"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-gray-900/75 to-primary/30" />
      </div>

      {/* ── animated colour blobs ── */}
      {[
        { color: '#FF6B35', top: '10%',  left: '-5%',   size: 400, delay: 0  },
        { color: '#2EC4B6', top: '60%',  right: '-5%',  size: 350, delay: 3  },
        { color: '#FFB703', top: '80%',  left: '30%',   size: 300, delay: 6  },
      ].map((blob, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full opacity-20 blur-[80px] pointer-events-none z-0"
          style={{
            width: blob.size,
            height: blob.size,
            background: blob.color,
            top: blob.top,
            left: blob.left,
            right: blob.right,
          }}
          animate={{ scale: [1, 1.15, 1], x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 10 + i * 2, repeat: Infinity, ease: 'easeInOut', delay: blob.delay }}
        />
      ))}

      {/* ── floating food emojis ── */}
      {FOOD_EMOJIS.map((emoji, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl select-none pointer-events-none z-0 opacity-30"
          style={{ left: `${8 + i * 11}%`, top: `${15 + (i % 4) * 18}%` }}
          animate={{ y: [0, -25, 0], rotate: [0, 10, -10, 0], opacity: [0.2, 0.45, 0.2] }}
          transition={{ duration: 4 + i * 0.6, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
        >
          {emoji}
        </motion.div>
      ))}

      {/* ── main card ── */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`relative z-10 w-full max-w-md mx-4 ${shake ? 'animate-shake' : ''}`}
        style={shake ? { animation: 'shake 0.4s ease' } : {}}
      >
        {/* glass card */}
        <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl shadow-black/40 overflow-hidden">

          {/* ── top brand banner ── */}
          <div className="relative px-8 pt-8 pb-6 text-center overflow-hidden">
            {/* subtle gradient top */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent pointer-events-none" />

            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-xl shadow-primary/40"
            >
              <Utensils size={28} className="text-white" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="text-2xl font-bold font-prompt bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
            >
              Saraburi Food Guide
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="text-white/60 text-sm font-kanit mt-1 flex items-center justify-center gap-1"
            >
              <MapPin size={13} className="text-primary" />
              รวมร้านอาหารเด็ด จังหวัดสระบุรี
            </motion.p>

            {/* mini stats row */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="flex items-center justify-center gap-4 mt-4 text-white/50 text-xs font-kanit"
            >
              {[
                { icon: <Utensils size={11} />, label: '12+ ร้าน' },
                { icon: <Star size={11} className="text-yellow-400" />, label: '4.6 เฉลี่ย' },
                { icon: <MapPin size={11} />, label: 'สระบุรี' },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-1">
                  {s.icon}
                  {s.label}
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── divider ── */}
          <div className="h-px mx-6 bg-white/10" />

          {/* ── form area ── */}
          <div className="px-8 py-7">
            <p className="text-white font-semibold font-kanit text-lg mb-5">เข้าสู่ระบบ</p>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>

              {/* username */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label className="block text-white/70 text-xs font-kanit mb-1.5 ml-1">
                  ชื่อผู้ใช้ (Username)
                </label>
                <div className="relative">
                  <User
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none"
                  />
                  <input
                    id="login-username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="กรอกชื่อผู้ใช้..."
                    autoComplete="username"
                    autoFocus
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder-white/30 font-kanit text-sm focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary/60 transition-all duration-200"
                  />
                </div>
              </motion.div>

              {/* password */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-white/70 text-xs font-kanit mb-1.5 ml-1">
                  รหัสผ่าน (Password)
                </label>
                <div className="relative">
                  <Lock
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none"
                  />
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="กรอกรหัสผ่าน..."
                    autoComplete="current-password"
                    className="w-full pl-10 pr-11 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder-white/30 font-kanit text-sm focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary/60 transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors"
                    tabIndex={-1}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </motion.div>

              {/* error message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -6, height: 0 }}
                    className="flex items-center gap-2 bg-red-500/15 border border-red-500/30 rounded-xl px-3.5 py-2.5 text-red-300 text-sm font-kanit"
                  >
                    <AlertCircle size={15} className="flex-shrink-0" />
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* submit */}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                type="submit"
                disabled={loading}
                whileHover={!loading ? { scale: 1.02 } : {}}
                whileTap={!loading ? { scale: 0.98 } : {}}
                className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold font-kanit text-base shadow-lg shadow-primary/30 hover:shadow-primary/50 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 mt-2"
              >
                {loading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white"
                    />
                    กำลังเข้าสู่ระบบ...
                  </>
                ) : (
                  <>
                    <LogIn size={18} />
                    เข้าสู่ระบบ
                  </>
                )}
              </motion.button>
            </form>
          </div>

          {/* ── demo accounts ── */}
          <div className="px-8 pb-8">
            <div className="h-px bg-white/10 mb-5" />
            <p className="text-white/40 text-xs font-kanit text-center mb-3">
              🔑 บัญชีทดสอบ — คลิกเพื่อเติมอัตโนมัติ
            </p>
            <div className="grid grid-cols-3 gap-2">
              {DEMO_ACCOUNTS.map((acc) => (
                <motion.button
                  key={acc.username}
                  type="button"
                  onClick={() => fillDemo(acc)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  className="flex flex-col items-center gap-1 py-2.5 px-2 rounded-xl bg-white/5 border border-white/10 hover:border-white/25 transition-all duration-200 group"
                >
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                    style={{ background: acc.color }}
                  >
                    {acc.label[0]}
                  </div>
                  <span className="text-white/60 group-hover:text-white text-xs font-kanit transition-colors">
                    {acc.username}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-white/30 text-xs font-kanit mt-4"
        >
          © 2026 Saraburi Food Guide · ข้อมูลปลอดภัยและเป็นส่วนตัว
        </motion.p>
      </motion.div>

      {/* ── inline shake keyframe ── */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          15%       { transform: translateX(-8px); }
          30%       { transform: translateX(8px); }
          45%       { transform: translateX(-6px); }
          60%       { transform: translateX(6px); }
          75%       { transform: translateX(-3px); }
          90%       { transform: translateX(3px); }
        }
        .animate-shake { animation: shake 0.4s ease; }
      `}</style>
    </div>
  );
};

export default LoginPage;
