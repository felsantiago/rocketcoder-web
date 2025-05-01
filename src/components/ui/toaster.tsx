"use client";

import { Toaster as SonnerToaster, toast as sonner } from "sonner";
import { XCircle } from "lucide-react";

/* ------------------------------------------------------------------
 *  Supabase-style Toaster – cor e layout igual ao screenshot
 * ------------------------------------------------------------------
 *  <Toaster />  ➜ coloque uma vez (RootLayout)
 *  toast.success("msg") | toast.error("msg") | toast("msg")
 * ------------------------------------------------------------------ */

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export function Toaster() {
  return (
    <SonnerToaster
      position="top-right"
      closeButton
      toastOptions={{
        classNames: {
          toast:
            "group toast w-full rounded-md py-3 px-5 flex gap-2 items-start font-normal text-[13px] leading-relaxed " +
            "bg-[#1A1A1A] border border-[#2B2B2B] text-[#E2E2E2] shadow-lg relative",
          success: "",
          error: "",
          closeButton:
            "absolute right-2 top-2 rounded-md text-white/50 opacity-100 transition-all duration-200 " +
            "hover:text-white hover:scale-110 focus:opacity-100 focus:outline-none focus:ring-2 " +
            "group-hover:opacity-100 left-auto transform-none " +
            "bg-transparent border-0 border-transparent hover:!bg-transparent hover:border-transparent " +
            "data-[disabled=false]:block",
        },
        duration: 5000,
      }}
    />
  );
}

const ToastContent = ({ message, onClose }: { message: string; onClose?: () => void }) => (
  <div data-content="" className="flex items-start w-full">
    <div className="flex-1 min-w-0">
      <div data-title="" className="!font-normal text-[#E2E2E2] leading-relaxed pr-6">
        {message}
      </div>
    </div>
    <div className="flex-shrink-0 ml-2">
      <button
        onClick={onClose}
        className="rounded-md text-white/50 hover:text-white transition-all duration-200 hover:scale-110 p-1"
        aria-label="Close"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  </div>
);

const SuccessIcon = () => (
  <div data-icon="" className="mt-0.5">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      height="20"
      width="20"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
        clipRule="evenodd"
      />
    </svg>
  </div>
);

export const toast = {
  success: (msg: string) =>
    sonner.custom(
      (t) => <ToastContent message={msg} onClose={() => sonner.dismiss(t)} />,
      {
        icon: <SuccessIcon />,
      }
    ),
  error: (msg: string) =>
    sonner.custom(
      (t) => <ToastContent message={msg} onClose={() => sonner.dismiss(t)} />,
      {
        icon: <div data-icon="" className="mt-0.5">
          <XCircle size={20} className="text-red-400" />
        </div>,
      }
    ),
  message: (msg: string) => sonner(msg),
};