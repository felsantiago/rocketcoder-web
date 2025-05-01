"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ChevronRight, CircleArrowDown } from "lucide-react";
import { Spotlight } from "../ui/Spotlight";

export function Hero() {
  return (
    <div className="relative flex flex-col h-full w-full overflow-hidden rounded-md bg-black/[0.96] antialiased md:items-center md:justify-center">
      <div className="absolute inset-0 bg-black/30" />
      {/* Fundo Quadriculado */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at center, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
            radial-gradient(circle at top left, rgba(255, 255, 255, 0.08) 4px, transparent 5px),
            radial-gradient(circle at top right, rgba(255, 255, 255, 0.08) 4px, transparent 5px),
            radial-gradient(circle at bottom left, rgba(255, 255, 255, 0.08) 4px, transparent 5px),
            radial-gradient(circle at bottom right, rgba(255, 255, 255, 0.08) 4px, transparent 5px),
            linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "150px 150px",
          backgroundPosition: "center",
          opacity: 0.6,
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%)",
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%)",
        }}
      />

      {/* Spotlight effect */}
      <Spotlight
        className="-top-40 left-0 md:-top-300 md:left-60"
        fill="white"
      />

      {/* Hero Content */}
      {/* margin bottom: 170px; */}
      {/* <div className="relative z-10 mb-[100px] mx-auto w-full max-w-7xl p-4 pt-12 md:pt-0 text-center flex flex-col items-center justify-center max-w-revert-layer">
        <h1 className="max-w-3xl bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-4xl font-bold text-transparent md:text-6xl leading-tight">
          Resolva qualquer{" "}
          <motion.span
            className="relative inline-block bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent font-extrabold"
            initial={{ opacity: 0.8, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1.05 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          >
            Code Challenge
          </motion.span>{" "}
          ao vivo — com{" "}
          <span className="bg-gradient-to-r from-gray-200 to-gray-100 bg-clip-text text-transparent font-semibold">
            IA invisível
          </span>{" "}
          do seu lado.
        </h1>

        <p className="mt-6 max-w-2xl text-base md:text-lg font-light text-neutral-300">
          Ghost Coder é seu parceiro invisível em entrevistas técnicas, analisando seu código em tempo real e oferecendo sugestões discretas para ajudar você a brilhar.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <HoverBorderGradient
            containerClassName="rounded-full"
            as="button"
            className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
          >
            <span>Assine para desbloquear</span>
          </HoverBorderGradient>

          <HoverBorderGradient
            containerClassName="rounded-full"
            as="button"
            className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
          >
            <span>Baixar agora</span>
          </HoverBorderGradient>
        </div>

        <p className="mt-4 text-xs text-neutral-500 text-center">
          É necessária uma assinatura ativa para utilizar o Ghost Coder.
        </p>
      </div>
      <div className="p-4 border rounded-3xl dark:bg-neutral-900 bg-neutral-100  border-neutral-200 dark:border-neutral-800 px-4 h-[721px] w-[1248px]">
      <img
        alt="header"
        loading="lazy"
        width={1920}
        height={1080}
        decoding="async"
        className="rounded-[20px]"
        srcSet={`/images/app-desktop.png 1x, /images/app-desktop.png 2x`}
        src="/images/app-desktop.png"
        style={{ color: "transparent" }}
      />
      </div> */}

      <div className="relative flex flex-col px-6 lg:px-64 py-48">
        <div className="space-y-8">

          {/* Limited Time Deal Button */}
          <a
            href="https://buy.stripe.com/fZeg1g8sv0Ou7C05ko?client_reference_id="
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 mt-2 gap-1 bg-zinc-300/50 dark:bg-zinc-800/50 hover:ring-2 hover:ring-zinc-300 dark:hover:ring-zinc-700 px-4 py-2 rounded-full group flex w-fit items-center"
          >
            <span className="text-zinc-700 dark:text-zinc-100">Limited Time</span>
            <span className="text-zinc-700 dark:text-zinc-100">One time Deal</span>
            <ChevronRight className="ml-1 size-3 transition-transform ease-out group-hover:translate-x-0.5" />
          </a>

          {/* Title */}
          <h1 className="capitalize tracking-[-0.06em] text-4xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-zinc-900 to-zinc-500 dark:from-zinc-300 dark:to-zinc-500 ml-4">
            Resolva qualquer
            <br />
            <motion.span
              className="relative inline-block bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent font-extrabold"
              initial={{ opacity: 0.8, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1.05 }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            >
              Code Challenge
            </motion.span>{" "}
            ao vivo —{<br />} com{" "}
            <div className="relative group/cover inline-block dark:bg-neutral-900 bg-neutral-100 px-2 py-2 rounded-sm transition duration-200 hover:bg-neutral-900">
              {/* Gradient beams */}
              {Array.from({ length: 6 }).map((_, idx) => (
                <svg
                  key={idx}
                  width="365"
                  height="1"
                  viewBox="0 0 365 1"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute inset-x-0 w-full"
                  style={{ top: `${9.5 + idx * 9.5}px` }}
                >
                  <title>Beam</title>
                  <path d="M0 0.5H365" stroke="url(#beamGradient)" />
                  <defs>
                    <linearGradient id="beamGradient" gradientUnits="userSpaceOnUse" x1="110%" x2="105%" y1="0" y2="0">
                      <stop stopColor="#2EB9DF" stopOpacity="0" />
                      <stop stopColor="#3b82f6" />
                      <stop offset="1" stopColor="#3b82f6" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              ))}
              <span className="dark:text-white inline-block text-neutral-900 relative z-20 group-hover/cover:text-white transition duration-200">
                IA invisível
              </span>

              {/* Pulse Dots on Hover */}
              {["-top-[2px] -right-[2px]", "-bottom-[2px] -right-[2px]", "-top-[2px] -left-[2px]", "-bottom-[2px] -left-[2px]"].map((pos, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "pointer-events-none animate-pulse h-2 w-2 rounded-full opacity-20 bg-neutral-600 dark:bg-white absolute group-hover/cover:bg-white",
                    pos
                  )}
                />
              ))}
            </div>
            do seu lado.
          </h1>

          {/* Subtitle */}
          <p className="font-primary tracking-tight text-zinc-800 dark:text-zinc-200 max-w-3xl md:text-xl text-pretty px-4">
            <span className="text-zinc-900 dark:text-zinc-100">Ghost Coder</span> é seu parceiro invisível em entrevistas técnicas,
            analisando seu código em tempo real e oferecendo sugestões discretas para ajudar você a brilhar.
          </p>

          {/* Buttons */}
          <div className="flex flex-col lg:flex-row items-stretch gap-2">
            <a
              href="https://buy.stripe.com/fZeg1g8sv0Ou7C05ko?client_reference_id="
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center whitespace-nowrap bg-zinc-900 text-zinc-50 hover:bg-zinc-900/90 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 h-10 rounded-xl text-lg px-6 py-6 font-medium ml-4 gap-2 transition-colors ring-offset-white focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 dark:ring-offset-zinc-950 dark:focus-visible:ring-zinc-300"
            >
              <span>Assine para desbloquear</span>
              <span className="opacity-50">• $10</span>
            </a>

            <button
              type="button"
              aria-haspopup="dialog"
              aria-expanded="false"
              aria-controls="download-dialog"
              className="inline-flex items-center justify-center whitespace-nowrap border border-zinc-200 bg-white hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 h-10 rounded-xl text-lg px-6 py-6 font-medium ml-4 transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 dark:ring-offset-zinc-950 dark:focus-visible:ring-zinc-300"
            >
              Baixar agora
              <CircleArrowDown className="w-6 h-6 inline ml-3" />
            </button>
          </div>

        </div>
      </div>

      <section className="relative w-screen h-auto flex flex-col items-center justify-center">
        {/* Vídeo principal */}
        <video
          className="relative bg-zinc-900 bg-gradient-to-b from-zinc-900 to-zinc-800 rounded-3xl w-[90vw] border border-solid border-zinc-200 dark:border-zinc-800 mx-auto z-10 overflow-clip aspect-[16/9]"
          src="https://pub-8714268075074b7eb8d946d16ea9acfd.r2.dev/demo-v4.mp4"
          loop
          playsInline
          autoPlay
          style={{ transform: "translateY(-60px)" }}
        />

        {/* Glow/Blur efeito atrás */}
        <div
          className="absolute left-0 right-0 top-12 mx-auto w-5/6 h-12 rounded-full bg-gradient-to-r from-orange-400 to-red-300 dark:from-orange-500/75 dark:to-red-400/75 bg-blend-soft-exclusion blur-3xl will-change-transform"
          style={{ opacity: 1, transform: "translateY(-100px) scale(0.9)" }}
        />
      </section>
    </div>
  );
}