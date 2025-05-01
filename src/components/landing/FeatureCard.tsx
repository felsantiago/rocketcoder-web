import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
}

export function FeatureCard({ title, description, icon, className }: FeatureCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center rounded-2xl p-8 shadow-xl border border-white/10 bg-white/10 backdrop-blur-xl transition hover:scale-105",
        className
      )}
    >
      <div className="mb-4 text-4xl drop-shadow-[0_0_8px_cyan]">{icon}</div>
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-zinc-300 text-center">{description}</p>
    </div>
  );
}
