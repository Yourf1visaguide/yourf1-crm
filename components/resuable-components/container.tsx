import React from 'react'

function Container({children}:{children:React.ReactNode}) {
  return (
    <div className="bg-card p-8 pt-6 mx-auto my-8 rounded-md shadow-sm ">
      {children}
    </div>
  )
}

export default Container