import "server-only";

import { prisma } from "@/lib/prisma";
import { LeadSource } from "@/prisma/generated/prisma/enums";

import type { LeadInsightsQuery } from "../schemas/lead-insights-schema";
import type { LeadListAccess } from "./lead-queries";

function officeDateStart(value: string) {
  return new Date(`${value}T00:00:00.000+05:30`);
}

function officeDateEndExclusive(value: string) {
  const date = officeDateStart(value);
  date.setUTCDate(date.getUTCDate() + 1);
  return date;
}

function enumLabel(value: string) {
  return value
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function getCountryLabel(
  preferredCountry: string | null,
  otherCountry: string | null,
) {
  if (preferredCountry === "OTHER") {
    return otherCountry?.trim() || "Other";
  }

  return preferredCountry ? enumLabel(preferredCountry) : null;
}

function getSourceLabel(source: LeadSource) {
  return enumLabel(source);
}

export async function getLeadInsights(
  query: LeadInsightsQuery,
  access: LeadListAccess,
) {
  const leads = await prisma.lead.findMany({
    where: {
      createdAt: {
        gte: officeDateStart(query.from),
        lt: officeDateEndExclusive(query.to),
      },
      ...(access.canReadAll
        ? {}
        : {
            assignments: {
              some: {
                assignedToId: access.userId,
                endedAt: null,
              },
            },
          }),
    },
    select: {
      source: true,
      // Use the application explicitly linked to this lead. A client's
      // latest application may belong to another lead and misclassify this one.
      originatedApplication: {
        select: {
          type: true,
          preferredCountry: true,
          otherCountry: true,
        },
      },
    },
  });

  let studyAbroad = 0;
  let touristVisa = 0;
  const sourceCounts = new Map<LeadSource, number>();
  const countryCounts = new Map<string, number>();

  for (const lead of leads) {
    sourceCounts.set(
      lead.source,
      (sourceCounts.get(lead.source) ?? 0) + 1,
    );

    const application = lead.originatedApplication;

    if (application?.type === "STUDY") {
      studyAbroad += 1;
    } else if (application?.type === "TOURIST") {
      touristVisa += 1;
    }

    const country = getCountryLabel(
      application?.preferredCountry ?? null,
      application?.otherCountry ?? null,
    );

    if (country) {
      countryCounts.set(country, (countryCounts.get(country) ?? 0) + 1);
    }
  }

  const sources = Array.from(sourceCounts.entries())
    .map(([source, count]) => ({
      source,
      label: getSourceLabel(source),
      count,
    }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));

  const topCountry =
    Array.from(countryCounts.entries())
      .map(([country, count]) => ({ country, count }))
      .sort((a, b) => b.count - a.count || a.country.localeCompare(b.country))[0] ??
    null;

  return {
    studyAbroad,
    touristVisa,
    sources,
    topCountry,
  };
}
