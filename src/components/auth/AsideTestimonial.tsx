import Image from 'next/image';

export default function AsideTestimonial() {
  return (
    <aside className="hidden xl:flex flex-col items-center justify-center flex-1 bg-[#0E0E0E]">
      <div className="relative max-w-lg px-8">
        <span className="absolute -top-12 -left-12 text-[160px] leading-none text-gray-700/30 select-none">
          “
        </span>
        <blockquote className="relative z-10 text-3xl text-white">
          Working with Supabase is just fun. It makes working with a DB so much easier.
        </blockquote>
        <a
          href="https://twitter.com/the_BrianB/status/1524716498442276864"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 flex items-center gap-4"
        >
          <Image
            src="https://supabase.com/images/twitter-profiles/7NITI8Z3_400x400.jpg"
            alt="the_BrianB"
            width={48}
            height={48}
            className="rounded-full"
          />
          <cite className="not-italic font-medium text-gray-400">@the_BrianB</cite>
        </a>
      </div>
    </aside>
  );
}