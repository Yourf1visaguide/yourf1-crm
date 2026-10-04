import UserSheetProviders from "@/features/users/providers/user-sheet-providers";
import React from 'react';

function Userlayout({children}:{children:React.ReactNode}) {
  return (
    <div>
      {children}
      <UserSheetProviders />
    </div>
  )
}

export default Userlayout