import { notFound } from "next/navigation";

import { LeadProfileWorkspace } from "@/features/leads/components/profile";
import { demoLeadProfile } from "@/features/leads/components/profile/lead-profile-demo-data";

type LeadProfilePageProps = {
  params: Promise<{ id: string }>;
};

/**
 * Static-first route. Replace the demo fixture with an authorized server-side
 * loader that maps Prisma Lead + Client records into LeadProfileViewModel.
 */
export default async function LeadProfilePage({ params }: LeadProfilePageProps) {
  const { id } = await params;

  // Keep the static preview explicitly limited to its demo ID. This prevents
  // unrelated real lead IDs from silently showing sample data.
  if (id !== demoLeadProfile.id && id !== "demo") {
    notFound();
  }

  return <LeadProfileWorkspace profile={demoLeadProfile} />;
}



// import {
//   LeadProfileWorkspace,
//   leadProfileDemoData,
// } from "@/features/leads/components/profile";

// export default function LeadProfilePreview() {
//   return <LeadProfileWorkspace profile={leadProfileDemoData} />;
// }