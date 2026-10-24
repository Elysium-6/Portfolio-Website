"use client";
import React from "react";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section
      className="relative z-10 lg:py-16 bg-transparent min-h-[550px] sm:min-h-[400px] lg:min-h-[700px] flex items-center"
    >
      <div className="relative z-10 container mx-auto px-12 py-4 flex items-center">
        <div className="">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="col-span-8 place-self-center text-center sm:text-left justify-self-start"
          >
            <h1 className="text-white mb-4 text-[4rem] sm:text-[3rem] lg:text-[5rem] lg:leading-normal font-extrabold">
              <span className="text-white bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-600">
                Hello, I&apos;m{" "}
              </span>
              <br />
              <TypeAnimation
                sequence={[
                  "George",
                  1000,
                  "a Software Developer",
                  1000,
                  "a Game Developer",
                  1000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </h1>
            <p className="text-gray-200 text-center text-[15px] sm:text-[10px] mb-6 lg:text-[20px]">
              Just a guy who likes to code and make random stuff, hopefully stuff that is useful or at least interesting.
            </p>
            <div>
              <Link
                href="/#contact"
                className="px-6 inline-block py-3 w-full sm:w-fit rounded-full mr-4 bg-[#f3f3f3] hover:bg-[#121212] from-primary-500 to-secondary-500 text-black hover:text-white font-medium"
              >
                Hire Me
              </Link>
              <a
                href="/Resume.pdf"
                download="Resume.pdf"
                className="px-1 inline-block py-1 w-full sm:w-fit rounded-full mr-4 bg-[#121212] hover:bg-[#f3f3f3] text-white hover:text-black font-medium mt-3"
              >
                <span className="block bg-transparent px-5 py-2">
                  Download CV
                </span>
              </a>
            </div>
          </motion.div>
          {/* The commented image circle can be uncommented if needed */}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;