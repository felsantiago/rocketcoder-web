"use client";

import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence } from "framer-motion";
import { calsans } from '@/lib/fonts/calsans';
import { cn } from '@/lib/utils';
import Image from "next/image";

interface Step {
  title: string;
  description: string;
  imageSrc: string;
}

const steps: Step[] = [
  {
    title: "Login to Ghost Coder",
    description: "Create an account and login to Ghost Coder. Get instant access to our AI-powered interview solution generator.",
    imageSrc: "/images/howitworks/login.png",
  },
  {
    title: "Start taking screenshots",
    description: "Use ⌘ + H to capture the problem. Up to 2 screenshots will be saved and shown on the application.",
    imageSrc: "/images/howitworks/screenshot.png",
  },
  {
    title: "Get your solutions",
    description: "After taking screenshots, press ⌘ + ↵ to generate detailed AI solutions and explanations.",
    imageSrc: "/images/howitworks/solution.png",
  },
  {
    title: "Debug and improve your code",
    description: "Capture additional screenshots to get optimized code versions and improvements instantly.",
    imageSrc: "/images/howitworks/debug.png",
  },
];

export function HowItWorks() {
  const [currentStep, setCurrentStep] = useState(0);

  const handleChange = (inView: boolean, index: number) => {
    if (inView) {
      setCurrentStep(index);
    }
  };

  return (
    <section className="relative w-full bg-black text-white overflow-x-hidden">
      {/* Title */}
      <div className="flex flex-col items-start justify-center px-6 md:px-20 py-16">
        <div className="flex items-center mb-4">
          <div className="w-2 h-6 bg-green-500 mr-3 animate-pulse"></div>
          <h2 className={cn(calsans.className, "tracking-tighter text-4xl md:text-5xl text-green-400")}>
            Como Funciona
          </h2>
        </div>
        <p className="text-neutral-400 max-w-xl text-sm font-mono border-l border-green-500/30 pl-4">
          &gt; Terminal session initiated_<br />
          &gt; Loading operation sequence...<br />
          &gt; Scroll to view steps_
        </p>
      </div>

      {/* Fixed terminal screen */}
      <div className="sticky top-0 left-0 w-full h-[80vh] flex flex-col items-center justify-start bg-black border-t border-green-500/20">
        <div className="w-full max-w-5xl h-full flex flex-col items-center px-6 md:px-10 relative">
          {/* Terminal header */}
          <div className="w-full flex items-center justify-between border-b border-green-500/20 py-2 px-4 bg-black text-xs font-mono">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-green-400">ghost@coder:~/solutions</div>
            <div className="text-neutral-500">v1.0.1</div>
          </div>

          {/* Terminal content */}
          <div className="w-full h-full py-4 overflow-hidden relative flex flex-col">
            {/* Step indicators */}
            <div className="absolute left-4 top-4 bottom-4 w-[2px] bg-green-500/20 flex flex-col justify-between">
              {steps.map((_, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "w-3 h-3 -ml-[5px] rounded-full transition-all duration-300",
                    currentStep === idx
                      ? "bg-green-500 shadow-[0_0_8px_#22c55e]"
                      : currentStep > idx
                        ? "bg-green-800"
                        : "bg-green-900"
                  )}
                ></div>
              ))}
            </div>

            {/* Step content */}
            <div className="flex-1 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="flex flex-col md:flex-row w-full pl-10 md:pl-16 items-center gap-6 md:gap-10"
                >
                  {/* Text */}
                  <div className="md:w-2/5 text-left">
                    <div className="flex items-center mb-3">
                      <span className="font-mono text-green-500 mr-2">$</span>
                      <h3 className={cn(calsans.className, "text-2xl md:text-3xl font-bold text-green-400")}>
                        {steps[currentStep].title}
                      </h3>
                    </div>
                    <p className="text-neutral-400 text-sm md:text-base leading-relaxed font-mono">
                      {steps[currentStep].description}
                    </p>
                  </div>

                  {/* Image */}
                  <div className="md:w-3/5 bg-neutral-900/80 border border-green-900/50 rounded overflow-hidden">
                    <div className="border-b border-green-900/50 py-1 px-2 flex justify-between items-center bg-neutral-900 text-xs font-mono">
                      <span className="text-green-500">output_preview.png</span>
                      <span className="text-neutral-500">↓</span>
                    </div>
                    <Image
                      src={steps[currentStep].imageSrc}
                      alt={steps[currentStep].title}
                      width={700}
                      height={500}
                      className="w-full h-auto object-contain p-2"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Command input */}
            <div className="mt-auto border-t border-green-500/20 p-3 font-mono text-sm flex items-center">
              <span className="text-green-500 mr-2">$</span>
              <span className="text-white">step_{currentStep + 1} --execute</span>
              <span className="ml-1 w-2 h-5 bg-green-500 animate-pulse"></span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll sections */}
      <div className="relative">
        {steps.map((step, index) => (
          <Step
            key={index}
            index={index}
            title={step.title}
            description={step.description}
            imageSrc={step.imageSrc}
            isVisible={currentStep === index}
            onInView={(inView: boolean) => handleChange(inView, index)}
          />
        ))}
      </div>
    </section>
  );
}

interface StepProps {
  index: number;
  title: string;
  description: string;
  imageSrc: string;
  isVisible: boolean;
  onInView: (inView: boolean) => void;
}

function Step({ index, title, description, imageSrc, isVisible, onInView }: StepProps) {
  const { ref, inView } = useInView({ threshold: 0.5 });

  // Avisar o pai que este Step ficou visível
  if (inView) {
    onInView(true);
  }

  return (
    <div ref={ref} className="h-screen flex flex-col justify-center items-center opacity-0">
      {/* This is just a scroll trigger - actual content is rendered in the fixed section above */}
    </div>
  );
}