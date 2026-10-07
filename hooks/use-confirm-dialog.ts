"use client";

import { useConfirmDialogStore } from "@/store/confirm-dialog-store";

export function useConfirmDialog() {
  const openConfirm = useConfirmDialogStore(
    (state) => state.openConfirm,
  );

  const closeConfirm = useConfirmDialogStore(
    (state) => state.closeConfirm,
  );

  return {
    openConfirm,
    closeConfirm,
  };
}


// exampe 
// "use client";

// import { useConfirmDialog } from "@/hooks/use-confirm-dialog";
// import { useDeactivateUsers } from "../api/use-deactivate-users";

// export function SomeEmployeeAction() {
//   const { openConfirm } =
//     useConfirmDialog();

//   const deactivateUsers =
//     useDeactivateUsers();

//   function handleDeactivate(employeeIds: string[]) {
//     openConfirm({
//       title: "Deactivate employees?",
//       description:
//         "These employees will lose access to the CRM. Their historical HR and payroll records will be preserved.",

//       confirmLabel: "Deactivate",
//       cancelLabel: "Cancel",

//       variant: "destructive",

//       onConfirm: async () => {
//         await deactivateUsers.mutateAsync(
//           employeeIds,
//         );
//       },
//     });
//   }

//   return (
//     <button
//       onClick={() =>
//         handleDeactivate(["employee-123"])
//       }
//     >
//       Deactivate
//     </button>
//   );
// }


// Another example: delete something
// Later:
// openConfirm({
//   title: "Delete this document?",
//   description:
//     "This action cannot be undone. The document will be permanently removed.",

//   confirmLabel: "Delete",
//   variant: "destructive",

//   onConfirm: async () => {
//     await deleteDocumentMutation.mutateAsync(
//       documentId,
//     );
//   },
// });


// Another example: approve payroll
// You can use exactly the same component for non-destructive actions:
// openConfirm({
//   title: "Approve payroll?",
//   description:
//     "This will mark the selected payroll as approved and allow it to proceed to payment.",

//   confirmLabel: "Approve",

//   variant: "default",

//   onConfirm: async () => {
//     await approvePayrollMutation.mutateAsync(
//       payrollId,
//     );
//   },
// });