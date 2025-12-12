import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";
import kagglePoster from "../assets/Pre - Kaggle Poster.png";
import BackgroundLayout from "./BackgroundLayout";
import { Trophy, Calendar, Clock, BookOpen, Github, ExternalLink } from "lucide-react";

const Register = () => {
  const registerLink =
    "https://docs.google.com/forms/d/e/1FAIpQLSeBCvsE1oiieGQxHBuvzJ2SpguANwGeclzsjQfz3y5k6tiCFA/viewform?usp=sf_link";

  const repository =
    import.meta.env.VITE_REPOSITORY_LINK ||
    "https://github.com/example/aicvs-kaggle-learning";

  const kaggle = import.meta.env.VITE_KAGGLE_LINK || "https://www.kaggle.com/";

  const eventDate = new Date("December 18, 2025 00:00:00").getTime();
  const [timer, setTimer] = useState({
    days: 0,
    hours: 0,
    mins: 0,
    secs: 0,
  });

  // ⏳ Countdown Timer
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = eventDate - now;

      if (diff > 0) {
        setTimer({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          mins: Math.floor((diff / (1000 * 60)) % 60),
          secs: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const units = [
    { key: "days", label: "DAYS" },
    { key: "hours", label: "HOURS" },
    { key: "mins", label: "MINS" },
    { key: "secs", label: "SECS" },
  ];

  return (
    <div className="min-h-screen text-white flex flex-col overflow-hidden relative">
      {/* BackgroundLayout as the main background */}
      <div className="fixed inset-0 -z-10">
        <BackgroundLayout />
      </div>

      <Header />

      <div
        className="flex-1 flex flex-col items-center justify-center p-4 py-32 relative"
        style={{ zIndex: 2 }}
      >
      
        {/* Header Text */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-black mb-3"
            animate={{
              textShadow: [
                "0 0 20px rgba(168, 85, 247, 0.5)",
                "0 0 40px rgba(168, 85, 247, 0.8)",
                "0 0 20px rgba(168, 85, 247, 0.5)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-white">Welcome to </span>
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
              Kaggle 2025
            </span>
          </motion.h1>

          <motion.p
            className="text-xl sm:text-2xl text-gray-300 font-semibold mb-2"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Get Ready for the Kaggle Challenge!
          </motion.p>

          <motion.p
            className="text-base sm:text-lg text-gray-400"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Learn, practice, and compete—everything begins with your first step.
          </motion.p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-5xl w-full group"
        >
          <motion.div
            className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/30 via-transparent to-cyan-500/30 blur-xl"
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          {/* Main Content */}
          <div className="relative bg-gradient-to-br from-[#1a1f3a]/95 to-[#0f1225]/95 rounded-3xl border-2 border-purple-500/40 shadow-2xl overflow-hidden backdrop-blur-sm p-6 sm:p-7 md:p-8">
            <div className="grid md:grid-cols-2 gap-6 items-stretch">
              {/* Left Poster */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.03, rotateY: 3 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex items-stretch justify-center"
              >
                <div className="relative w-full flex">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-purple-500/40 to-cyan-500/40 blur-2xl rounded-3xl"
                    animate={{ opacity: [0.4, 0.7, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />

                  <div className="relative bg-gradient-to-br from-purple-900/50 to-cyan-900/50 rounded-2xl border-2 border-purple-400/60 p-4 w-full shadow-[0_0_30px_rgba(168,85,247,0.4)]">
                    <div className="rounded-xl overflow-hidden shadow-[0_0_40px_rgba(168,85,247,0.6)] w-full ring-2 ring-purple-500/30">
                      <img
                        src={kagglePoster}
                        alt="Kaggle 2025 Poster"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right Side — All Events, Countdown, Buttons */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col justify-between space-y-4"
              >
                {/* Pre-Kaggle Workshop */}
                <motion.div
                  className="relative bg-gradient-to-br from-purple-600/15 via-purple-700/10 to-transparent rounded-2xl p-4 backdrop-blur-sm shadow-[0_0_20px_rgba(168,85,247,0.2)]"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                        <Calendar className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-lg">Pre-Kaggle Workshop</h3>
                        <p className="text-purple-100 text-sm">Join the warm-up event</p>
                        <p className="text-purple-200 font-semibold text-xs">15th–18th December 2025</p>
                      </div>
                    </div>

                    <motion.a
                      href="https://docs.google.com/forms/d/e/1FAIpQLSfi8PbHe9FingN7VlZsRC56CL7sMg59E5y3nndWi9-aURTXRw/viewform"

                      target="_blank"
                      whileHover={{ scale: 1.1 }}
                      className="bg-purple-500 px-5 py-2 rounded-xl font-bold text-sm"
                    >
                      REGISTER
                    </motion.a>
                  </div>
                </motion.div>

                {/* Main Event */}
                <motion.div
                  className="relative bg-gradient-to-br from-purple-600/20 via-purple-700/12 to-transparent rounded-2xl p-4 backdrop-blur-sm 
                  shadow-[0_0_20px_rgba(168,85,247,0.2)]"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                      <Trophy className="w-7 h-7 text-white" />
                    </div>

                    <div>
                      <h3 className="text-white font-bold text-lg">Kaggle Competition</h3>
                      <p className="text-purple-100 text-sm">18th–30th December 2025</p>
                      <p className="text-purple-200 text-xs">
                        Work with real-world data, build models, compete & learn.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Countdown Timer */}
                <motion.div
                  className="relative bg-gradient-to-br from-purple-600/18 via-purple-700/10 to-transparent rounded-2xl p-4 backdrop-blur-sm"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-5 h-5 text-purple-300" />
                    <p className="text-purple-200 font-bold uppercase text-sm">
                      Event Starts In
                    </p>
                  </div>

                  <div className="grid grid-cols-4 gap-3">
                    {units.map(({ key, label }, index) => (
                      <motion.div key={key} className="text-center">
                        <motion.div
                          className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl p-3 shadow-[0_0_20px_rgba(168,85,247,0.6)] border-2 border-purple-400/50"
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                        >
                          <p className="text-2xl md:text-4xl font-black">
                            {String(timer[key]).padStart(2, "0")}
                          </p>
                        </motion.div>
                        <p className="text-xs text-gray-300 font-bold mt-1 uppercase">
                          {label}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Register Button */}
                <motion.a
                  href={registerLink}
                  target="_blank"
                  whileHover={{ scale: 1.05 }}
                  className="relative group"
                >
                  <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 rounded-xl py-3 px-6 text-center font-black text-base shadow-2xl border-2 border-white/30">
                    REGISTER NOW
                  </div>
                </motion.a>

                {/* Resources Section */}
                <motion.div
                  className="bg-gradient-to-br from-purple-600/12 via-purple-700/8 to-transparent rounded-2xl border-2 border-purple-400/35 p-4"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                      <BookOpen className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-white font-bold text-lg">Learning Resources</h3>
                  </div>

                  <div className="space-y-2 text-sm">
                    <motion.div className="flex items-center gap-2" whileHover={{ x: 3 }}>
                      <Github className="w-5 h-5 text-purple-400" />
                      <span className="text-gray-300">GitHub Repository:</span>
                      <a
                        href={repository}
                        target="_blank"
                        className="text-cyan-400 underline font-semibold"
                      >
                        Open GitHub
                      </a>
                    </motion.div>

                    <motion.div className="flex items-center gap-2" whileHover={{ x: 3 }}>
                      <ExternalLink className="w-5 h-5 text-cyan-400" />
                      <span className="text-gray-300">Kaggle:</span>
                      <a
                        href={kaggle}
                        target="_blank"
                        className="text-cyan-400 underline font-semibold"
                      >
                        Visit Kaggle
                      </a>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <Footer />
      </div>
    </div>
  );
};

export default Register;
