import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Medal, Crown, Star } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";
import BackgroundLayout from "./BackgroundLayout";

/* =======================
   WINNERS DATA
======================= */
const winnersData = {
  FY: {
    gold: "Shruti Govilkar",
    silver: "Tanvi Nikam",
    bronze: "-",
  },
  SY: {
    gold: "Anushkaa Pawar",
    silver: "Ishwari Rautray",
    bronze: "Cheryl Varghese",
  },
  TY: {
    gold: "Ishanvi M.",
    silver: "Shruti Thakur",
    bronze: "Gautami Kulkarni",
  },
};

/* =======================
   CONFETTI COMPONENT
======================= */
const Confetti = ({ activeTab }) => {
  const colors = ["#a855f7", "#22d3ee", "#facc15", "#ffffff", "#ec4899"];
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pointer-events-none fixed inset-0 z-40 overflow-hidden"
    >
      {Array.from({ length: 100 }).map((_, i) => (
        <motion.div
          key={`${activeTab}-confetti-${i}`}
          initial={{ 
            x: `${Math.random() * 100}vw`, 
            y: -20, 
            rotate: 0, 
            opacity: 1 
          }}
          animate={{
            y: "110vh",
            rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
            x: `calc(${Math.random() * 100}vw + ${(Math.random() - 0.5) * 200}px)`,
          }}
          transition={{ 
            duration: 3 + Math.random() * 4, 
            repeat: Infinity, 
            ease: "linear",
            delay: Math.random() * 2 
          }}
          style={{
            position: "absolute",
            width: 6 + Math.random() * 8,
            height: 12 + Math.random() * 10,
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
            borderRadius: "2px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)"
          }}
        />
      ))}
    </motion.div>
  );
};

/* =======================
   REUSABLE PODIUM SPOT
======================= */
const PodiumSpot = ({ name, height, color, delay, isCenter = false, icon, medalLabel, className = "" }) => {
  const initials = name.split(' ').map(n => n[0]).join('');

  return (
    <div className={`flex flex-col items-center ${isCenter ? 'z-20 scale-[1.02] md:scale-105' : 'z-10'} w-1/3 md:w-72 ${className}`}>
      
      {/* Avatar & Name */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: delay + 0.3, duration: 0.8 }}
        className="flex flex-col items-center mb-4 md:mb-6 relative"
      >
        <div className={`relative mb-2 md:mb-4 group`}>
          <motion.div 
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className={`w-10 h-10 sm:w-16 sm:h-16 md:w-24 md:h-24 rounded-full border md:border-2 p-0.5 md:p-1 ${isCenter ? 'border-yellow-400/50' : 'border-white/20'} bg-white/5 backdrop-blur-md flex items-center justify-center relative overflow-hidden`}
          >
            <div className={`w-full h-full rounded-full flex items-center justify-center font-bold text-[10px] sm:text-xs md:text-2xl ${isCenter ? 'bg-yellow-400/20 text-yellow-200' : 'bg-white/10 text-gray-300'}`}>
              {initials}
            </div>
            
            {isCenter && (
              <div className="absolute inset-0 bg-yellow-400/10 blur-xl animate-pulse" />
            )}
          </motion.div>
          
          <motion.div 
            animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute -top-1 -right-1 bg-[#0a0e27] p-0.5 md:p-1.5 rounded-full border border-white/10 shadow-xl"
          >
            {React.cloneElement(icon, { size: undefined, className: "w-3 h-3 md:w-6 md:h-6" })}
          </motion.div>
        </div>

        <div className="text-center px-1 md:px-4">
          <h3 className={`font-black tracking-tight leading-none mb-0.5 md:mb-1 truncate w-full max-w-[80px] sm:max-w-none ${isCenter ? 'text-[10px] sm:text-sm md:text-3xl text-yellow-300' : 'text-[9px] sm:text-[11px] md:text-xl text-white'}`}>
            {name}
          </h3>
          <p className="text-[7px] md:text-xs font-bold uppercase tracking-widest text-gray-500">
            {isCenter ? "Champion" : "Finalist"}
          </p>
        </div>
      </motion.div>

      {/* Podium Pillar */}
      <div className="relative w-full px-1 md:px-0">
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ 
            duration: 1.2, 
            delay, 
            ease: [0.16, 1, 0.3, 1] 
          }}
          className={`origin-bottom w-full ${height} rounded-t-xl md:rounded-t-3xl bg-gradient-to-b ${color} shadow-[0_-20px_50px_-15px_rgba(0,0,0,0.5)] relative overflow-hidden group`}
        >
          <div className="absolute top-2 md:top-6 left-1/2 -translate-x-1/2 flex flex-col items-center">
             <span className="text-3xl sm:text-5xl md:text-8xl font-black select-none tracking-tighter opacity-40 text-white leading-none">
               {medalLabel[0]}
             </span>
             <span className="hidden sm:block text-[8px] md:text-sm font-bold uppercase tracking-[0.3em] text-white/60 -mt-2">
               Place
             </span>
          </div>

          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 translate-x-[-150%]"
            animate={{ x: ["-150%", "150%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/40 blur-[1px]" />
        </motion.div>

        {/* Base Glow */}
        <div className="absolute -bottom-4 md:-bottom-8 left-1/2 -translate-x-1/2 w-[90%] h-3 md:h-6 bg-purple-600/20 blur-xl md:blur-2xl rounded-full" />
      </div>
    </div>
  );
};

/* =======================
   MAIN PAGE COMPONENT
======================= */
const Winners = () => {
  const [activeTab, setActiveTab] = useState("SY");
  const [showConfetti, setShowConfetti] = useState(false);

  const winners = winnersData[activeTab];

  // Trigger confetti when tab changes
  useEffect(() => {
    setShowConfetti(true);
    const hideTimeout = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(hideTimeout);
  }, [activeTab]);

  return (
    <BackgroundLayout>
      <Header />
      
      <AnimatePresence>
        {showConfetti && <Confetti key={activeTab} activeTab={activeTab} />}
      </AnimatePresence>

      <main className="relative z-10 pt-32 pb-16 px-6 max-w-7xl mx-auto">

        {/* Title Section */}
        <section className="text-center mb-8 md:mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-purple-400 text-xs font-black tracking-[0.2em] mb-8"
          >
            <Star size={16} fill="currentColor" />
            <span>KAGGLE COMPETITION 2025</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-black tracking-tighter bg-gradient-to-b from-white via-white to-white/40 bg-clip-text text-transparent mb-12 leading-[0.9] text-center"
          >
            Meet Our Kaggle <br className="hidden md:block" /> Winners
          </motion.h1>

          {/* Year Tabs */}
          <div className="flex justify-center gap-3 p-2 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl w-fit mx-auto shadow-2xl">
            {["FY", "SY", "TY"].map((year) => (
              <button
                key={year}
                onClick={() => setActiveTab(year)}
                className={`px-10 py-3 rounded-2xl text-sm font-black transition-all duration-500 tracking-wider ${
                  activeTab === year
                    ? "bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </section>

        {/* Podium Section */}
        <section className="relative mt-8 md:mt-24">
          
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-yellow-400/5 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="flex flex-row items-end justify-center gap-2 md:gap-0 min-h-[400px] md:min-h-[600px] max-w-5xl mx-auto">

            {/* Silver - 2nd Place */}
            <PodiumSpot 
              key={`${activeTab}-silver`}
              name={winners.silver} 
              rank="Silver" 
              height="h-32 md:h-56" 
              color="from-slate-400/80 to-slate-800/90" 
              delay={0.4} 
              icon={<Medal className="text-slate-300" />}
              medalLabel="2nd"
              className="order-1"
            />

            {/* Gold - 1st Place */}
            <PodiumSpot 
              key={`${activeTab}-gold`}
              name={winners.gold} 
              rank="Gold" 
              height="h-44 md:h-80" 
              color="from-yellow-400/90 via-yellow-600/90 to-amber-900/95" 
              delay={0.2} 
              isCenter={true}
              icon={<Crown className="text-yellow-400" />}
              medalLabel="1st"
              className="order-2"
            />

            {/* Bronze - 3rd Place */}
            <PodiumSpot 
              key={`${activeTab}-bronze`}
              name={winners.bronze} 
              rank="Bronze" 
              height="h-24 md:h-40" 
              color="from-orange-600/80 to-orange-950/95" 
              delay={0.6} 
              icon={<Medal className="text-orange-400" />}
              medalLabel="3rd"
              className="order-3"
            />
          </div>
        </section>
      </main>

      <Footer />
    </BackgroundLayout>
  );
};

export default Winners;
