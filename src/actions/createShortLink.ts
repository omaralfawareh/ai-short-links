"use server";
import { redis } from "../utils/redis";
import checkAliasExistsInRedis from "@/utils/checkAliasExistsInRedis";

export async function createShortLink(
  prevState: { error: boolean; message: string | null },
  formData: FormData,
) {
  const tokenAlias = formData.get("cf-turnstile-response-alias") as string;
  const tokenCustom = formData.get("cf-turnstile-response-custom") as string;

  console.log("token", tokenAlias || tokenCustom);
  const alias = formData.get("alias") as string;
  const destinationUrl = formData.get("destinationUrl") as string;

  const secret = tokenCustom
    ? process.env.TURNSTILE_SECRET_KEY_CUSTOM!
    : process.env.TURNSTILE_SECRET_KEY_ALIAS!;
  const validation = await validateTurnstile(tokenAlias || tokenCustom, secret);

  // return { error: false, message: "Test", alias, destinationUrl };

  if (validation.success) {
    // Token is valid
    console.log("Valid submission from:", validation.hostname);
  } else {
    // Token is invalid
    console.log("Invalid token:", validation["error-codes"]);
    return { error: true, message: "Invalid verification" };
  }

  console.log("createShortLink called", alias, destinationUrl);

  // return { error: true, message: "Error Test", alias, destinationUrl };

  let exists = true;

  try {
    exists = await checkAliasExistsInRedis({ alias });
  } catch (error) {
    console.error("Failed to check if alias exists", error);
    return { error: true, message: "Failed to create short link" };
  }

  if (exists) {
    return { error: true, message: "Alias already exists" };
  }

  try {
    await redis.set(alias, destinationUrl);
  } catch (error) {
    console.error("Failed to create short link", error);
    return { error: true, message: "Failed to create short link" };
  }

  return {
    error: false,
    message: `https://gotolnk.net/${alias}`,
    destinationUrl,
    alias,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function validateTurnstile(
  token: string,
  secret: string,
): Promise<any> {
  const formData = new FormData();
  formData.append("secret", secret);
  formData.append("response", token);

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body: formData,
      },
    );

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Turnstile validation error:", error);
    return { success: false, "error-codes": ["internal-error"] };
  }
}
