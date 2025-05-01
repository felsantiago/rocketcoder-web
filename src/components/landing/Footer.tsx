'use client'

import React from "react";
import Link from 'next/link';

export function Footer() {
  return (
      <footer className="relative w-full overflow-hidden border-t border-neutral-100 px-8 py-0 pt-20 dark:border-white/10 dark:bg-black">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between text-sm text-neutral-500 sm:flex-row md:px-8">
          {/* Left logo + copyright */}
          <div>
            <div className="mb-4 flex md:mr-4 md:flex-row">
              <Link
                href="/"
                className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black dark:text-white"
              >
                {/* Replace src with your own logo */}
                <img
                  src="https://assets.aceternity.com/logo-dark.png"
                  alt="logo"
                  width={30}
                  height={30}
                  className="h-[30px] w-[30px]"
                />
                <span className="font-medium text-black dark:text-white">DevStudio</span>
              </Link>
            </div>
            <div className="ml-2 mt-2">
              © copyright DevStudios 2024. All rights reserved.
            </div>
          </div>

          {/* Links grid */}
          <div className="mt-10 grid grid-cols-2 gap-10 lg:grid-cols-4 sm:mt-0 md:mt-0">
            {/* Pages */}
            <div className="flex w-full flex-col space-y-4">
              <p className="font-bold text-neutral-600 transition-colors hover:text-neutral-800 dark:text-neutral-300">Pages</p>
              <ul className="space-y-4 text-neutral-600 transition-colors hover:text-neutral-800 dark:text-neutral-300">
                {[
                  { name: "All Products", href: "/products" },
                  { name: "Studio", href: "/products" },
                  { name: "Clients", href: "/products" },
                  { name: "Pricing", href: "/products" },
                  { name: "Blog", href: "/products" },
                ].map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="transition-colors hover:text-neutral-800">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Socials */}
            <div className="flex flex-col space-y-4">
              <p className="font-bold text-neutral-600 transition-colors hover:text-neutral-800 dark:text-neutral-300">Socials</p>
              <ul className="space-y-4 text-neutral-600 transition-colors hover:text-neutral-800 dark:text-neutral-300">
                {[
                  "Facebook",
                  "Instagram",
                  "Twitter",
                  "LinkedIn",
                ].map((social) => (
                  <li key={social}>
                    <Link href="/products" className="transition-colors hover:text-neutral-800">
                      {social}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div className="flex flex-col space-y-4">
              <p className="font-bold text-neutral-600 transition-colors hover:text-neutral-800 dark:text-neutral-300">Legal</p>
              <ul className="space-y-4 text-neutral-600 transition-colors hover:text-neutral-800 dark:text-neutral-300">
                {[
                  "Privacy Policy",
                  "Terms of Service",
                  "Cookie Policy",
                ].map((legal) => (
                  <li key={legal}>
                    <Link href="/products" className="transition-colors hover:text-neutral-800">
                      {legal}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Register */}
            <div className="flex flex-col space-y-4">
              <p className="font-bold text-neutral-600 transition-colors hover:text-neutral-800 dark:text-neutral-300">Register</p>
              <ul className="space-y-4 text-neutral-600 transition-colors hover:text-neutral-800 dark:text-neutral-300">
                {[
                  { name: "Sign Up", href: "/signup" },
                  { name: "Login", href: "/signin" },
                  { name: "Forgot Password", href: "/forgot-password" },
                ].map((reg) => (
                  <li key={reg.name}>
                    <Link href={reg.href} className="transition-colors hover:text-neutral-800">
                      {reg.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Large gradient text behind */}
        <p className="pointer-events-none inset-x-0 mt-20 select-none text-center text-5xl font-bold text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200 bg-clip-text dark:from-neutral-950 dark:to-neutral-800 md:text-9xl lg:text-[12rem] xl:text-[13rem]">
          Ghost Coder
        </p>
      </footer>
  );
}
