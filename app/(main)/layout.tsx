import React from 'react';
import { ThemeProvider } from "next-themes";

function layout({children}:{children:React.ReactNode}) {
  return (
    <div>
      <ThemeProvider 
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
           {children}
        </ThemeProvider>
    </div>
  )
}

export default layout