import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { jsPDF } from "jspdf";
import { motion, AnimatePresence } from "framer-motion";
import { Medal, Crown, Star, Zap, Brain, Trophy, Sparkles, Award, Download, ShieldCheck, XCircle, Loader2, RotateCcw } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";
import BackgroundLayout from "./BackgroundLayout";
import participantCertificate from "../assets/synapse-certificates/1.png";
import firstPlaceCertificate from "../assets/synapse-certificates/2.png";
import secondPlaceCertificate from "../assets/synapse-certificates/3.png";
import thirdPlaceCertificate from "../assets/synapse-certificates/4.png";
import {
  SYNAPSE_AWARD_RECIPIENTS,
  SYNAPSE_PARTICIPANTS,
} from "../data/synapseParticipants";

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
   SYNAPSE WINNERS DATA
======================= */
const synapseWinners = [
  {
    id: "ps1",
    ps: "PS-1",
    title: "Problem Statement 1",
    first: {
      team: "ImpactIQ",
      registeredTeam: "ImpactIQ",
      members: ["Asmita Sunil Wattamwar", "Shriya Jaripatke", "Utkarsha Mane"],
    },
    second: {
      team: "GOLD-DIGGERS",
      registeredTeam: "GOLD-DIGGERS",
      members: ["Vaishnavi Gaikwad", "Shaivi Jaiswal", "Manjiri Kularni"],
    },
  },
  {
    id: "ps2",
    ps: "PS-2",
    title: "Problem Statement 2",
    first: {
      team: "AIchemy",
      registeredTeam: "AIchemy",
      members: ["Purva Battawar", "Arpita Deodikar", "Jui Kulkarni"],
    },
    second: {
      team: "Chatgpteam",
      registeredTeam: "Chatgpteam",
      members: ["Khushi Attarde", "Kimaya Budhwani"],
    },
  },
  {
    id: "ps3",
    ps: "PS-3",
    title: "Problem Statement 3",
    first: {
      team: "Heisenbugs",
      registeredTeam: "Heisenbugs",
      members: ["Shreya Nigudkar", "Nandini Pathak"],
    },
    second: {
      team: "Visionista's",
      registeredTeam: "Team Visionista's",
      members: ["Shreya Chobhe", "Suchitra Sonar"],
    },
  },
];

const synapseSpecialMention = {
  team: "IndexZero",
  registeredTeam: "indexZero",
  members: ["Rutuja Khairnar", "Srushti Munot"],
};

const CERTIFICATE_TEMPLATES = {
  participant: participantCertificate,
  first: firstPlaceCertificate,
  second: secondPlaceCertificate,
  third: thirdPlaceCertificate,
};

const normalizeCertificateName = (value) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ');

const validateParticipantName = (inputName, participants) => {
  const normalized = normalizeCertificateName(inputName);
  if (!normalized || normalized.length < 2) return { valid: false };
  const exact = participants.find((p) => normalizeCertificateName(p) === normalized);
  if (exact) return { valid: true, name: exact };
  const close = participants.find((p) => {
    const pN = normalizeCertificateName(p);
    return (
      pN.includes(normalized) ||
      normalized.includes(pN) ||
      pN.split(' ').every((part) => normalized.includes(part)) ||
      normalized.split(' ').every((part) => pN.includes(part))
    );
  });
  if (close) return { valid: true, name: close, fuzzy: true };
  return { valid: false };
};

/* =======================
   FLOATING PARTICLES
======================= */
const FloatingParticles = () => {
  const particles = useMemo(() => 
    Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 4,
      duration: 8 + Math.random() * 12,
      delay: Math.random() * 5,
      color: ['rgba(168,85,247,0.4)', 'rgba(34,211,238,0.3)', 'rgba(250,204,21,0.3)', 'rgba(236,72,153,0.25)'][Math.floor(Math.random() * 4)]
    })), []
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
          }}
          animate={{
            y: [0, -80, 0],
            x: [0, (Math.random() - 0.5) * 60, 0],
            opacity: [0, 0.8, 0],
            scale: [0.5, 1.5, 0.5]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
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
      {Array.from({ length: 80 }).map((_, i) => (
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
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
            boxShadow: `0 0 6px ${colors[Math.floor(Math.random() * colors.length)]}`
          }}
        />
      ))}
    </motion.div>
  );
};

/* =======================
   ANIMATED TROPHY ICON
======================= */
const AnimatedTrophy = () => (
  <motion.div 
    className="relative inline-flex items-center justify-center mb-6"
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
  >
    {/* Outer Glow Ring */}
    <motion.div
      className="absolute w-20 h-20 md:w-28 md:h-28 rounded-full border border-yellow-400/20"
      animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.1, 0.3] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute w-16 h-16 md:w-24 md:h-24 rounded-full border border-purple-400/30"
      animate={{ scale: [1.1, 0.9, 1.1], opacity: [0.2, 0.5, 0.2], rotate: [0, 360] }}
      transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
    />
    
    {/* Trophy Circle */}
    <motion.div
      className="relative w-14 h-14 md:w-20 md:h-20 rounded-full flex items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, rgba(250,204,21,0.15), rgba(168,85,247,0.15))',
        boxShadow: '0 0 40px rgba(250,204,21,0.15), 0 0 80px rgba(168,85,247,0.1)',
      }}
      animate={{ rotate: [0, 5, -5, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      <Trophy className="w-7 h-7 md:w-10 md:h-10 text-yellow-400 drop-shadow-[0_0_12px_rgba(250,204,21,0.6)]" />
      
      {/* Sparkle Dots */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 md:w-1.5 md:h-1.5 bg-yellow-300 rounded-full"
          style={{
            top: `${50 + 45 * Math.sin((angle * Math.PI) / 180)}%`,
            left: `${50 + 45 * Math.cos((angle * Math.PI) / 180)}%`,
          }}
          animate={{ 
            opacity: [0, 1, 0], 
            scale: [0, 1.5, 0] 
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            delay: i * 0.3,
            ease: "easeInOut" 
          }}
        />
      ))}
    </motion.div>
  </motion.div>
);

/* =======================
   REUSABLE PODIUM SPOT (ENHANCED)
======================= */
const PodiumSpot = ({ name, height, color, delay, isCenter = false, icon, medalLabel, className = "" }) => {
  const initials = name.split(' ').map(n => n[0]).join('');
  
  const ringColors = isCenter
    ? 'from-yellow-400 via-amber-300 to-yellow-600'
    : medalLabel === '2nd'
    ? 'from-slate-300 via-gray-400 to-slate-500'
    : 'from-orange-400 via-amber-600 to-orange-700';

  return (
    <div className={`flex flex-col items-center ${isCenter ? 'z-20 scale-[1.02] md:scale-105' : 'z-10'} w-1/3 md:w-72 ${className}`}>
      
      {/* Avatar & Name */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: delay + 0.3, duration: 0.8 }}
        className="flex flex-col items-center mb-4 md:mb-6 relative"
      >
        <div className="relative mb-2 md:mb-4 group">
          {/* Orbiting Ring */}
          <motion.div
            className={`absolute -inset-2 md:-inset-3 rounded-full border-2 border-transparent bg-gradient-to-r ${ringColors} opacity-30`}
            style={{ 
              maskImage: 'linear-gradient(to bottom, transparent 40%, black)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 40%, black)',
              borderRadius: '50%',
              padding: '2px',
              background: `linear-gradient(135deg, ${isCenter ? 'rgba(250,204,21,0.3)' : 'rgba(255,255,255,0.1)'}, transparent)`,
            }}
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Pulsing Glow Behind Avatar */}
          {isCenter && (
            <motion.div 
              className="absolute -inset-4 md:-inset-6 rounded-full bg-yellow-400/10 blur-2xl"
              animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          )}

          <motion.div 
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className={`w-10 h-10 sm:w-16 sm:h-16 md:w-24 md:h-24 rounded-full p-[2px] md:p-[3px] relative overflow-hidden`}
            style={{
              background: isCenter 
                ? 'linear-gradient(135deg, #facc15, #f59e0b, #d97706)' 
                : medalLabel === '2nd' 
                ? 'linear-gradient(135deg, #94a3b8, #64748b, #475569)'
                : 'linear-gradient(135deg, #f97316, #ea580c, #c2410c)',
            }}
          >
            <div className={`w-full h-full rounded-full flex items-center justify-center font-bold text-[10px] sm:text-xs md:text-2xl bg-[#0a0e27] ${isCenter ? 'text-yellow-200' : 'text-gray-300'}`}>
              {initials}
            </div>
            
            {/* Shimmer Sweep on avatar */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
              animate={{ x: ['-150%', '150%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: delay }}
            />
          </motion.div>
          
          {/* Medal Badge */}
          <motion.div 
            animate={{ scale: [1, 1.15, 1], rotate: [0, 8, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute -top-1 -right-1 md:-top-2 md:-right-2 p-0.5 md:p-1.5 rounded-full shadow-xl"
            style={{
              background: isCenter 
                ? 'linear-gradient(135deg, #facc15, #f59e0b)' 
                : medalLabel === '2nd'
                ? 'linear-gradient(135deg, #94a3b8, #64748b)'
                : 'linear-gradient(135deg, #f97316, #ea580c)',
              boxShadow: isCenter 
                ? '0 0 15px rgba(250,204,21,0.5)' 
                : medalLabel === '2nd'
                ? '0 0 15px rgba(148,163,184,0.3)'
                : '0 0 15px rgba(249,115,22,0.3)',
            }}
          >
            {React.cloneElement(icon, { size: undefined, className: "w-3 h-3 md:w-5 md:h-5 text-[#0a0e27]" })}
          </motion.div>
        </div>

        <div className="text-center px-1 md:px-4">
          <h3 className={`font-black tracking-tight leading-none mb-0.5 md:mb-1 truncate w-full max-w-[80px] sm:max-w-none ${isCenter ? 'text-[10px] sm:text-sm md:text-2xl' : 'text-[9px] sm:text-[11px] md:text-lg text-white'}`}
            style={isCenter ? {
              background: 'linear-gradient(90deg, #facc15, #fbbf24, #fcd34d)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            } : {}}
          >
            {name}
          </h3>
          <p className={`text-[7px] md:text-xs font-bold uppercase tracking-widest ${isCenter ? 'text-yellow-500/60' : 'text-gray-600'}`}>
            {isCenter ? "★ Champion ★" : "Finalist"}
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
          className={`origin-bottom w-full ${height} rounded-t-xl md:rounded-t-3xl bg-gradient-to-b ${color} relative overflow-hidden group`}
          style={{
            boxShadow: isCenter 
              ? '0 -20px 60px -15px rgba(250,204,21,0.15), inset 0 1px 0 rgba(255,255,255,0.2)' 
              : '0 -20px 50px -15px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
          }}
        >
          {/* Rank Number + Label */}
          <div className="absolute top-3 md:top-6 left-1/2 -translate-x-1/2 flex flex-col items-center">
             <span className="text-3xl sm:text-5xl md:text-8xl font-black select-none tracking-tighter opacity-30 text-white leading-none"
               style={{ textShadow: isCenter ? '0 0 30px rgba(250,204,21,0.3)' : 'none' }}
             >
               {medalLabel[0]}
             </span>
             <span className="hidden sm:block text-[8px] md:text-sm font-bold uppercase tracking-[0.3em] text-white/50 -mt-2">
               Place
             </span>
          </div>

          {/* Shimmer Sweep */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12 translate-x-[-150%]"
            animate={{ x: ["-150%", "150%"] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 + delay }}
          />
          
          {/* Top Edge Highlight */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
          
          {/* Side Edge Highlights */}
          <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-white/30 to-transparent" />
          <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-white/20 to-transparent" />
        </motion.div>

        {/* Base Glow */}
        <motion.div 
          className={`absolute -bottom-4 md:-bottom-8 left-1/2 -translate-x-1/2 w-[90%] h-4 md:h-8 rounded-full blur-xl md:blur-2xl`}
          style={{ 
            backgroundColor: isCenter ? 'rgba(250,204,21,0.15)' : 'rgba(139,92,246,0.15)' 
          }}
          animate={{ opacity: [0.5, 1, 0.5], scaleX: [0.9, 1.1, 0.9] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>
    </div>
  );
};

/* =======================
   STATS BAR
======================= */
const StatsBar = ({ competition }) => {
  const stats = competition === 'Kaggle' 
    ? [
        { label: 'Total Participants', value: '150+', icon: <Star size={14} /> },
        { label: 'Competitions', value: '3', icon: <Award size={14} /> },
        { label: 'Year', value: '2025', icon: <Sparkles size={14} /> },
      ]
    : [
        { label: 'Problem Statements', value: '3', icon: <Brain size={14} /> },
        { label: 'Teams Competed', value: '40+', icon: <Zap size={14} /> },
        { label: 'Event Duration', value: '9hrs', icon: <Sparkles size={14} /> },
      ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="flex flex-wrap justify-center gap-3 md:gap-6 mb-12 md:mb-16"
    >
      {stats.map((stat, i) => (
        <motion.div 
          key={stat.label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 + i * 0.1 }}
          className="flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2.5 md:py-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-md"
        >
          <span className="text-purple-400">{stat.icon}</span>
          <div>
            <div className="text-white font-black text-sm md:text-lg tracking-tight">{stat.value}</div>
            <div className="text-gray-500 text-[8px] md:text-[10px] font-semibold uppercase tracking-widest">{stat.label}</div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

/* =======================
   SYNAPSE WINNERS GRID
======================= */
const SynapseView = ({ winners }) => {
  const accentColors = [
    { primary: '#22d3ee', glow: 'rgba(34,211,238,0.2)', gradient: 'from-cyan-400 to-blue-600' },
    { primary: '#a855f7', glow: 'rgba(168,85,247,0.2)', gradient: 'from-purple-400 to-violet-600' },
    { primary: '#f97316', glow: 'rgba(249,115,22,0.2)', gradient: 'from-orange-400 to-red-600' },
    { primary: '#10b981', glow: 'rgba(16,185,129,0.2)', gradient: 'from-emerald-400 to-teal-600' },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, type: "spring" }}
      className="relative mt-8 md:mt-16 w-full max-w-6xl mx-auto px-4 md:px-0"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-x-0 top-2 h-28 bg-[radial-gradient(circle,rgba(34,211,238,0.14),transparent_58%)] blur-3xl" />
        <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:34px_34px]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6 xl:gap-7 items-stretch">
        {winners.map((item, i) => {
          const accent = accentColors[i % accentColors.length];

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.55 }}
              whileHover={{ y: -8, scale: 1.015, rotateX: 2 }}
              className="group relative h-full min-h-[360px] rounded-[1.8rem] overflow-hidden"
              style={{
                border: `1px solid ${accent.primary}2e`,
                boxShadow: `0 16px 36px rgba(2,6,23,0.58), 0 0 0 1px rgba(255,255,255,0.03), 0 0 48px ${accent.glow}`,
                background: `linear-gradient(145deg, rgba(11,17,36,0.98), rgba(5,8,20,0.98))`,
              }}
            >
              <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:24px_24px]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_28%)]" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.26))]" />
              <div className="absolute inset-[1px] rounded-[1.7rem] border"
                style={{ borderColor: `${accent.primary}14` }}
              />
              <motion.div
                className="absolute -top-12 -right-12 w-44 h-44 rounded-full blur-[75px]"
                style={{ backgroundColor: `${accent.primary}32` }}
                animate={{ scale: [1, 1.18, 1], opacity: [0.45, 0.8, 0.45] }}
                transition={{ duration: 4.5, repeat: Infinity }}
              />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/45 to-transparent" />
              <motion.div
                className="absolute left-0 w-full h-[1px] z-20 pointer-events-none"
                style={{
                  background: `linear-gradient(to right, transparent, ${accent.primary}, transparent)`,
                  boxShadow: `0 0 12px ${accent.primary}`,
                }}
                animate={{ top: ['-5%', '105%'] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: 'linear', delay: i * 0.2 }}
              />
              <div
                className="absolute top-0 left-0 w-full h-[2px]"
                style={{ background: `linear-gradient(to right, transparent, ${accent.primary}, transparent)` }}
              />
              <div className="absolute top-0 left-0 w-14 h-14 border-t border-l rounded-tl-[1.8rem]"
                style={{ borderColor: `${accent.primary}66` }}
              />
              <div className="absolute top-0 right-0 w-12 h-12 border-t border-r rounded-tr-[1.8rem]"
                style={{ borderColor: `${accent.primary}22` }}
              />
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b border-l rounded-bl-[1.8rem]"
                style={{ borderColor: `${accent.primary}22` }}
              />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r rounded-br-[1.8rem]"
                style={{ borderColor: `${accent.primary}44` }}
              />
              <div className="absolute top-4 right-5 text-5xl md:text-6xl font-black italic text-white/[0.06] leading-none select-none pointer-events-none">
                {String(i + 1).padStart(2, '0')}
              </div>

              <div className="relative z-10 h-full p-5 md:p-6 flex flex-col">
                <div className="flex items-start gap-4 mb-5">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-[1.1rem] bg-gradient-to-br ${accent.gradient} p-[1px]`}
                      style={{ boxShadow: `0 10px 28px ${accent.glow}` }}
                    >
                      <div className="w-full h-full rounded-[1rem] bg-[#0a0c10] flex items-center justify-center">
                        <Zap style={{ color: accent.primary }} size={18} />
                      </div>
                    </div>
                    <div>
                      <div
                        className="font-bold tracking-[0.35em] text-sm uppercase"
                        style={{ color: accent.primary }}
                      >
                        {item.ps}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 mb-5 min-h-[92px] flex flex-col">
                  <div className="w-14 h-[2px] mb-3 rounded-full"
                    style={{ background: `linear-gradient(to right, ${accent.primary}, transparent)` }}
                  />
                  <h3 className="text-2xl md:text-[2rem] font-black text-white leading-tight tracking-tight max-w-[14ch]">
                    {item.title}
                  </h3>
                </div>

                <div className="mt-auto pt-4 border-t border-white/[0.08] space-y-4">
                  <div className="min-h-[104px] flex flex-col">
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] md:text-[10px] uppercase tracking-[0.2em] mb-2 font-bold"
                      style={{
                        backgroundColor: `${accent.primary}14`,
                        border: `1px solid ${accent.primary}38`,
                        color: accent.primary,
                      }}
                    >
                      <Crown size={12} /> 1st Place
                    </span>
                    <span
                      className="block text-xl md:text-2xl font-black tracking-tight min-h-[48px]"
                      style={{
                        background: `linear-gradient(90deg, white, ${accent.primary}, white)`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {item.first.team}
                    </span>
                    <p className="mt-1 text-sm text-white/75 leading-snug">
                      {item.first.members.join(", ")}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/[0.06] min-h-[104px] flex flex-col">
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] md:text-[10px] uppercase tracking-[0.2em] mb-2 font-bold"
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.08)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        color: 'rgba(255,255,255,0.85)',
                      }}
                    >
                      <Medal size={12} /> 2nd Place
                    </span>
                    <span className="block text-lg md:text-xl font-black tracking-tight text-white min-h-[44px]">
                      {item.second.team}
                    </span>
                    <p className="mt-1 text-sm text-white/65 leading-snug">
                      {item.second.members.join(", ")}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.28, duration: 0.55 }}
        className="relative mt-6 rounded-[1.8rem] overflow-hidden border border-amber-400/20"
        style={{
          boxShadow: '0 18px 42px rgba(2,6,23,0.58), 0 0 48px rgba(251,191,36,0.12)',
          background: 'linear-gradient(145deg, rgba(30,20,5,0.95), rgba(12,8,2,0.98))',
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.12),transparent_30%)]" />
        <div className="relative z-10 p-6 md:p-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] md:text-xs font-black tracking-[0.2em] uppercase text-amber-300 bg-amber-400/10 border border-amber-400/20 mb-4">
            <Award size={14} /> Special Mention Winner
          </span>
          <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            {synapseSpecialMention.team}
          </h3>
          <p className="mt-3 text-sm md:text-base text-white/70 leading-relaxed">
            {synapseSpecialMention.members.join(", ")}
          </p>
        </div>
      </motion.div>
    </motion.section>
  );
};

/* =======================
   CERTIFICATE CANVAS RENDERER
======================= */
const legacyDrawCertificate = (participantName) => {
  const W = 2400, H = 1600;
  const canvas = document.createElement('canvas');
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d');

  const roundedRect = (x, y, w, h, r) => {
    ctx.beginPath();
    ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  };

  // Background
  const bg = ctx.createRadialGradient(W/2, H/2, 100, W/2, H/2, W * 0.8);
  bg.addColorStop(0, '#111827'); bg.addColorStop(0.6, '#0a0e27'); bg.addColorStop(1, '#050816');
  ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

  // Ambient glows
  [[W*0.3, H*0.3, 400, 'rgba(168,85,247,0.05)'], [W*0.7, H*0.6, 350, 'rgba(34,211,238,0.04)'], [W*0.5, H*0.8, 300, 'rgba(250,204,21,0.03)']].forEach(([gx, gy, gr, gc]) => {
    const g = ctx.createRadialGradient(gx, gy, 0, gx, gy, gr);
    g.addColorStop(0, gc); g.addColorStop(1, 'transparent');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  });

  // Dot grid
  ctx.fillStyle = 'rgba(255,255,255,0.015)';
  for (let x = 80; x < W - 80; x += 40) for (let y = 80; y < H - 80; y += 40) {
    ctx.beginPath(); ctx.arc(x, y, 0.8, 0, Math.PI * 2); ctx.fill();
  }

  // Outer gold border
  roundedRect(40, 40, W - 80, H - 80, 24);
  ctx.strokeStyle = '#c8a84e'; ctx.lineWidth = 5; ctx.stroke();
  // Inner border
  roundedRect(58, 58, W - 116, H - 116, 18);
  ctx.strokeStyle = 'rgba(200,168,78,0.2)'; ctx.lineWidth = 1.5; ctx.stroke();

  // Corner ornaments
  const drawCorner = (cx, cy, sx, sy) => {
    ctx.save(); ctx.translate(cx, cy); ctx.scale(sx, sy);
    ctx.strokeStyle = '#c8a84e'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(0, 40); ctx.lineTo(0, 0); ctx.lineTo(40, 0); ctx.stroke();
    ctx.fillStyle = '#c8a84e'; ctx.beginPath();
    ctx.moveTo(0, 0); ctx.lineTo(6, -6); ctx.lineTo(12, 0); ctx.lineTo(6, 6); ctx.closePath(); ctx.fill();
    ctx.restore();
  };
  drawCorner(78, 78, 1, 1); drawCorner(W - 78, 78, -1, 1);
  drawCorner(78, H - 78, 1, -1); drawCorner(W - 78, H - 78, -1, -1);

  // Divider helper
  const drawDivider = (y, width) => {
    const grad = ctx.createLinearGradient(W/2 - width/2, 0, W/2 + width/2, 0);
    grad.addColorStop(0, 'transparent'); grad.addColorStop(0.15, 'rgba(200,168,78,0.3)');
    grad.addColorStop(0.5, 'rgba(200,168,78,0.7)'); grad.addColorStop(0.85, 'rgba(200,168,78,0.3)');
    grad.addColorStop(1, 'transparent');
    ctx.strokeStyle = grad; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(W/2 - width/2, y); ctx.lineTo(W/2 + width/2, y); ctx.stroke();
    ctx.fillStyle = '#c8a84e'; ctx.beginPath();
    ctx.moveTo(W/2, y - 5); ctx.lineTo(W/2 + 5, y); ctx.lineTo(W/2, y + 5); ctx.lineTo(W/2 - 5, y);
    ctx.closePath(); ctx.fill();
  };

  ctx.textAlign = 'center';

  // Stars
  ctx.fillStyle = '#c8a84e'; ctx.font = '20px serif';
  ctx.fillText('✦            ✦            ✦', W/2, 140);

  // AICVS branding
  ctx.font = '600 28px system-ui, sans-serif'; ctx.fillStyle = 'rgba(255,255,255,0.25)';
  ctx.fillText('A I C V S', W/2, 200);
  ctx.font = '300 18px system-ui, sans-serif'; ctx.fillStyle = 'rgba(255,255,255,0.15)';
  ctx.fillText('Artificial Intelligence & Computer Vision Society', W/2, 235);

  drawDivider(270, 500);

  // CERTIFICATE OF PARTICIPATION
  ctx.font = '200 48px Georgia, "Times New Roman", serif';
  ctx.fillStyle = 'rgba(255,255,255,0.75)';
  ctx.fillText('CERTIFICATE OF PARTICIPATION', W/2, 350);
  drawDivider(380, 600);

  // This is to certify that
  ctx.font = 'italic 32px Georgia, "Times New Roman", serif';
  ctx.fillStyle = 'rgba(255,255,255,0.4)';
  ctx.fillText('This is to certify that', W/2, 480);

  // PARTICIPANT NAME (gold gradient)
  ctx.font = 'bold 80px Georgia, "Times New Roman", serif';
  const nameGrad = ctx.createLinearGradient(W/2 - 500, 0, W/2 + 500, 0);
  nameGrad.addColorStop(0, '#d4a843'); nameGrad.addColorStop(0.25, '#fef3c7');
  nameGrad.addColorStop(0.5, '#f5d06c'); nameGrad.addColorStop(0.75, '#fef3c7');
  nameGrad.addColorStop(1, '#d4a843');
  ctx.fillStyle = nameGrad; ctx.fillText(participantName, W/2, 590);

  // Name underline
  const nameW = ctx.measureText(participantName).width;
  const ulG = ctx.createLinearGradient(W/2 - nameW/2 - 40, 0, W/2 + nameW/2 + 40, 0);
  ulG.addColorStop(0, 'transparent'); ulG.addColorStop(0.1, 'rgba(200,168,78,0.3)');
  ulG.addColorStop(0.5, 'rgba(200,168,78,0.6)'); ulG.addColorStop(0.9, 'rgba(200,168,78,0.3)');
  ulG.addColorStop(1, 'transparent');
  ctx.strokeStyle = ulG; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(W/2 - nameW/2 - 40, 610); ctx.lineTo(W/2 + nameW/2 + 40, 610); ctx.stroke();

  // has actively participated in
  ctx.font = 'italic 32px Georgia, "Times New Roman", serif';
  ctx.fillStyle = 'rgba(255,255,255,0.4)';
  ctx.fillText('has actively participated in', W/2, 700);

  // SYNAPSE 2025 (cyan-purple gradient)
  ctx.font = '900 90px system-ui, sans-serif';
  const synG = ctx.createLinearGradient(W/2 - 350, 0, W/2 + 350, 0);
  synG.addColorStop(0, '#22d3ee'); synG.addColorStop(0.5, '#a855f7'); synG.addColorStop(1, '#22d3ee');
  ctx.fillStyle = synG; ctx.fillText('SYNAPSE 2025', W/2, 830);

  ctx.font = '300 28px system-ui, sans-serif'; ctx.fillStyle = 'rgba(255,255,255,0.35)';
  ctx.fillText('The AI / ML Hackathon', W/2, 890);
  drawDivider(940, 400);

  // Organized by
  ctx.font = '400 24px system-ui, sans-serif'; ctx.fillStyle = 'rgba(255,255,255,0.25)';
  ctx.fillText('Organized by AICVS — Cummins College of Engineering, Pune', W/2, 1020);

  // Signature lines
  ctx.strokeStyle = 'rgba(255,255,255,0.15)'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(W * 0.18, H - 240); ctx.lineTo(W * 0.42, H - 240); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(W * 0.58, H - 240); ctx.lineTo(W * 0.82, H - 240); ctx.stroke();
  ctx.font = '20px system-ui, sans-serif'; ctx.fillStyle = 'rgba(255,255,255,0.2)';
  ctx.fillText('Faculty Advisor', W * 0.3, H - 210);
  ctx.fillText('Club Coordinator', W * 0.7, H - 210);

  // Bottom stars
  ctx.fillStyle = '#c8a84e'; ctx.font = '20px serif';
  ctx.fillText('✦            ✦            ✦', W/2, H - 120);

  return canvas.toDataURL('image/png');
};

const CERTIFICATE_NAME_POSITION = {
  x: 1000,
  y: 708,
  maxWidth: 1160,
};



const resolveCertificateType = (participantName) => {
  const normalized = normalizeCertificateName(participantName);

  if (SYNAPSE_AWARD_RECIPIENTS.first.some((name) => normalizeCertificateName(name) === normalized)) return 'first';
  if (SYNAPSE_AWARD_RECIPIENTS.second.some((name) => normalizeCertificateName(name) === normalized)) return 'second';
  if (SYNAPSE_AWARD_RECIPIENTS.third.some((name) => normalizeCertificateName(name) === normalized)) return 'third';

  return 'participant';
};

const loadCertificateTemplate = async (src) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
};

const drawCertificate = async (participantName, certificateType = 'participant') => {
  const templateSrc = CERTIFICATE_TEMPLATES[certificateType] || CERTIFICATE_TEMPLATES.participant;
  const templateImage = await loadCertificateTemplate(templateSrc);
  const canvas = document.createElement('canvas');
  const width = templateImage.naturalWidth || templateImage.width;
  const height = templateImage.naturalHeight || templateImage.height;
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  ctx.drawImage(templateImage, 0, 0);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#9c7721';

  let fontSize = 84;
  do {
    ctx.font = `italic 700 ${fontSize}px Georgia, "Times New Roman", serif`;
    fontSize -= 2;
  } while (ctx.measureText(participantName).width > CERTIFICATE_NAME_POSITION.maxWidth && fontSize > 42);

  ctx.shadowColor = 'rgba(255,255,255,0.3)';
  ctx.shadowBlur = 10;
  ctx.fillText(participantName, CERTIFICATE_NAME_POSITION.x, CERTIFICATE_NAME_POSITION.y);

  return canvas.toDataURL('image/png');
};

const generateCertificatePreview = async (participantName, certificateType = 'participant') => {
  try {
    return await drawCertificate(participantName, certificateType);
  } catch (error) {
    console.error('Certificate template render failed, using fallback renderer.', error);
    try {
      return legacyDrawCertificate(participantName);
    } catch (fallbackError) {
      console.error('Fallback certificate renderer failed.', fallbackError);
      throw fallbackError;
    }
  }
};

const getCertificateLabel = (certificateType) => {
  if (certificateType === 'first') return '1st Place';
  if (certificateType === 'second') return '2nd Place';
  if (certificateType === 'third') return '3rd Place';
  return 'Participation';
};

/* =======================
   CERTIFICATE SECTION COMPONENT
======================= */
const CertificateSection = () => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('idle');
  const [certUrl, setCertUrl] = useState(null);
  const [certificateType, setCertificateType] = useState('participant');
  const [matchedName, setMatchedName] = useState('');
  const [suggestedName, setSuggestedName] = useState('');
  const [scanText, setScanText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const certRef = useRef(null);
  const inputRef = useRef(null);

  const handleGenerate = async () => {
    if (!name.trim() || status === 'validating') return;
    setStatus('validating');
    setScanText('Verifying participant...');
    setErrorMessage('');
    try {
      const result = validateParticipantName(name, SYNAPSE_PARTICIPANTS);
      if (result.valid && !result.fuzzy) {
        const resolvedCertificateType = resolveCertificateType(result.name);
        setMatchedName(result.name);
        setCertificateType(resolvedCertificateType);
        setScanText('Generating certificate...');
        setCertUrl(await generateCertificatePreview(result.name, resolvedCertificateType));
        setStatus('success');
        setTimeout(() => certRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 300);
      } else if (result.valid && result.fuzzy) {
        setSuggestedName(result.name);
        setStatus('fuzzy');
      } else {
        setErrorMessage('Name not found in participant records. Please check the spelling and try again.');
        setStatus('error');
        setTimeout(() => setStatus('idle'), 4000);
      }
    } catch (error) {
      console.error('Certificate generation failed.', error);
      setErrorMessage('We could not generate the certificate right now. Please try again.');
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const confirmFuzzy = async () => {
    try {
      const resolvedCertificateType = resolveCertificateType(suggestedName);
      setMatchedName(suggestedName);
      setCertificateType(resolvedCertificateType);
      setStatus('validating');
      setScanText('Generating certificate...');
      await new Promise(r => setTimeout(r, 800));
      setCertUrl(await generateCertificatePreview(suggestedName, resolvedCertificateType));
      setStatus('success');
      setTimeout(() => certRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 300);
    } catch (error) {
      console.error('Fuzzy certificate generation failed.', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const handleDownload = () => {
    if (!certUrl) return;
    const img = new Image();
    img.onload = () => {
      const w = img.naturalWidth || img.width;
      const h = img.naturalHeight || img.height;
      const orientation = w >= h ? 'landscape' : 'portrait';
      const pdf = new jsPDF({ orientation, unit: 'px', format: [w, h] });
      pdf.addImage(certUrl, 'PNG', 0, 0, w, h);
      pdf.save(`Synapse_2025_${getCertificateLabel(certificateType).replace(/\s+/g, '_')}_${matchedName.replace(/\s+/g, '_')}.pdf`);
    };
    img.src = certUrl;
  };

  const handleReset = () => {
    setName(''); setStatus('idle'); setCertUrl(null);
    setCertificateType('participant');
    setMatchedName(''); setSuggestedName('');
    setErrorMessage('');
    setTimeout(() => inputRef.current?.focus(), 200);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="relative mt-24 md:mt-36 w-full max-w-5xl mx-auto px-4 pb-8"
    >
      {/* Section divider */}
      <div className="flex items-center gap-4 mb-16 md:mb-20 max-w-2xl mx-auto">
        <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <Sparkles size={16} className="text-purple-500/40" />
        <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* Section Header */}
      <div className="text-center mb-12 md:mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full border text-[10px] md:text-xs font-black tracking-[0.2em] mb-6"
          style={{
            background: 'linear-gradient(135deg, rgba(34,211,238,0.1), rgba(168,85,247,0.05))',
            borderColor: 'rgba(34,211,238,0.2)',
            color: '#22d3ee',
          }}
        >
          <ShieldCheck size={14} />
          <span>VERIFIED PARTICIPANTS ONLY</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-4 leading-[0.9]"
          style={{
            background: 'linear-gradient(180deg, #ffffff 0%, #ffffff 40%, rgba(34,211,238,0.6) 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}
        >
          Claim Your<br />Certificate
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-500 text-xs md:text-sm font-medium tracking-wide max-w-lg mx-auto"
        >
          Participated in Synapse 2025? Enter your registered name to generate and download your official Synapse certificate.
        </motion.p>
      </div>

      <AnimatePresence mode="wait">
        {status !== 'success' ? (
          /* ─── INPUT CARD ─── */
          <motion.div
            key="input-card"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="relative max-w-2xl mx-auto"
          >
            {/* Animated border glow */}
            <motion.div
              className="absolute -inset-[1px] rounded-3xl opacity-60 blur-[1px] pointer-events-none"
              style={{ background: 'linear-gradient(135deg, rgba(34,211,238,0.3), rgba(168,85,247,0.3), rgba(34,211,238,0.3))' }}
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 5, repeat: Infinity }}
            />

            <div className="relative bg-[#0b1022]/95 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/[0.06] overflow-hidden">
              {/* Scanning laser during validation */}
              {status === 'validating' && (
                <motion.div
                  className="absolute left-0 right-0 h-[2px] z-30 pointer-events-none"
                  style={{ background: 'linear-gradient(to right, transparent, #22d3ee, transparent)', boxShadow: '0 0 20px #22d3ee' }}
                  animate={{ top: ['0%', '100%', '0%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                />
              )}

              {/* Subtle grid inside card */}
              <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiNmZmZmZmYiLz48L3N2Zz4=')]" />

              {/* Label */}
              <label className="block text-[10px] md:text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-3">
                Full Name <span className="text-gray-600">(as registered)</span>
              </label>

              {/* Input */}
              <div className="relative mb-6">
                <input
                  ref={inputRef}
                  type="text"
                  value={name}
                  onChange={e => {
                    setName(e.target.value);
                    if (status === 'error') setStatus('idle');
                    if (errorMessage) setErrorMessage('');
                  }}
                  onKeyDown={e => e.key === 'Enter' && handleGenerate()}
                  placeholder="Enter your full name..."
                  disabled={status === 'validating'}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 md:py-5 text-white text-base md:text-lg font-medium placeholder-gray-600 outline-none transition-all duration-300 focus:border-cyan-500/40 focus:bg-white/[0.05] focus:shadow-[0_0_30px_rgba(34,211,238,0.1)] disabled:opacity-50"
                />
                {/* Focus glow ring */}
                <div className="absolute -inset-[1px] rounded-2xl pointer-events-none opacity-0 focus-within:opacity-100 transition-opacity"
                  style={{ boxShadow: '0 0 0 1px rgba(34,211,238,0.2)' }}
                />
              </div>

              {/* Error message */}
              <AnimatePresence>
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    className="flex items-center gap-3 mb-5 px-4 py-3 rounded-xl bg-red-500/5 border border-red-500/15"
                  >
                    <XCircle size={18} className="text-red-400 shrink-0" />
                    <span className="text-red-300/80 text-sm font-medium">
                      {errorMessage || 'Name not found in participant records. Please check the spelling and try again.'}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Fuzzy match suggestion */}
              <AnimatePresence>
                {status === 'fuzzy' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    className="mb-5 px-5 py-4 rounded-xl bg-amber-500/5 border border-amber-500/15"
                  >
                    <p className="text-amber-200/80 text-sm font-medium mb-3">
                      Did you mean <strong className="text-amber-300">{suggestedName}</strong>?
                    </p>
                    <div className="flex gap-3">
                      <button type="button" onClick={confirmFuzzy}
                        className="px-5 py-2 rounded-xl text-xs font-bold bg-amber-500/20 border border-amber-500/30 text-amber-300 hover:bg-amber-500/30 transition-all">
                        Yes, that's me
                      </button>
                      <button type="button" onClick={() => { setStatus('idle'); inputRef.current?.focus(); }}
                        className="px-5 py-2 rounded-xl text-xs font-bold bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 transition-all">
                        No, let me retype
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Generate button */}
              <motion.button
                type="button"
                onClick={handleGenerate}
                disabled={!name.trim() || status === 'validating'}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 md:py-5 rounded-2xl font-bold text-base md:text-lg transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                style={{
                  background: !name.trim() || status === 'validating'
                    ? 'rgba(255,255,255,0.05)'
                    : 'linear-gradient(135deg, #22d3ee, #a855f7)',
                  color: !name.trim() || status === 'validating' ? '#666' : '#fff',
                  boxShadow: name.trim() && status !== 'validating'
                    ? '0 0 30px rgba(34,211,238,0.2), 0 4px 15px rgba(0,0,0,0.3)' : 'none',
                }}
              >
                {status === 'validating' ? (
                  <span className="flex items-center justify-center gap-3">
                    <Loader2 className="animate-spin" size={20} />
                    {scanText}
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-3">
                    <Sparkles size={20} />
                    Generate Certificate
                  </span>
                )}
              </motion.button>

              {/* Hint text */}
              <p className="text-center text-gray-600 text-[10px] md:text-xs mt-4 font-medium">
                Only registered Synapse 2025 participants can generate certificates
              </p>
            </div>
          </motion.div>
        ) : (
          /* ─── CERTIFICATE PREVIEW ─── */
          <motion.div
            key="cert-preview"
            ref={certRef}
            initial={{ opacity: 0, scale: 0.9, rotateX: 15 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 0.8, type: 'spring', stiffness: 150 }}
            className="max-w-4xl mx-auto"
          >
            {/* Success badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex justify-center mb-6"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-wider">
                <ShieldCheck size={14} /> {getCertificateLabel(certificateType).toUpperCase()} CERTIFICATE GENERATED
              </span>
            </motion.div>

            {/* Certificate image with effects */}
            <div className="relative rounded-2xl overflow-hidden group"
              style={{ boxShadow: '0 0 80px rgba(34,211,238,0.08), 0 25px 60px rgba(0,0,0,0.5)' }}
            >
              <img src={certUrl} alt={`Synapse 2025 ${getCertificateLabel(certificateType)} Certificate`} className="w-full rounded-2xl block" />

              {/* Holographic shimmer */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent -skew-x-12 pointer-events-none"
                animate={{ x: ['-200%', '200%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              />

              {/* Scanning laser */}
              <motion.div
                className="absolute left-0 right-0 h-[1px] pointer-events-none"
                style={{ background: 'linear-gradient(to right, transparent, rgba(34,211,238,0.5), transparent)', boxShadow: '0 0 10px rgba(34,211,238,0.3)' }}
                animate={{ top: ['0%', '100%'] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
              />
            </div>

            {/* Action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 mt-8"
            >
              <motion.button
                type="button"
                onClick={handleDownload}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold text-base text-white transition-all"
                style={{
                  background: 'linear-gradient(135deg, #22d3ee, #a855f7)',
                  boxShadow: '0 0 30px rgba(34,211,238,0.2), 0 4px 15px rgba(0,0,0,0.3)',
                }}
              >
                <Download size={20} />
                Download {getCertificateLabel(certificateType)} Certificate
              </motion.button>
              <motion.button
                type="button"
                onClick={handleReset}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold text-base text-gray-400 bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] transition-all"
              >
                <RotateCcw size={18} />
                Generate Another
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

/* =======================
   MAIN PAGE COMPONENT
======================= */
const Winners = () => {
  const [activeCompetition, setActiveCompetition] = useState("Synapse");
  const [activeTab, setActiveTab] = useState("SY");
  const [showConfetti, setShowConfetti] = useState(false);

  const winners = winnersData[activeTab];

  useEffect(() => {
    setShowConfetti(true);
    const hideTimeout = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(hideTimeout);
  }, [activeTab, activeCompetition]);

  return (
    <BackgroundLayout>
      <Header />
      <FloatingParticles />
      
      <AnimatePresence>
        {showConfetti && <Confetti key={`${activeCompetition}-${activeTab}`} activeTab={`${activeCompetition}-${activeTab}`} />}
      </AnimatePresence>

      <main className="relative z-10 pt-28 md:pt-32 pb-16 px-4 md:px-6 max-w-7xl mx-auto min-h-screen">

        {/* Hero Title Section */}
        <section className="text-center mb-10 md:mb-16">
          
          <AnimatedTrophy />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 rounded-full border text-[10px] md:text-xs font-black tracking-[0.2em] mb-6 md:mb-8"
            style={{
              background: 'linear-gradient(135deg, rgba(168,85,247,0.1), rgba(34,211,238,0.05))',
              borderColor: 'rgba(168,85,247,0.2)',
              color: '#a855f7',
            }}
          >
            <Sparkles size={14} className="text-purple-400" />
            <span>2025 COMPETITIONS</span>
            <Sparkles size={14} className="text-cyan-400" />
          </motion.div>
          
          <motion.h1
            key={activeCompetition}
            initial={{ opacity: 0, y: 20, filter: "blur(10px)", scale: 0.95 }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl lg:text-9xl font-black tracking-tighter mb-4 leading-[0.85] text-center"
            style={{
              background: activeCompetition === 'Kaggle' 
                ? 'linear-gradient(180deg, #ffffff 0%, #ffffff 40%, rgba(250,204,21,0.6) 100%)'
                : 'linear-gradient(180deg, #ffffff 0%, #ffffff 40%, rgba(34,211,238,0.6) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {activeCompetition} <br className="hidden md:block" /> Winners
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-500 text-xs md:text-sm font-medium tracking-wide max-w-md mx-auto mb-10 md:mb-12"
          >
            Celebrating excellence and innovation across our flagship competitions
          </motion.p>

          {/* COMPETITION TOGGLE */}
          <div className="flex justify-center gap-2 p-1.5 backdrop-blur-2xl border border-white/10 rounded-full w-fit mx-auto shadow-2xl mb-10 md:mb-12"
            style={{ background: 'rgba(255,255,255,0.03)' }}
          >
            {["Kaggle", "Synapse"].map((comp) => (
              <motion.button
                key={comp}
                onClick={() => setActiveCompetition(comp)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-6 md:px-8 py-2.5 md:py-3 rounded-full text-xs md:text-sm font-black transition-all duration-300 tracking-wider flex items-center gap-2 ${
                  activeCompetition === comp
                    ? "text-black"
                    : "text-gray-400 hover:text-white"
                }`}
                style={activeCompetition === comp ? {
                  background: 'linear-gradient(135deg, #ffffff, #e2e8f0)',
                  boxShadow: '0 0 30px rgba(255,255,255,0.2), 0 4px 15px rgba(0,0,0,0.3)',
                } : {}}
              >
                {comp === "Kaggle" ? <Star size={14}/> : <Brain size={14}/>}
                {comp.toUpperCase()}
              </motion.button>
            ))}
          </div>

          {/* Stats Bar — Synapse only */}
          {activeCompetition === "Synapse" && <StatsBar competition={activeCompetition} />}

          {/* Kaggle Year Tabs */}
          {activeCompetition === "Kaggle" && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center gap-2 md:gap-3 p-1.5 md:p-2 backdrop-blur-2xl border border-white/10 rounded-2xl md:rounded-3xl w-fit mx-auto shadow-2xl"
              style={{ background: 'rgba(255,255,255,0.03)' }}
            >
              {["FY", "SY", "TY"].map((year) => (
                <motion.button
                  key={year}
                  onClick={() => setActiveTab(year)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 md:px-10 py-2.5 md:py-3 rounded-xl md:rounded-2xl text-xs md:text-sm font-black transition-all duration-500 tracking-wider ${
                    activeTab === year
                      ? "text-black"
                      : "text-gray-400 hover:text-white"
                  }`}
                  style={activeTab === year ? {
                    background: 'linear-gradient(135deg, #ffffff, #e2e8f0)',
                    boxShadow: '0 0 25px rgba(255,255,255,0.15)',
                  } : {}}
                >
                  {year}
                </motion.button>
              ))}
            </motion.div>
          )}
        </section>

        {/* KAGGLE PODIUM */}
        {activeCompetition === "Kaggle" && (
          <motion.section 
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.5 }}
            className="relative mt-8 md:mt-24"
          >
            {/* Spotlight Beams */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full pointer-events-none">
              <motion.div 
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-full opacity-[0.04]"
                style={{ background: 'linear-gradient(180deg, #facc15, transparent 70%)' }}
                animate={{ opacity: [0.03, 0.06, 0.03] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.div 
                className="absolute top-0 left-[20%] w-[150px] h-full opacity-[0.02]"
                style={{ background: 'linear-gradient(180deg, #94a3b8, transparent 50%)', transform: 'skewX(-10deg)' }}
                animate={{ opacity: [0.01, 0.03, 0.01] }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              />
              <motion.div 
                className="absolute top-0 right-[20%] w-[150px] h-full opacity-[0.02]"
                style={{ background: 'linear-gradient(180deg, #f97316, transparent 50%)', transform: 'skewX(10deg)' }}
                animate={{ opacity: [0.01, 0.03, 0.01] }}
                transition={{ duration: 5, repeat: Infinity, delay: 2 }}
              />
            </div>

            <div className="flex flex-row items-end justify-center gap-2 md:gap-0 min-h-[400px] md:min-h-[600px] max-w-5xl mx-auto">
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

            {/* Decorative Base Line */}
            <div className="max-w-5xl mx-auto mt-2">
              <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>
          </motion.section>
        )}

        {/* SYNAPSE NEURAL ACCORDION + CERTIFICATE */}
        {activeCompetition === "Synapse" && (
          <>
            <SynapseView winners={synapseWinners} />
            <CertificateSection />
          </>
        )}
      </main>

      <Footer />
    </BackgroundLayout>
  );
};

export default Winners;
