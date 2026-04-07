import React, { useState, useEffect, useRef, useCallback } from "react";
import Section from "./Section";
import Header from "./Header";
import Footer from "./Footer";
import { smallSphere, stars } from "../assets";
import Heading from "./Heading";
import EventList from "./EventList";
import { LeftLine, RightLine } from "./design/Pricing";
import BackgroundLayout from "./BackgroundLayout";

const synapsePhotos = [
  { id:  1, src: "https://placehold.co/800x560/1a0533/d8b4fe?text=Synapse+01", caption: "Opening Ceremony"  },
  { id:  2, src: "https://placehold.co/800x560/2d0a5e/e9d5ff?text=Synapse+02", caption: "Workshop Day"       },
  { id:  3, src: "https://placehold.co/800x560/0f0028/c084fc?text=Synapse+03", caption: "Panel Discussion"   },
  { id:  4, src: "https://placehold.co/800x560/1a0533/a855f7?text=Synapse+04", caption: "Team Building"      },
  { id:  5, src: "https://placehold.co/800x560/2d0a5e/d8b4fe?text=Synapse+05", caption: "Award Night"        },
  { id:  6, src: "https://placehold.co/800x560/0f0028/e9d5ff?text=Synapse+06", caption: "Closing Ceremony"   },
  { id:  7, src: "https://placehold.co/800x560/1a0533/d8b4fe?text=Synapse+07", caption: "Keynote Session"    },
  { id:  8, src: "https://placehold.co/800x560/2d0a5e/c084fc?text=Synapse+08", caption: "Networking Hour"    },
  { id:  9, src: "https://placehold.co/800x560/0f0028/a855f7?text=Synapse+09", caption: "Hackathon Kick-off" },
  { id: 10, src: "https://placehold.co/800x560/1a0533/e9d5ff?text=Synapse+10", caption: "Demo Presentations" },
  { id: 11, src: "https://placehold.co/800x560/2d0a5e/d8b4fe?text=Synapse+11", caption: "Guest Lecture"      },
  { id: 12, src: "https://placehold.co/800x560/0f0028/c084fc?text=Synapse+12", caption: "Lightning Talks"    },
  { id: 13, src: "https://placehold.co/800x560/1a0533/a855f7?text=Synapse+13", caption: "Quiz Night"         },
  { id: 14, src: "https://placehold.co/800x560/2d0a5e/e9d5ff?text=Synapse+14", caption: "Sponsor Showcase"   },
  { id: 15, src: "https://placehold.co/800x560/0f0028/d8b4fe?text=Synapse+15", caption: "Group Photo"        },
];

const SprocketRow = ({ count = 18 }) => (
  <div
    style={{
      display:        "flex",
      alignItems:     "center",
      justifyContent: "space-around",
      padding:        "5px 12px",
      background:     "#111",
    }}
  >
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        style={{
          width:        "14px",
          height:       "10px",
          borderRadius: "3px",
          background:   "#000",
          border:       "1px solid #333",
          flexShrink:   0,
        }}
      />
    ))}
  </div>
);

const FilmStripCarousel3D = () => {
  const total                 = synapsePhotos.length;
  const [offset, setOffset]   = useState(0);
  const targetRef             = useRef(0);
  const currentRef            = useRef(0);
  const rafRef                = useRef(null);
  const pausedRef             = useRef(false);
  const autoRef               = useRef(null);

  const animate = useCallback(() => {
    const diff = targetRef.current - currentRef.current;
    if (Math.abs(diff) > 0.0005) {
      currentRef.current += diff * 0.072;
      setOffset(currentRef.current);
    }
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [animate]);

  useEffect(() => {
    autoRef.current = setInterval(() => {
      if (!pausedRef.current) {
        targetRef.current += 1;
      }
    }, 3000);
    return () => clearInterval(autoRef.current);
  }, []);

  const goNext = () => { targetRef.current += 1; };
  const goPrev = () => { targetRef.current -= 1; };

  const centredIndex = ((Math.round(currentRef.current) % total) + total) % total;

  const CARD_W        = 280;
  const CARD_H        = 200;
  const FRAME_PAD     = 10;
  const CAPTION_H     = 44;
  const FRAME_TOTAL_W = CARD_W + FRAME_PAD * 2;
  const VISIBLE       = 5;
  const ARC_RADIUS    = 900;
  const ANGLE_STEP    = 22;

  const getFrameStyle = (slotOffset) => {
    const angle    = slotOffset * ANGLE_STEP;
    const angleRad = (angle * Math.PI) / 180;
    const x        = Math.sin(angleRad) * ARC_RADIUS;
    const z        = (Math.cos(angleRad) - 1) * ARC_RADIUS;
    const y        = Math.abs(slotOffset) * Math.abs(slotOffset) * 4;
    const rotateY  = -angle;
    const absSlot  = Math.abs(slotOffset);
    const opacity  = Math.max(0.15, 1 - absSlot * 0.22);
    const scale    = Math.max(0.72, 1 - absSlot * 0.085);

    return {
      transform: `translateX(${x}px) translateY(${y}px) translateZ(${z}px) rotateY(${rotateY}deg) scale(${scale})`,
      opacity,
      zIndex:    10 - Math.round(absSlot * 2),
      filter:    absSlot > 0 ? `brightness(${Math.max(0.45, 1 - absSlot * 0.22)})` : "brightness(1)",
    };
  };

  const slots = [];
  for (let s = -Math.floor(VISIBLE / 2); s <= Math.floor(VISIBLE / 2); s++) {
    slots.push(s);
  }

  return (
    <div
      style={{ width: "100%", marginBottom: "80px", marginTop: "40px", userSelect: "none" }}
      onMouseEnter={() => { pausedRef.current = true;  }}
      onMouseLeave={() => { pausedRef.current = false; }}
    >
      {/* ── Heading ── */}
      <p style={{
        textAlign:     "center",
        color:         "rgba(168,85,247,0.75)",
        fontSize:      "19px",
        letterSpacing: "0.45em",
        textTransform: "uppercase",
        fontFamily:    "monospace",
        marginBottom:  "8px",
      }}>
        latest events
      </p>
      <h2 style={{
        textAlign:      "center",
        fontSize:       "clamp(1.8rem, 3.5vw, 2.8rem)",
        fontWeight:     900,
        letterSpacing:  "0.14em",
        textTransform:  "uppercase",
        marginBottom:   "48px",
        color:          "#c084fc",
        textShadow:     "0 0 12px rgba(168,85,247,0.5), 0 0 28px rgba(139,92,246,0.25)",
        WebkitTextFillColor: "unset",
      }}>
        ✦ Synapse ✦
      </h2>

      {/* ── 3D Stage ── */}
      <div
        style={{
          position:    "relative",
          width:       "100%",
          height:      "420px",
          perspective: "1200px",
          overflow:    "hidden",
        }}
      >
        <div
          style={{
            position:       "absolute",
            top:            0,
            left:           0,
            right:          0,
            bottom:         0,
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            transformStyle: "preserve-3d",
          }}
        >
          {slots.map((slot) => {
            const fractional = currentRef.current - Math.round(currentRef.current);
            const slotOffset = slot - fractional;
            const photoIndex = ((Math.round(currentRef.current) + slot) % total + total) % total;
            const photo      = synapsePhotos[photoIndex];
            const isCenter   = Math.abs(slotOffset) < 0.5;
            const style3d    = getFrameStyle(slotOffset);

            return (
              <div
                key={`slot-${slot}`}
                onClick={() => { if (slot > 0) goNext(); else if (slot < 0) goPrev(); }}
                style={{
                  position:   "absolute",
                  width:      `${FRAME_TOTAL_W}px`,
                  cursor:     slot === 0 ? "default" : "pointer",
                  transition: "none",
                  ...style3d,
                }}
              >
                <div
                  style={{
                    background:   "#111",
                    borderRadius: "4px",
                    overflow:     "hidden",
                    boxShadow:    isCenter
                      ? "0 0 0 1px #333, 0 24px 60px rgba(0,0,0,0.9), 0 0 40px rgba(139,92,246,0.45)"
                      : "0 0 0 1px #222, 0 12px 30px rgba(0,0,0,0.8)",
                    transition:   "box-shadow 0.4s ease",
                  }}
                >
                  <SprocketRow count={12} />

                  <div style={{ background: "#111", padding: "0 10px" }}>
                    <div style={{ background: "#fffef8", padding: "8px 8px 0 8px" }}>
                      <img
                        src={photo.src}
                        alt={photo.caption}
                        draggable={false}
                        style={{
                          width:     "100%",
                          height:    `${CARD_H}px`,
                          objectFit: "cover",
                          display:   "block",
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ background: "#111", padding: "0 10px 8px" }}>
                    <div
                      style={{
                        background:     "#fffef8",
                        padding:        "6px 8px 8px",
                        minHeight:      `${CAPTION_H}px`,
                        display:        "flex",
                        flexDirection:  "column",
                        alignItems:     "center",
                        justifyContent: "center",
                      }}
                    >
                      <p style={{
                        fontFamily:    "'Caveat','Segoe Print',cursive",
                        fontSize:      "14px",
                        color:         "#3d1f6e",
                        textAlign:     "center",
                        letterSpacing: "0.03em",
                        margin:        0,
                      }}>
                        {photo.caption}
                      </p>
                      {isCenter && (
                        <p style={{
                          fontFamily:    "monospace",
                          fontSize:      "9px",
                          color:         "#8b5cf6",
                          letterSpacing: "0.2em",
                          marginTop:     "3px",
                        }}>
                          {String(photoIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                        </p>
                      )}
                    </div>
                  </div>

                  <SprocketRow count={12} />
                </div>

                {isCenter && (
                  <div
                    style={{
                      position:      "absolute",
                      inset:         "-4px",
                      borderRadius:  "7px",
                      border:        "1.5px solid rgba(139,92,246,0.55)",
                      pointerEvents: "none",
                      boxShadow:     "0 0 20px 4px rgba(139,92,246,0.25)",
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Left fade vignette */}
        <div
          style={{
            position:      "absolute",
            top: 0, left: 0,
            width:         "18%",
            height:        "100%",
            background:    "linear-gradient(to right, rgba(0,0,0,0.85), transparent)",
            pointerEvents: "none",
            zIndex:        50,
          }}
        />
        {/* Right fade vignette */}
        <div
          style={{
            position:      "absolute",
            top: 0, right: 0,
            width:         "18%",
            height:        "100%",
            background:    "linear-gradient(to left, rgba(0,0,0,0.85), transparent)",
            pointerEvents: "none",
            zIndex:        50,
          }}
        />

        {/* Arrow buttons */}
        <button
          onClick={goPrev}
          style={{
            position:       "absolute",
            left:           "12px",
            top:            "50%",
            transform:      "translateY(-50%)",
            zIndex:         60,
            background:     "rgba(0,0,0,0.5)",
            border:         "1px solid rgba(139,92,246,0.35)",
            color:          "#c084fc",
            borderRadius:   "50%",
            width:          "40px",
            height:         "40px",
            fontSize:       "22px",
            cursor:         "pointer",
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            backdropFilter: "blur(4px)",
            transition:     "background 0.2s, color 0.2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(88,28,135,0.7)"; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(0,0,0,0.5)"; e.currentTarget.style.color = "#c084fc"; }}
          aria-label="Previous"
        >‹</button>
        <button
          onClick={goNext}
          style={{
            position:       "absolute",
            right:          "12px",
            top:            "50%",
            transform:      "translateY(-50%)",
            zIndex:         60,
            background:     "rgba(0,0,0,0.5)",
            border:         "1px solid rgba(139,92,246,0.35)",
            color:          "#c084fc",
            borderRadius:   "50%",
            width:          "40px",
            height:         "40px",
            fontSize:       "22px",
            cursor:         "pointer",
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            backdropFilter: "blur(4px)",
            transition:     "background 0.2s, color 0.2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(88,28,135,0.7)"; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(0,0,0,0.5)"; e.currentTarget.style.color = "#c084fc"; }}
          aria-label="Next"
        >›</button>
      </div>

      {/* ── Dot indicators ── */}
      <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "20px", flexWrap: "wrap" }}>
        {synapsePhotos.map((_, i) => (
          <button
            key={i}
            onClick={() => { targetRef.current = Math.round(currentRef.current) + ((i - centredIndex + total) % total <= total / 2 ? (i - centredIndex + total) % total : (i - centredIndex + total) % total - total); }}
            style={{
              width:        i === centredIndex ? "22px" : "7px",
              height:       "7px",
              borderRadius: "9999px",
              background:   i === centredIndex ? "#a855f7" : "rgba(255,255,255,0.18)",
              border:       "none",
              cursor:       "pointer",
              transition:   "all 0.3s ease",
              padding:      0,
            }}
            aria-label={`Photo ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

// ─── Page ───────────────────────────────────────────────────────────────────
const Events = () => {
  return (
    <>
      <div className="fixed inset-0 -z-10">
        <BackgroundLayout />
      </div>

      <div>
        <Header />

        <Section className="overflow-hidden" id="pricing">
          <div className="container relative z-2">

            <h1
              className="text-center text-4xl md:text-6xl font-extrabold mb-4 mt-16 
                bg-gradient-to-r from-purple-300 via-purple-500 to-purple-700
                text-transparent bg-clip-text tracking-wide uppercase"
            >
              EVENTS
            </h1>
            <p className="text-center text-lg md:text-2xl font-medium text-purple-200">
              Dive into every event organized by AICVS — tech sessions, workshops, hackathons, and more.
            </p>

            <FilmStripCarousel3D />

            <div className="relative">
              <EventList />
              <LeftLine />
              <RightLine />
            </div>
          </div>
        </Section>

        <Footer />
      </div>
    </>
  );
};

export default Events;