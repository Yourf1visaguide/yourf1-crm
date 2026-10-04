"use client";

import dynamic from "next/dynamic";

import { useNewUserSheet } from "@/features/users/store/use-new-user-sheet";
import { FullScreenLoader, LineLoader } from "@/components/resuable-components/loader";

const NewUserSheet = dynamic(
  () => import("@/features/users/components/new-user-sheet"),
  {
    loading: () => (
      <FullScreenLoader loader={<LineLoader />} text="Loading User Form" />

    ),
  },
);

export default function UserSheetProviders() {
  const { isOpen: isNewUserOpen } = useNewUserSheet();

  return <>{isNewUserOpen && <NewUserSheet />}</>;
}
