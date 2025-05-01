import Link from 'next/link';

export default function LogoNavbar() {
  return (
    <header className="absolute top-0 w-full px-8 mt-6 sm:px-6 lg:px-8">
      <nav className="flex items-center justify-between sm:h-10">
        {/* logo */}
        <Link href="/" className="flex items-center gap-2">
          <svg width="22" height="22" viewBox="0 0 24 24" className="fill-brand" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0 1 20h11l-1 4 11-20H12Z" />
          </svg>
          <span className="text-lg font-semibold text-white">Ghost Coder</span>
        </Link>

        {/* docs button */}
        {/* <a
          href="https://supabase.com/docs"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-1 text-xs h-[26px] px-2.5 py-1 rounded-md border border-brand-border bg-transparent hover:bg-studio transition"
        >
          <svg className="w-[14px] h-[14px] text-foreground-lighter" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2Z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7Z" />
          </svg>
          <span>Documentation</span>
        </a> */}
      </nav>
    </header>
  );
}