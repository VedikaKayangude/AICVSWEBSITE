// Blog.jsx
import React, { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import Footer from './Footer'
import Header from './Header'
import BackgroundLayout from "./BackgroundLayout"; // <-- ADD THI

// Icons for the blog cards
const IconArrowUpRight = ({ className }) => <div className={className}>↗️</div>

// Floating Boxes Component
const FloatingBoxes = () => {
  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col space-y-4">
      {/* YouTube Box */}
      <motion.a
        href="https://youtube.com/@aicvscummins3964"
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-16 h-16 bg-black/90 backdrop-blur-sm border-2 border-purple-400/60 cursor-pointer group rounded-xl"
        initial={{ y: 0 }}
        animate={{ 
          y: [-10, 10, -10],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        whileHover={{ 
          scale: 1.1,
          y: 0,
          transition: { duration: 0.2 }
        }}
      >
        {/* Purple Glow Effect */}
        <div className="absolute -inset-2 bg-purple-500/30 blur-md rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Content */}
        <div className="w-full h-full flex items-center justify-center relative z-10">
          <span className="text-purple-300 font-bold text-sm">YT</span>
        </div>
        
        {/* Hover Tooltip */}
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
          YouTube
        </div>
      </motion.a>

      {/* GitHub Box */}
      <motion.a
        href="https://github.com/aicvs-cummins"
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-16 h-16 bg-black/90 backdrop-blur-sm border-2 border-purple-400/60 cursor-pointer group rounded-xl"
        initial={{ y: 0 }}
        animate={{ 
          y: [10, -10, 10],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5
        }}
        whileHover={{ 
          scale: 1.1,
          y: 0,
          transition: { duration: 0.2 }
        }}
      >
        {/* Purple Glow Effect */}
        <div className="absolute -inset-2 bg-purple-500/30 blur-md rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Content */}
        <div className="w-full h-full flex items-center justify-center relative z-10">
          <span className="text-purple-300 font-bold text-sm">GH</span>
        </div>
        
        {/* Hover Tooltip */}
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
          GitHub
        </div>
      </motion.a>
    </div>
  );
};

// Blog Card Data
const cardsData = [
  {
    id: 0,
    title: "Cloud Meets AI",
    titleGradient: "bg-gradient-to-r from-purple-300 to-purple-400",
    gradient: "linear-gradient(135deg, #a855f7, #7e22ce)",
    glowColor: "rgba(168, 85, 247, 0.7)",
    image: "https://static.vecteezy.com/system/resources/thumbnails/060/594/119/small_2x/cloud-computing-for-data-storage-and-transfer-for-safety-animation-isolated-on-black-background-video.jpg",
    shortDescription: "Training your models is one thing. Scaling them for millions of users is another. In this article, Ami Shah breaks down how cloud platforms like AWS bridge the gap between college ML projects and real-world AI systems.",
    link: "https://medium.com/@aicvs.cummins/footprints-4-0-cloud-meets-ai-why-every-ml-enthusiast-should-learn-cloud-basics-in-college-546963256ed6",
  },
  {
    id: 1,
    title: "My Unconventional ML Journey",
    titleGradient: "bg-gradient-to-r from-purple-300 to-purple-400",
    gradient: "linear-gradient(135deg, #c084fc, #9333ea)",
    glowColor: "rgba(192, 132, 252, 0.7)",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=500&h=300&fit=crop",
    shortDescription: "Not every journey into Machine Learning begins with a plan, sometimes, it starts with confusion, caffeine, and curiosity. Shreya Mote's story is a testament to learning by doing.",
    link: "https://medium.com/@aicvs.cummins/footprints-4-0-my-unconventional-journey-into-machine-learning-and-data-science-7f62ce84abd1",
  },
  {
    id: 2,
    title: "Navigating the Corporate Maze",
    titleGradient: "bg-gradient-to-r from-purple-300 to-purple-400",
    gradient: "linear-gradient(135deg, #d8b4fe, #a855f7)",
    glowColor: "rgba(216, 180, 254, 0.7)",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=500&h=300&fit=crop",
    shortDescription: "Internships aren't just about applying what you know, they're about discovering what you don't. Join Shruti Chandak as she shares her rollercoaster journey at BNY.",
    link: "https://medium.com/datadriveninvestor/navigating-the-corporate-maze-overcoming-the-chaos-of-outdated-hierarchies-and-lost-humanity-fbc4bd3c90b0",
  },
  {
    id: 3,
    title: "Seeing Beyond Sight",
    titleGradient: "bg-gradient-to-r from-purple-300 to-purple-400",
    gradient: "linear-gradient(135deg, #e9d5ff, #c084fc)",
    glowColor: "rgba(233, 213, 255, 0.7)",
    image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=500&h=300&fit=crop",
    shortDescription: "Turning vision into voice, seeing Beyond Sight is an AI-powered project by Ishita Shete that uses deep learning to describe images for the visually impaired.",
    link: "https://medium.com/@biancavintila/seeing-beyond-sight-how-your-mind-shapes-your-reality-68e6b269c1e3",
  },
  {
    id: 4,
    title: "AI in Cybersecurity",
    titleGradient: "bg-gradient-to-r from-purple-300 to-purple-400",
    gradient: "linear-gradient(135deg, #a855f7, #7c3aed)",
    glowColor: "rgba(168, 85, 247, 0.7)",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&h=300&fit=crop",
    shortDescription: "AI and cybersecurity didn't just redefine the digital world — they redefined Ritika Mukerjee's career. From exploring Python to working at MCCIA.",
    link: "https://medium.com/@ujjwaltripathi79/ai-in-cybersecurity-the-smart-shield-of-the-digital-age-f0a4fcc16ed4",
  }
];

// Platform Cards Component
const PlatformCards = () => {
  const [activeCard, setActiveCard] = useState(null)

  const platforms = [
    {
      id: 'github',
      name: 'GitHub',
      icon: '💻',
      gradient: 'from-purple-300 via-purple-400 to-purple-500',
      borderColor: 'border-purple-400/40',
      stat: 'Github',
      subtitle: 'Repositories',
      description: 'Open source projects & code',
      link: 'https://github.com/aicvs-cummins',
      position: 'left-[10%] -translate-x-1/2 translate-y-[-20px] rotate-[-6deg]',
      expertises: ['AI Projects', 'ML Models', 'Code Templates', 'Open Source']
    },
    {
      id: 'youtube',
      name: 'YouTube',
      icon: '🎥',
      gradient: 'from-purple-300 via-purple-400 to-purple-500',
      borderColor: 'border-purple-400/40',
      stat: 'Youtube',
      subtitle: 'Guide',
      description: 'Tutorials & tech content',
      link: 'https://youtube.com/@aicvscummins3964',
      position: 'left-[35%] -translate-x-1/2 translate-y-[15px] rotate-[4deg]',
      expertises: ['Tutorials', 'Demos', 'Workshops', 'Tech Talks']
    },
    {
      id: 'medium',
      name: 'Medium',
      icon: '📝',
      gradient: 'from-purple-300 via-purple-400 to-purple-500',
      borderColor: 'border-purple-400/40',
      stat: 'Medium',
      subtitle: 'Articles',
      description: 'Tech blogs & guides',
      link: 'https://medium.com/@aicvs.cummins',
      position: 'left-[60%] -translate-x-1/2 translate-y-[-15px] rotate-[-3deg]',
      expertises: ['Tech Blogs', 'Guides', 'Case Studies', 'Insights']
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: '💼',
      gradient: 'from-purple-300 via-purple-400 to-purple-500',
      borderColor: 'border-purple-400/40',
      stat: 'LinkedIn',
      subtitle: 'Connect',
      description: 'Professional network',
      link: 'https://www.linkedin.com/in/aicvs-cummins-253447387/',
      position: 'left-[85%] -translate-x-1/2 translate-y-[10px] rotate-[5deg]',
      expertises: ['Networking', 'Updates', 'Careers', 'Industry News']
    }
  ]

  return (
    <section className="min-h-screen bg-n-8 pt-20 overflow-hidden text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
            <span className="bg-gradient-to-r from-purple-300 to-purple-400 bg-clip-text text-transparent">Blogging</span> Hub
          </h1>
          <p className="text-lg text-purple-100">
            "Where innovation meets creation across every platform"
          </p>
        </div>

        {/* Cards Container */}
        <div className="relative h-[550px] w-full">
          {/* Platform Cards */}
          {platforms.map((platform) => (
            <div
              key={platform.id}
              className={`absolute transition-all duration-300 cursor-pointer ${platform.position} ${
                activeCard === platform.id
                  ? 'z-50 scale-110 !translate-y-0 !rotate-0 !left-1/2 !-translate-x-1/2'
                  : 'z-30 hover:scale-105 hover:translate-y-[-10px] hover:rotate-0'
              }`}
              style={{ width: '300px' }}
              onClick={() => setActiveCard(activeCard === platform.id ? null : platform.id)}
            >
              {/* Individual Glow Container */}
              <div className="relative">
                {/* Individual Box Glow */}
                <div className={`absolute -inset-3 rounded-2xl blur-xl bg-gradient-to-br ${platform.gradient} opacity-50 ${
                  activeCard === platform.id ? 'animate-pulse opacity-70' : 'opacity-30'
                }`} style={{
                  width: 'calc(100% + 1.5rem)',
                  height: 'calc(100% + 1.5rem)',
                  left: '-0.75rem',
                  top: '-0.75rem'
                }}></div>
                
                {/* Individual Outer Glow */}
                <div className={`absolute -inset-4 rounded-2xl blur-2xl bg-gradient-to-br ${platform.gradient} opacity-25 ${
                  activeCard === platform.id ? 'animate-pulse' : ''
                }`} style={{
                  width: 'calc(100% + 2rem)',
                  height: 'calc(100% + 2rem)',
                  left: '-1rem',
                  top: '-1rem'
                }}></div>

                {/* Black Box with Lighter Purple Border */}
                <div className={`w-full rounded-2xl p-6 relative overflow-hidden border-2 ${platform.borderColor} bg-black/90 backdrop-blur-sm`}>
                  {/* Inner Content - Lighter Purple Text */}
                  <div className="relative z-10">
                    {/* Big Stat Number */}
                    <div className="text-3xl font-black text-purple-300 mb-1 leading-none">
                      {platform.stat}
                    </div>
                    
                    {/* Subtitle */}
                    <div className="text-lg text-purple-200 mb-2 font-bold">
                      {platform.subtitle}
                    </div>

                    {/* Description */}
                    <div className="text-purple-100 text-sm mb-4 leading-relaxed">
                      {platform.description}
                    </div>

                    {/* Divider */}
                    <div className="w-full h-0.5 bg-purple-400/40 my-4"></div>

                    {/* Content Types */}
                    <div className="mb-4">
                      <div className="text-xs uppercase tracking-widest text-purple-200 mb-2 font-bold">
                        CONTENT TYPES
                      </div>
                      <div className="space-y-1.5">
                        {platform.expertises.map((expertise, index) => (
                          <div key={index} className="flex items-center text-xs text-purple-100 font-medium">
                            <div className="w-1.5 h-1.5 bg-purple-300 rounded-full mr-2"></div>
                            {expertise}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Second Divider */}
                    <div className="w-full h-0.5 bg-purple-400/40 my-4"></div>

                    {/* Platform Name */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-lg font-black text-purple-300">
                          {platform.name}
                        </div>
                        <div className="text-purple-200 text-xs mt-0.5">
                          {activeCard === platform.id ? 'Click to visit →' : 'Click to explore'}
                        </div>
                      </div>
                      <div className="w-8 h-8 bg-purple-400/20 rounded-full flex items-center justify-center text-purple-200 text-sm font-bold transition-transform duration-200 hover:scale-110">
                        →
                      </div>
                    </div>

                    {/* Visit Button - Only when active */}
                    {activeCard === platform.id && (
                      <div className="mt-4 pt-3 border-t border-purple-400/40">
                        <a
                          href={platform.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full text-center py-2 bg-purple-500 text-white rounded-lg text-xs font-bold hover:bg-purple-600 transition-all transform hover:scale-105 duration-200"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Visit {platform.name}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Floating Particles Effect */}
              <div className={`absolute -top-2 -right-2 w-3 h-3 bg-purple-300 rounded-full opacity-0 transition-opacity duration-300 ${
                activeCard === platform.id ? 'opacity-100 animate-bounce' : ''
              }`}></div>
              <div className={`absolute -bottom-2 -left-2 w-3 h-3 bg-purple-300 rounded-full opacity-0 transition-opacity duration-500 ${
                activeCard === platform.id ? 'opacity-100 animate-bounce delay-150' : ''
              }`}></div>
            </div>
          ))}

          {/* Close Button */}
          {activeCard && (
            <button
              onClick={() => setActiveCard(null)}
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-2 bg-purple-500 text-white rounded-lg text-sm font-bold hover:bg-purple-600 transition-all border border-purple-400 duration-200"
            >
              ← Back to all platforms
            </button>
          )}
        </div>

        {/* Instructions */}
        <div className="text-center mt-10 max-w-2xl mx-auto">
          <p className="text-purple-100 text-sm mb-3 font-medium">
            {activeCard ? 'Click the button to visit platform' : 'Hover to preview • Click to select'}
          </p>
          <div className="flex justify-center space-x-6">
            {platforms.map(platform => (
              <div key={platform.id} className="flex items-center group cursor-pointer" onClick={() => setActiveCard(platform.id)}>
                <div className="w-1.5 h-1.5 bg-purple-300 rounded-full mr-1.5 group-hover:scale-150 transition-transform duration-200"></div>
                <span className="text-purple-200 text-xs group-hover:text-purple-50 transition-colors duration-200">{platform.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Blog Card Stack Component with PROPER GLOW
// Blog Card Stack Component with PROPER GLOW
const BlogCardStack = () => {
  const scrollRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"], 
  });

  // All cards start from bottom and move up
  const card0_y = useTransform(scrollYProgress, [0, 0.10], ["120%", "0%"]);
  const card0_scale = useTransform(scrollYProgress, [0, 0.10, 0.22], [0.8, 1, 0.8]);
  const card0_opacity = useTransform(scrollYProgress, [0, 0.03, 0.18, 0.22], [0, 1, 1, 0]);

  const card1_y = useTransform(scrollYProgress, [0.15, 0.27], ["120%", "0%"]);
  const card1_scale = useTransform(scrollYProgress, [0.15, 0.27, 0.39], [0.8, 1, 0.8]);
  const card1_opacity = useTransform(scrollYProgress, [0.15, 0.18, 0.35, 0.39], [0, 1, 1, 0]);

  const card2_y = useTransform(scrollYProgress, [0.30, 0.42], ["120%", "0%"]);
  const card2_scale = useTransform(scrollYProgress, [0.30, 0.42, 0.54], [0.8, 1, 0.8]);
  const card2_opacity = useTransform(scrollYProgress, [0.30, 0.33, 0.50, 0.54], [0, 1, 1, 0]);

  const card3_y = useTransform(scrollYProgress, [0.45, 0.57], ["120%", "0%"]);
  const card3_scale = useTransform(scrollYProgress, [0.45, 0.57, 0.69], [0.8, 1, 0.8]);
  const card3_opacity = useTransform(scrollYProgress, [0.45, 0.48, 0.65, 0.69], [0, 1, 1, 0]);

  const card4_y = useTransform(scrollYProgress, [0.60, 0.72], ["120%", "0%"]);
  const card4_scale = useTransform(scrollYProgress, [0.60, 0.72, 0.84], [0.8, 1, 0.8]);
  const card4_opacity = useTransform(scrollYProgress, [0.60, 0.63, 0.80, 0.84], [0, 1, 1, 0]);

  const cardStyles = [
    { y: card0_y, scale: card0_scale, opacity: card0_opacity },
    { y: card1_y, scale: card1_scale, opacity: card1_opacity },
    { y: card2_y, scale: card2_scale, opacity: card2_opacity },
    { y: card3_y, scale: card3_scale, opacity: card3_opacity },
    { y: card4_y, scale: card4_scale, opacity: card4_opacity },
  ];

  return (
    <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-white">
      {/* Introduction text */}
      <motion.h1 
        className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-purple-400 tracking-tight"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        Explore Our Universe of Insights
      </motion.h1>

      <motion.p
        className="text-xl sm:text-2xl text-center text-purple-200 max-w-3xl mx-auto mt-2"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        Scroll to discover our latest articles
      </motion.p>
      
      {/* FIXED: Adjusted heights for mobile */}
      <div ref={scrollRef} className="relative h-[300vh] sm:h-[220vh] -mt-40 sm:-mt-96 pb-20 sm:pb-40">
        
        {/* FIXED: Adjusted sticky container height for mobile */}
        <div className="sticky top-0 h-[100vh] sm:h-[120vh] flex items-center justify-center">
          
          {/* FIXED: Adjusted card container height for mobile */}
          <div className="relative w-full max-w-6xl h-[80vh] sm:h-[70vh] flex items-center justify-center">
            
            <AnimatePresence>
              {cardsData.map((card, index) => (
                <motion.div
                  key={card.id}
                  // FIXED: Responsive height for mobile
                  className="absolute w-[90%] max-w-4xl h-[70vh] sm:h-[60vh] rounded-3xl overflow-hidden"
                  style={{
                    y: cardStyles[index].y,
                    scale: cardStyles[index].scale,
                    opacity: cardStyles[index].opacity,
                    zIndex: cardsData.length - index,
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* INTENSE PURPLE GLOW EFFECT */}
                  <div className="absolute -inset-4 sm:-inset-8 bg-gradient-to-br from-purple-600 via-purple-400 to-purple-600 rounded-3xl blur-2xl sm:blur-3xl opacity-70 animate-pulse"></div>
                  
                  {/* SECONDARY GLOW */}
                  <div className="absolute -inset-3 sm:-inset-6 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-3xl blur-xl sm:blur-2xl opacity-50"></div>

                  {/* MAIN GLOW BORDER */}
                  <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-purple-400 to-purple-600 rounded-3xl blur-lg sm:blur-xl opacity-60"></div>

                  {/* CORNER GLOW ORBS */}
                  <div className="absolute -top-5 -left-5 w-10 h-10 sm:-top-10 sm:-left-10 sm:w-20 sm:h-20 bg-purple-500 rounded-full blur-xl sm:blur-2xl opacity-80 animate-pulse"></div>
                  <div className="absolute -top-5 -right-5 w-10 h-10 sm:-top-10 sm:-right-10 sm:w-20 sm:h-20 bg-purple-500 rounded-full blur-xl sm:blur-2xl opacity-80 animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                  <div className="absolute -bottom-5 -left-5 w-10 h-10 sm:-bottom-10 sm:-left-10 sm:w-20 sm:h-20 bg-purple-500 rounded-full blur-xl sm:blur-2xl opacity-80 animate-pulse" style={{ animationDelay: '0.6s' }}></div>
                  <div className="absolute -bottom-5 -right-5 w-10 h-10 sm:-bottom-10 sm:-right-10 sm:w-20 sm:h-20 bg-purple-500 rounded-full blur-xl sm:blur-2xl opacity-80 animate-pulse" style={{ animationDelay: '0.9s' }}></div>

                  {/* Purple Background Gradient */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl"
                    style={{ background: card.gradient }}
                  />
                  
                  {/* Content Area */}
                  {/* FIXED: Adjusted padding and layout for mobile */}
                  <div className="absolute inset-0 rounded-3xl bg-black bg-opacity-95 p-4 sm:p-6 md:p-8 z-10 flex flex-col text-white border-2 border-purple-300/40 backdrop-blur-sm overflow-y-auto">
                    
                    {/* Title - Adjusted for mobile */}
                    <div className="mb-3 sm:mb-4">
                      <motion.h2 
                        className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-purple-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center"
                      >
                        {card.title}
                      </motion.h2>
                    </div>

                    {/* FIXED: Improved responsive layout for mobile */}
                    <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 items-start lg:items-center">
                      
                      {/* Image - Adjusted height for mobile */}
                      <motion.div
                        className="w-full h-48 sm:h-56 lg:h-full rounded-2xl overflow-hidden bg-black/40 border-2 border-purple-400/30 relative"
                      >
                        <motion.img
                          src={card.image}
                          alt={card.title}
                          className="w-full h-full object-cover"
                          onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/800x400/333/666?text=Image+Not+Found'; }}
                        />
                      </motion.div>

                      {/* Text Content - Adjusted for mobile */}
                      <div className="flex flex-col h-full">
                        <motion.p 
                          className="text-purple-100 text-sm sm:text-base md:text-lg leading-relaxed flex-1"
                        >
                          {card.shortDescription}
                        </motion.p>
                        
                        {/* Button - Adjusted for mobile */}
                        <motion.a
                          href={card.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="self-start mt-3 sm:mt-4 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl flex items-center space-x-2 hover:from-purple-400 hover:to-purple-500 transition-all duration-300 shadow-lg group text-sm sm:text-base font-semibold hover:scale-105 border border-purple-400/50 relative overflow-hidden"
                        >
                          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                          <span className="relative z-10">Read on Medium</span>
                          <IconArrowUpRight className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform relative z-10" />
                        </motion.a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
// Main Blog Component
const Blog = () => {
  return (
    <>
      <div className="fixed inset-0 -z-10">
        <BackgroundLayout />
      </div>

      <Header />
      <FloatingBoxes />
      <PlatformCards />
      <BlogCardStack />
      <Footer />
    </>
  );
};




export default Blog