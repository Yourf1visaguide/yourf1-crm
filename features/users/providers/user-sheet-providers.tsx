
"use client";

import dynamic from "next/dynamic";

import { useUserSheet } from "@/features/users/store/use-user-sheet";
import {
  FullScreenLoader,
  LineLoader,
} from "@/components/resuable-components/loader";

const NewUserSheet = dynamic(
  () => import("@/features/users/components/new-user-sheet"),
  {
    loading: () => (
      <FullScreenLoader
        loader={<LineLoader />}
        text="Loading User Form"
      />
    ),
  },
);

const EditUserSheet = dynamic(
  () =>
    import("@/features/users/components/edit-user-sheet/edit-user-sheet"),
  {
    loading: () => (
      <FullScreenLoader
        loader={<LineLoader />}
        text="Loading User Form"
      />
    ),
  },
);

const EditUserSalarySheet = dynamic(
  () =>
    import(
      "@/features/users/components/edit-salary-sheet/edit-user-salary-sheet"
    ),
  {
    loading: () => (
      <FullScreenLoader
        loader={<LineLoader />}
        text="Loading User Salary Form"
      />
    ),
  },
);

const EditUserScheduleSheet = dynamic(
  () =>
    import(
      "@/features/users/components/edit-schedule-sheet/edit-user-schedule-sheet"
    ),
  {
    loading: () => (
      <FullScreenLoader
        loader={<LineLoader />}
        text="Loading Schedule Form"
      />
    ),
  },
);

export default function UserSheetProviders() {
  const type = useUserSheet((state) => state.type);
  const isOpen = useUserSheet((state) => state.isOpen);

  return (
    <>
      {type === "new" && isOpen && <NewUserSheet />}
      {type === "edit" && isOpen && <EditUserSheet />}
      {type === "salary" && isOpen && <EditUserSalarySheet />}
      {type === "schedule" && isOpen && <EditUserScheduleSheet />}
    </>
  );
}
