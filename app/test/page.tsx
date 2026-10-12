import React from 'react';
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { FormHeading } from "@/components/resuable-components/form-heading";

async function  page() {
  const sessionCookie = await auth.api.getSession({
          headers: await headers()
      })
  return (
    <FormHeading title="Test" description="Test" icon="" />
  )
}

export default page