import { Button } from '@/components/ui/button';

export default function SocialAuthButtons({ showSSO = true }: { showSSO?: boolean }) {
  return (
    <div className="flex flex-col gap-4">
      <Button
        variant="outline"
        className="h-[42px] w-full border-brand-border bg-alternative hover:bg-studio"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
        Continuar com GitHub
      </Button>
      {showSSO && (
        <Button
          variant="ghost"
          className="h-[42px] w-full border border-brand-border bg-transparent hover:border-gray-500"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          Continuar com SSO
        </Button>
      )}
    </div>
  );
}