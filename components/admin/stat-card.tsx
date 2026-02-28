import Link from "next/link";
import type { Icon } from "@phosphor-icons/react";

interface StatCardProps {
  title: string;
  value: number;
  icon: Icon;
  href: string;
}

export default function StatCard({
  title,
  value,
  icon: IconComp,
  href,
}: StatCardProps) {
  return (
    <Link href={href} className="group block">
      <div className="rounded-xl border border-border bg-card p-5 transition-colors hover:bg-white/3">
        <div className="flex items-start justify-between">
          <p className="text-sm text-muted-foreground">{title}</p>
          <IconComp className="w-5 h-5 text-muted-foreground" />
        </div>
        <span className="block text-3xl font-bold font-heading mt-3">
          {value}
        </span>
      </div>
    </Link>
  );
}
