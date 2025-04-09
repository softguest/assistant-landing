import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const LandingSections = () => {
  return (
    <div className="bg-black text-white font-sans">
      <main className="flex-1">
        <section className="w-full py-16 md:py-28 lg:py-36 xl:py-52 bg-gradient-to-br from-[#22223b] to-[#1c0b1f]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-fuchsia-500 to-pink-600 text-transparent bg-clip-text drop-shadow-[0_0_10px_#ff0059]">
                  Welcome to SoftGuest – Your Partner in Digital Innovation
                </h1>
                <p className="mx-auto max-w-[700px] text-fuchsia-200 md:text-xl">
                👉 Tell us a bit about your business and what 
                you’re looking for help with — and we’ll show 
                you how we can support you.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild className="bg-fuchsia-700 hover:bg-fuchsia-800 text-white shadow-[0_0_15px_#ff0059]">
                  <Link href="/signup">Get Started</Link>
                </Button>
                <Button
                  variant="outline"
                  asChild
                  className="border-fuchsia-600 text-fuchsia-400 hover:bg-fuchsia-800/20"
                >
                  <Link href="#features">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section
          id="features"
          className="w-full py-16 md:py-24 lg:py-32 bg-slate-950"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tight sm:text-5xl text-center mb-16 text-fuchsia-400 drop-shadow-[0_0_10px_#ff0059]">
              Key Features
            </h2>
            <div className="grid gap-10 lg:grid-cols-3 lg:gap-12">
              {[
                {
                  title: "Effortless Note-Taking",
                  desc: "Quickly jot down your thoughts with our intuitive interface.",
                  icon: (
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  ),
                },
                {
                  title: "Secure Storage",
                  desc: "Your notes are encrypted and safely stored in the cloud.",
                  icon: (
                    <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                  ),
                },
                {
                  title: "Smart Search",
                  desc: "Find any note instantly with our powerful search feature.",
                  icon: (
                    <>
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.3-4.3" />
                    </>
                  ),
                },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center space-y-4 text-center bg-[#13131a] p-6 rounded-xl shadow-[0_0_20px_#ff0059]/20 hover:scale-105 transition-all duration-300"
                >
                  <div className="rounded-full bg-gradient-to-br from-fuchsia-600 to-pink-600 p-4 shadow-[0_0_15px_#ff0059]">
                    <svg
                      className="h-6 w-6 text-white"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {feature.icon}
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {feature.title}
                  </h3>
                  <p className="text-fuchsia-300">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingSections;
