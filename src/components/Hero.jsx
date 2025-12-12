import { useRef, useEffect } from "react";
import Section from "./Section";

const Hero = () => {
  const videoRefDesktop = useRef(null);
  const videoRefMobile = useRef(null);

  useEffect(() => {
    if (videoRefDesktop.current) videoRefDesktop.current.play().catch(() => {});
    if (videoRefMobile.current) videoRefMobile.current.play().catch(() => {});
  }, []);

  return (
    <Section
      id="hero"
      className="relative w-full mt-[80px] h-screen overflow-hidden"
    >
      {/* Desktop Video */}
      <video
        ref={videoRefDesktop}
        className="hidden sm:block absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="src/assets/FINAL AICVS HOME PAGE VIDEO.mp4" type="video/mp4" />
      </video>

      {/* Mobile Video */}
      <video
        ref={videoRefMobile}
        className="block sm:hidden absolute inset-0 w-full h-full object-contain bg-black"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="src\assets\Mobile_Video.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/20"></div>
    </Section>
  );
};

export default Hero;
