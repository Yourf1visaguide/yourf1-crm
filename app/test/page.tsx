import React from 'react';
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

async function  page() {
  const sessionCookie = await auth.api.getSession({
          headers: await headers()
      })
      console.log(sessionCookie);
  return (
    <div>page</div>
  )
}

export default page