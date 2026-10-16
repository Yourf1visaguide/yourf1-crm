import React from 'react';
import UserSheetProviders from "@/features/users/providers/user-sheet-providers";

function Userlayout({children}:{children:React.ReactNode}) {
  return (
    <div>
      {children}
      <UserSheetProviders />
    </div>
  )
}

export default Userlayout