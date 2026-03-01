"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import type { DateRange } from "react-day-picker";
import {
  UsersIcon,
  EyeIcon,
  FileTextIcon,
  CaretDownIcon,
  CheckIcon,
  CalendarBlankIcon,
} from "@phosphor-icons/react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface AnalyticsData {
  configured: boolean;
  error?: string;
  totalVisitors?: number;
  totalPageViews?: number;
  dailyVisitors?: { day: string; visitors: number }[];
  topPages?: { page: string; views: number }[];
}

const PAGE_LABELS: Record<string, string> = {
  "/": "Accueil",
  "/#projets": "Projets",
  "/#services": "Services",
  "/#temoignages": "Témoignages",
  "/#processus": "Processus",
  "/#contact": "Contact",
};

const PERIODS = [
  { days: 1, label: "Aujourd'hui" },
  { days: 7, label: "7 derniers jours" },
  { days: 14, label: "14 derniers jours" },
  { days: 28, label: "28 derniers jours" },
  { days: 60, label: "60 derniers jours" },
  { days: 90, label: "90 derniers jours" },
] as const;

function formatPageName(page: string) {
  return PAGE_LABELS[page] || page;
}

function formatDateShort(date: Date) {
  return format(date, "d MMM", { locale: fr });
}

function toISODate(date: Date) {
  return format(date, "yyyy-MM-dd");
}

async function fetchAnalytics(days: number | null, range?: DateRange): Promise<AnalyticsData> {
  let url = "/api/analytics";
  if (range?.from && range?.to) {
    url += `?from=${toISODate(range.from)}&to=${toISODate(range.to)}`;
  } else if (days) {
    url += `?days=${days}`;
  }
  const res = await fetch(url);
  if (!res.ok) throw new Error("Fetch failed");
  return res.json();
}

export default function AnalyticsWidget() {
  const [days, setDays] = useState<number | null>(7);
  const [customRange, setCustomRange] = useState<DateRange | undefined>();
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [pendingRange, setPendingRange] = useState<DateRange | undefined>();

  const { data, isLoading: loading } = useQuery({
    queryKey: ["analytics", days, customRange?.from?.toISOString(), customRange?.to?.toISOString()],
    queryFn: () => fetchAnalytics(days, customRange),
  });

  function handlePresetSelect(preset: number) {
    setCustomRange(undefined);
    setDays(preset);
  }

  function handleCustomApply() {
    if (pendingRange?.from && pendingRange?.to) {
      setCustomRange(pendingRange);
      setDays(null);
      setCalendarOpen(false);
    }
  }

  const currentLabel = customRange?.from && customRange?.to
    ? `${formatDateShort(customRange.from)} - ${formatDateShort(customRange.to)}`
    : PERIODS.find((p) => p.days === days)?.label ?? "7 derniers jours";

  if (!loading && !data?.configured) {
    return (
      <div className="rounded-xl border border-border p-5 mt-6">
        <h2 className="font-semibold text-sm mb-2">Analytics</h2>
        <p className="text-sm text-muted-foreground">
          Configurez vos clés PostHog dans le fichier{" "}
          <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">
            .env
          </code>{" "}
          pour afficher les statistiques de visites.
        </p>
      </div>
    );
  }

  if (!loading && data?.error) {
    return (
      <div className="rounded-xl border border-border p-5 mt-6">
        <h2 className="font-semibold text-sm mb-2">Analytics</h2>
        <p className="text-sm text-destructive">{data.error}</p>
      </div>
    );
  }

  const maxVisitors = Math.max(
    ...(data?.dailyVisitors?.map((d) => d.visitors) ?? [1])
  );

  return (
    <div className="rounded-xl border border overflow-hidden mt-6">
      <div className="flex items-center justify-between px-5 py-3 border-b border-border">
        <h2 className="font-semibold text-sm">Analytics</h2>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground hover:border-foreground/20 focus-visible:outline-none">
              {currentLabel}
              <CaretDownIcon className="w-3 h-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[180px]">
              {PERIODS.map((period) => (
                <DropdownMenuItem
                  key={period.days}
                  onClick={() => handlePresetSelect(period.days)}
                  className="justify-between"
                >
                  {period.label}
                  {period.days === days && !customRange && (
                    <CheckIcon className="w-3.5 h-3.5 text-accent" />
                  )}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                <PopoverTrigger asChild>
                  <button
                    className="relative flex w-full cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none hover:bg-accent hover:text-accent-foreground"
                    onClick={(e) => {
                      e.preventDefault();
                      setPendingRange(customRange);
                      setCalendarOpen(true);
                    }}
                  >
                    <CalendarBlankIcon className="w-4 h-4 text-muted-foreground" />
                    Personnalisé
                    {customRange && (
                      <CheckIcon className="ml-auto w-3.5 h-3.5 text-accent" />
                    )}
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0"
                  side="left"
                  align="start"
                  onInteractOutside={(e) => e.preventDefault()}
                >
                  <div className="p-3">
                    <Calendar
                      mode="range"
                      selected={pendingRange}
                      onSelect={setPendingRange}
                      numberOfMonths={1}
                      locale={fr}
                      disabled={{ after: new Date() }}
                      defaultMonth={pendingRange?.from ?? new Date()}
                      className="w-full"
                      classNames={{ month: "w-full", table: "w-full" }}
                    />
                    <div className="flex items-center justify-between border-t border-border pt-3 mt-1">
                      {pendingRange?.from && pendingRange?.to ? (
                        <span className="text-xs text-muted-foreground">
                          {formatDateShort(pendingRange.from)} -{" "}
                          {formatDateShort(pendingRange.to)}
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground">
                          Sélectionnez une plage
                        </span>
                      )}
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setCalendarOpen(false)}
                        >
                          Retour
                        </Button>
                        <Button
                          size="sm"
                          disabled={!pendingRange?.from || !pendingRange?.to}
                          onClick={handleCustomApply}
                        >
                          Appliquer
                        </Button>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="p-5">
        {loading ? (
          <>
            <div className="grid grid-cols-3 gap-4 mb-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i}>
                  <Skeleton className="h-4 w-20 mb-2" />
                  <Skeleton className="h-8 w-16" />
                </div>
              ))}
            </div>
            <Skeleton className="h-20 w-full" />
          </>
        ) : (
          <>
            {/* Metrics */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div>
                <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
                  <UsersIcon className="w-3.5 h-3.5" />
                  <span className="text-xs">Visiteurs</span>
                </div>
                <span className="text-2xl font-bold font-heading">
                  {data?.totalVisitors}
                </span>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
                  <EyeIcon className="w-3.5 h-3.5" />
                  <span className="text-xs">Pages vues</span>
                </div>
                <span className="text-2xl font-bold font-heading">
                  {data?.totalPageViews}
                </span>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
                  <FileTextIcon className="w-3.5 h-3.5" />
                  <span className="text-xs">Page top</span>
                </div>
                <span className="text-2xl font-bold font-heading truncate block">
                  {formatPageName(data?.topPages?.[0]?.page ?? "/")}
                </span>
              </div>
            </div>

            {/* Line chart */}
            {data?.dailyVisitors && data.dailyVisitors.length > 1 && (() => {
              const days = data.dailyVisitors;
              const max = Math.max(...days.map((d) => d.visitors), 1);
              const w = 500;
              const h = 100;
              const px = 10;
              const py = 5;
              const stepX = (w - px * 2) / Math.max(days.length - 1, 1);
              const points = days.map((d, i) => ({
                x: px + i * stepX,
                y: py + (1 - d.visitors / max) * (h - py * 2),
              }));

              // Smooth cubic bezier path
              let linePath = `M${points[0].x},${points[0].y}`;
              for (let i = 1; i < points.length; i++) {
                const prev = points[i - 1];
                const curr = points[i];
                const cpx = (prev.x + curr.x) / 2;
                linePath += ` C${cpx},${prev.y} ${cpx},${curr.y} ${curr.x},${curr.y}`;
              }

              const areaPath = `${linePath} L${points[points.length - 1].x},${h} L${points[0].x},${h} Z`;

              // Pick evenly spaced label indices
              const maxLabels = days.length <= 14 ? days.length : 7;
              const showDots = days.length <= 14;
              const labelIndices: number[] = [];
              if (days.length <= maxLabels) {
                days.forEach((_, i) => labelIndices.push(i));
              } else {
                for (let i = 0; i < maxLabels; i++) {
                  labelIndices.push(Math.round((i * (days.length - 1)) / (maxLabels - 1)));
                }
              }

              return (
                <div className="mb-6">
                  <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-24" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d={areaPath}
                      fill="url(#areaGrad)"
                      className="animate-[fadeIn_0.8s_ease-out_0.6s_both]"
                    />
                    <path
                      d={linePath}
                      fill="none"
                      stroke="var(--color-accent)"
                      strokeWidth="2"
                      vectorEffect="non-scaling-stroke"
                      strokeDasharray="2000"
                      strokeDashoffset="2000"
                      className="animate-[drawLine_1s_ease-out_forwards]"
                    />
                    {showDots && points.map((p, i) => (
                      <circle
                        key={i}
                        cx={p.x}
                        cy={p.y}
                        r="3"
                        fill="var(--color-accent)"
                        vectorEffect="non-scaling-stroke"
                        className="animate-[fadeIn_0.3s_ease-out_both]"
                        style={{ animationDelay: `${0.3 + i * 0.08}s` }}
                      />
                    ))}
                  </svg>
                  <div className="relative mt-1.5 h-4">
                    {labelIndices.map((idx, i) => (
                      <span
                        key={idx}
                        className="absolute text-[10px] text-muted-foreground whitespace-nowrap"
                        style={{
                          left: `${(points[idx].x / w) * 100}%`,
                          transform: i === 0
                            ? "translateX(0)"
                            : i === labelIndices.length - 1
                              ? "translateX(-100%)"
                              : "translateX(-50%)",
                        }}
                      >
                        {days[idx].day}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })()}

            {/* Top pages */}
            {data?.topPages && data.topPages.length > 0 && (
              <div>
                <h3 className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-2">
                  Pages populaires
                </h3>
                <div className="space-y-1.5">
                  {data.topPages.map((page) => (
                    <div
                      key={page.page}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="truncate mr-4">
                        {formatPageName(page.page)}
                      </span>
                      <span className="text-muted-foreground text-xs shrink-0">
                        {page.views} vues
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
