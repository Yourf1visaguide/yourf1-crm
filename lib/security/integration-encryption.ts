import "server-only";

//  node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"


import {
  createCipheriv,
  createDecipheriv,
  randomBytes,
} from "node:crypto";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 12;
const AUTH_TAG_LENGTH = 16;

function getEncryptionKey(): Buffer {
  const encodedKey = process.env.INTEGRATION_ENCRYPTION_KEY;

  if (!encodedKey) {
    throw new Error(
      "INTEGRATION_ENCRYPTION_KEY is not configured.",
    );
  }

  const key = Buffer.from(encodedKey, "base64");

  if (key.length !== 32) {
    throw new Error(
      "INTEGRATION_ENCRYPTION_KEY must decode to exactly 32 bytes.",
    );
  }

  return key;
}

export function encryptIntegrationCredentials(
  credentials: Record<string, string>,
): string {
  const key = getEncryptionKey();

  const iv = randomBytes(IV_LENGTH);

  const cipher = createCipheriv(
    ALGORITHM,
    key,
    iv,
  );

  const plaintext = JSON.stringify(credentials);

  const encrypted = Buffer.concat([
    cipher.update(plaintext, "utf8"),
    cipher.final(),
  ]);

  const authTag = cipher.getAuthTag();

  return [
    "v1",
    iv.toString("base64url"),
    authTag.toString("base64url"),
    encrypted.toString("base64url"),
  ].join(".");
}

export function decryptIntegrationCredentials(
  encryptedValue: string,
): Record<string, string> {
  const key = getEncryptionKey();

  const [version, encodedIv, encodedAuthTag, encodedData] =
    encryptedValue.split(".");

  if (
    version !== "v1" ||
    !encodedIv ||
    !encodedAuthTag ||
    !encodedData
  ) {
    throw new Error(
      "Invalid encrypted integration credential format.",
    );
  }

  const iv = Buffer.from(encodedIv, "base64url");
  const authTag = Buffer.from(encodedAuthTag, "base64url");
  const encrypted = Buffer.from(encodedData, "base64url");

  if (
    iv.length !== IV_LENGTH ||
    authTag.length !== AUTH_TAG_LENGTH ||
    encrypted.length === 0
  ) {
    throw new Error(
      "Invalid encrypted integration credential data.",
    );
  }

  const decipher = createDecipheriv(
    ALGORITHM,
    key,
    iv,
  );

  decipher.setAuthTag(authTag);

  const decrypted = Buffer.concat([
    decipher.update(encrypted),
    decipher.final(),
  ]);

  const parsed: unknown = JSON.parse(
    decrypted.toString("utf8"),
  );

  if (
    typeof parsed !== "object" ||
    parsed === null ||
    Array.isArray(parsed) ||
    !Object.values(parsed).every(
      (value) => typeof value === "string",
    )
  ) {
    throw new Error(
      "Invalid integration credential payload.",
    );
  }

  return parsed as Record<string, string>;
}