import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { eventsData } from "../constants";
import { X } from "lucide-react";

const NAVBAR_HEIGHT = 80;

const EventList = () => {
  const [selectedId, setSelectedId] = useState(null);
  const selectedEvent = eventsData.find((e) => e.id === selectedId);
  const selectedIndex = eventsData.findIndex((e) => e.id === selectedId);
  const isLeftColumn = selectedIndex % 2 === 0;

  return (
   <div className="relative min-h-screen text-white px-6 md:px-16 py-24">

      {/* Event grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-10 justify-items-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1.4,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        {eventsData.map((event, index) => {
          const isLeft = index % 2 === 0;
          return (
            <motion.div
              key={event.id}
              layoutId={`card-${event.id}`}
              onClick={() => setSelectedId(event.id)}
              whileHover={{
                scale: 1.04,
                boxShadow: `
                  0 0 30px 6px ${event.borderColor}aa,
                  0 0 80px 20px ${event.borderColor}55
                `,
                transition: {
                  duration: 0.3,
                  ease: [0.25, 0.1, 0.25, 1],
                },
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 1.1, ease: [0.25, 0.1, 0.25, 1] }}
              className={`relative cursor-pointer w-full max-w-[600px] bg-zinc-900/90 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 transition-all duration-700 ${
                isLeft ? "z-[30]" : "z-[20]"
              }`}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 25 }}
            >
              <motion.img
                src={event.thumbnail}
                alt={event.title}
                className="w-full h-72 object-cover"
                layoutId={`image-${event.id}`}
              />
              <motion.div
                className="absolute inset-0 flex flex-col justify-end p-5 
                bg-gradient-to-t from-black/80 via-black/30 to-transparent"
                layoutId={`overlay-${event.id}`}
              >
                <motion.h2
                  className="text-2xl font-semibold mb-1"
                  layoutId={`title-${event.id}`}
                >
                  {event.title}
                </motion.h2>
                <motion.p
                  className="text-gray-300 text-sm"
                  layoutId={`shortDesc-${event.id}`}
                >
                  {event.shortDescription}
                </motion.p>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Expanded view */}
      <AnimatePresence>
        {selectedEvent && (
          <>
            {/* Dim background */}
            <motion.div
              className="fixed inset-0 bg-black/70 backdrop-blur-md z-[90]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={() => setSelectedId(null)}
            />

            {/* Expanded card */}
            <motion.div
              key={`expanded-${selectedId}`}
              layoutId={`card-${selectedId}`}
              className="fixed inset-x-0 mx-auto w-[95vw] max-w-[1100px] 
              bg-zinc-900/95 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl border border-white/10 z-[120]"
              style={{
                top: `${NAVBAR_HEIGHT + 12}px`,
                height: `calc(100vh - ${NAVBAR_HEIGHT + 24}px)`,
              }}
              onClick={(e) => e.stopPropagation()}
              initial={{
                scale: 0.9,
                opacity: 0,
                y: 60,
                filter: "blur(12px)",
              }}
              animate={{
                scale: 1,
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: {
                  duration: 1.4,
                  ease: [0.16, 1, 0.3, 1],
                },
              }}
              exit={{
                scale: 0.9,
                opacity: 0,
                y: 60,
                filter: "blur(12px)",
                zIndex: 999,
                transition: {
                  duration: 1.2,
                  ease: [0.16, 1, 0.3, 1],
                },
              }}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedId(null)}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full z-[130] transition-all duration-300"
              >
                <X size={20} />
              </button>

              {/* Layout: dynamically flipped */}
              <motion.div
                className={`relative h-full flex flex-col md:flex-row ${
                  isLeftColumn ? "md:flex-row-reverse" : "md:flex-row"
                }`}
              >
                {/* Banner */}
                <motion.div
                  className="w-full md:w-[45%] h-72 md:h-full flex-shrink-0 overflow-hidden"
                  layoutId={`image-${selectedEvent.id}`}
                >
                  <motion.img
                    src={selectedEvent.banner}
                    alt={selectedEvent.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Description */}
                <motion.div
                  className="flex-1 md:w-[55%] overflow-y-auto p-8 custom-scrollbar"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      delay: 0.3,
                      duration: 1.2,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  }}
                  exit={{
                    opacity: 0,
                    y: 40,
                    transition: {
                      duration: 1.2,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  }}
                >
                  <motion.h2
                    className="text-3xl font-semibold mb-3"
                    layoutId={`title-${selectedEvent.id}`}
                  >
                    {selectedEvent.title}
                  </motion.h2>
                  <p className="text-gray-400 mb-3">{selectedEvent.date}</p>
                  <motion.p
                    className="text-gray-300 text-base leading-relaxed tracking-wide"
                    layoutId={`desc-${selectedEvent.id}`}
                  >
                    {selectedEvent.description}
                  </motion.p>
                </motion.div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EventList;