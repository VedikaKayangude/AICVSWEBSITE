import React from "react";
import Section from "./Section";
import Header from "./Header";
import Footer from "./Footer";
import { smallSphere, stars } from "../assets";
import Heading from "./Heading";
import EventList from "./EventList";
import { LeftLine, RightLine } from "./design/Pricing";
import BackgroundLayout from "./BackgroundLayout";

const Events = () => {
  return (
    <>
      {/* FIXED BACKGROUND BEHIND EVERYTHING */}
      <div className="fixed inset-0 -z-10">
        <BackgroundLayout />
      </div>

      <div>
        <Header />

        <Section className="overflow-hidden" id="pricing">
          <div className="container relative z-2">

            <h1
              className="text-center text-4xl md:text-6xl font-extrabold mb-4 
                bg-gradient-to-r from-purple-300 via-purple-500 to-purple-700
                text-transparent bg-clip-text tracking-wide uppercase"
            >
              EVENTS
            </h1>

            <p className="text-center text-lg md:text-2xl font-medium text-purple-200">
              Dive into every event organized by AICVS — tech sessions, workshops, hackathons, and more.
            </p>

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
