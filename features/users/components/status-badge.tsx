import type { VariantProps } from "class-variance-authority";
import { Badge, badgeVariants } from "@/components/ui/badge";
import { EmploymentStatus } from "@/prisma/generated/prisma/enums";

type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>["variant"]>;

type StatusBadgeProps =  {
  status:EmploymentStatus 
}

function StatusBadge({status}:StatusBadgeProps) {
  const employmentStatusVariants = {
  ACTIVE: "success",
  INACTIVE: "warning",
  TERMINATED: "danger",
} satisfies Record<string, BadgeVariant>;

  return (
    <Badge variant={employmentStatusVariants[status]}>
      {status.replaceAll("_", " ")}
    </Badge>
  );
}

export default StatusBadge;
