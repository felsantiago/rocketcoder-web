"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import Link from "next/link";

export function Header() {
  const navItems = [
    {
      name: "Features",
      link: "#features",
    },
    {
      name: "Pricing",
      link: "#pricing",
    },
    {
      name: "Contact",
      link: "#contact",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-2">
            <Link
              data-size="tiny"
              href="/signin"
              className="relative justify-center cursor-pointer md:inline-flex items-center gap-1 text-xs h-[26px] px-2.5 py-1 rounded-md border border-brand-border bg-transparent hover:bg-studio transition"
            >
              <span className="truncate">Login</span>
            </Link>
            <Link
              data-size="tiny"
              href="/signup"
              className="relative justify-center cursor-pointer items-center space-x-2 text-center font-regular ease-out duration-200 rounded-md outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border bg-brand-400 dark:bg-brand-500 hover:bg-brand/80 dark:hover:bg-brand/50 text-foreground border-brand-500/75 dark:border-brand/30 hover:border-brand-600 dark:hover:border-brand focus-visible:outline-brand-600 data-[state=open]:bg-brand-400/80 dark:data-[state=open]:bg-brand-500/80 data-[state=open]:outline-brand-600 text-xs px-2.5 py-1 h-[26px] hidden lg:block"
            >
              <span className="truncate">Cadastre-se</span>
            </Link>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <Link
                href="/signin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative justify-center cursor-pointer items-center space-x-2 text-center font-regular ease-out duration-200 rounded-md outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border text-foreground bg-alternative hover:bg-muted border-strong hover:border-stronger focus-visible:outline-brand-600 text-xs px-2.5 py-1 h-[26px] flex w-full"
              >
                <span className="truncate">Login</span>
              </Link>
              <Link
                href="/signup"
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative justify-center cursor-pointer items-center space-x-2 text-center font-regular ease-out duration-200 rounded-md outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border bg-brand hover:bg-brand/80 text-background border-brand/75 hover:border-brand focus-visible:outline-brand-600 text-xs px-2.5 py-1 h-[26px] flex w-full"
              >
                <span className="truncate">Cadastre-se</span>
              </Link>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
  );
}
