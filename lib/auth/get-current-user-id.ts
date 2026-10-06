import "server-only";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function getCurrentUserId(): Promise<string | null> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session?.user?.id ?? null;
}



// session // : 
// createdAt // : // Mon Oct 05 2026 12:39:15 GMT+0530 (India Standard Time) {}
// expiresAt // : // Mon Oct 12 2026 12:39:15 GMT+0530 (India Standard Time) {}
// id // : // "HoXhi6ogk37OyLWfjaIniE17Dmj8Flob"
// ipAddress // :  // "0000:0000:0000:0000:0000:0000:0000:0000"
// token // :  // "FDtuNXbYdTsYl198dHYpxXcmPawmewep"
// updatedAt // :  // Mon Oct 05 2026 12:39:15 GMT+0530 (India Standard Time) {}
// userAgent // :  // "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36"
// userId // :  // "vmbAe8lHx4UFpJObtMETgVfcNEBOeHjU"

// Object // user // : 
// createdAt // : // Mon Oct 05 2026 12:39:06 GMT+0530 (India Standard Time) {}
// email // :  // "admin1@gmail.com"
// emailVerified // :  // false
// id // :  // "vmbAe8lHx4UFpJObtMETgVfcNEBOeHjU"
// image // :  // null
// name // :  // "Admin"
// updatedAt // :  // Mon Oct 05 2026 12:39:07 GMT+0530 (India Standard Time) {}
// username // :  // null
