import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  href: string;
}

export default function StatCard({ title, value, icon: Icon, href }: StatCardProps) {
  return (
    <a
      href={href}
      className="glass rounded-xl p-6 hover:bg-surface/80 transition-colors group"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
          <Icon className="w-5 h-5 text-accent" />
        </div>
        <span className="text-3xl font-bold text-foreground font-heading">
          {value}
        </span>
      </div>
      <p className="text-sm text-muted-foreground">{title}</p>
    </a>
  );
}
