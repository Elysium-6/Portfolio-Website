import React from "react";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section>
        <div className="grid grid-cols-1 lg:grid-cols-12">

            <div className="col-span-7 place-self-center">
                <h1 className="text-white mb-4 text-4xl lg:text-6xl font-extrabold">
                    Hello, I'm George
                </h1>
                <p className="text-[#ADB7BE] text-lg lg:text-xl">
                    I am a software/game developer currently studying Computer Science and Finance at the University of Hong Kong
                </p>
            </div>

            <div>
                Image
            </div>

        </div>
    </section>
    )
};

export default HeroSection;