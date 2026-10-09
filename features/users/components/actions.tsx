import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CalendarClock, Copy, MoreVertical, Pencil, UserRound, UserX, WalletCards } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EmployeeActions({
  employeeId,
}: {
  employeeId: string;
}) {
  const router = useRouter();

  return (
    <DropdownMenu>
          <DropdownMenuTrigger
            render={<Button variant="ghost" className="size-8 p-0" />}
          >
            <span className="sr-only">Open menu</span>

            <MoreVertical className="size-4" />
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            sideOffset={6}
            className="w-56 rounded-xl border border-border/60 bg-popover p-1.5 shadow-lg shadow-black/5"
          >
            {/* Primary */}
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() =>
              router.push(`/users/${employeeId}`)
              }
             className="gap-2.5 rounded-lg px-2.5 py-2.5 text-sm"
            >
                <UserRound className="size-4 text-muted-foreground" />
                <span>View profile</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="my-1.5" />

            {/* Employee management */}
            <DropdownMenuGroup>
              <DropdownMenuLabel className="px-2.5 pb-1.5 pt-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70">
                Manage
              </DropdownMenuLabel>

              <DropdownMenuItem className="gap-2.5 rounded-lg px-2.5 py-2">
                <Pencil className="size-4 text-muted-foreground" />
                <span>Edit employee</span>
              </DropdownMenuItem>

              <DropdownMenuItem className="gap-2.5 rounded-lg px-2.5 py-2">
                <WalletCards className="size-4 text-muted-foreground" />
                <span>Change salary</span>
              </DropdownMenuItem>

              <DropdownMenuItem className="gap-2.5 rounded-lg px-2.5 py-2">
                <CalendarClock className="size-4 text-muted-foreground" />
                <span>Change schedule</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="my-1.5" />

            {/* Utility */}
            <DropdownMenuItem 
              className="gap-2.5 rounded-lg px-2.5 py-2"
              onClick={() =>
              navigator.clipboard.writeText(employeeId)
            }  
            >
              <Copy className="size-4 text-muted-foreground" />
              <span>Copy employee ID</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator className="my-1.5" />

            {/* Destructive */}
            <DropdownMenuItem
              className="
                gap-2.5 rounded-lg px-2.5 py-2
                text-destructive
                focus:bg-destructive/10
                focus:text-destructive
              "
            >
              <UserX className="size-4" />
              <span>Deactivate employee</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
    
  );
}