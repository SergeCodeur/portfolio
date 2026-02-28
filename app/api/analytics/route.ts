import { NextResponse } from "next/server";

const POSTHOG_API_KEY = process.env.POSTHOG_PERSONAL_API_KEY;
const POSTHOG_PROJECT_ID = process.env.POSTHOG_PROJECT_ID;
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

async function queryPostHog(query: string) {
  const res = await fetch(
    `${POSTHOG_HOST}/api/projects/${POSTHOG_PROJECT_ID}/query/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${POSTHOG_API_KEY}`,
      },
      body: JSON.stringify({
        query: { kind: "HogQLQuery", query },
      }),
    }
  );

  if (!res.ok) {
    throw new Error(`PostHog API error: ${res.status}`);
  }

  return res.json();
}

const ALLOWED_DAYS = [1, 7, 14, 28, 60, 90];

export async function GET(request: Request) {
  if (!POSTHOG_API_KEY || !POSTHOG_PROJECT_ID) {
    return NextResponse.json({ configured: false });
  }

  const { searchParams } = new URL(request.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  let dateFilter: string;
  if (from && to && /^\d{4}-\d{2}-\d{2}$/.test(from) && /^\d{4}-\d{2}-\d{2}$/.test(to)) {
    dateFilter = `AND timestamp >= '${from}' AND timestamp < '${to}' + INTERVAL 1 DAY`;
  } else {
    const rawDays = Number(searchParams.get("days") || 7);
    const days = ALLOWED_DAYS.includes(rawDays) ? rawDays : 7;
    dateFilter = `AND timestamp >= now() - INTERVAL ${days} DAY`;
  }

  const excludeFilter = `AND properties.$current_url NOT LIKE '%/admin%' AND properties.$current_url NOT LIKE '%/login%'`;

  try {
    const [visitorsDaily, pageViewsTotal, topPages] = await Promise.all([
      queryPostHog(`
        SELECT
          toDate(timestamp) AS day,
          count(DISTINCT distinct_id) AS visitors
        FROM events
        WHERE event = '$pageview'
          ${dateFilter}
          ${excludeFilter}
        GROUP BY day
        ORDER BY day
      `),
      queryPostHog(`
        SELECT count() AS total
        FROM events
        WHERE event = '$pageview'
          ${dateFilter}
          ${excludeFilter}
      `),
      queryPostHog(`
        SELECT
          replaceRegexpAll(
            properties.$current_url,
            '^https?://[^/]+',
            ''
          ) AS page,
          count() AS views
        FROM events
        WHERE event = '$pageview'
          ${dateFilter}
          ${excludeFilter}
        GROUP BY page
        ORDER BY views DESC
        LIMIT 5
      `),
    ]);

    const dailyVisitors = (visitorsDaily.results as [string, number][]).map(
      ([day, visitors]) => ({
        day: day.slice(5, 10),
        visitors: Number(visitors),
      })
    );

    const totalVisitors = dailyVisitors.reduce(
      (sum, d) => sum + d.visitors,
      0
    );
    const totalPageViews = Number(
      (pageViewsTotal.results as [number][])[0]?.[0] ?? 0
    );

    const pages = (topPages.results as [string, number][]).map(
      ([page, views]) => ({
        page: page || "/",
        views: Number(views),
      })
    );

    return NextResponse.json({
      configured: true,
      totalVisitors,
      totalPageViews,
      dailyVisitors,
      topPages: pages,
    });
  } catch {
    return NextResponse.json(
      { configured: true, error: "Erreur lors de la récupération des données" },
      { status: 500 }
    );
  }
}
