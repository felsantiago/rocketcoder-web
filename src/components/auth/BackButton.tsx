import Link from 'next/link';

export default function BackButton() {
  return (
    <Link
      href="/"
      className="absolute left-4 top-4 z-50 flex items-center space-x-1 rounded-md bg-alternative/80 px-3 py-1.5 text-sm text-gray-300 backdrop-blur transition hover:bg-alternative/90 hover:text-white"
      aria-label="Voltar para a página inicial"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="h-4 w-4 mr-1"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
      <span>Voltar</span>
    </Link>
  );
}