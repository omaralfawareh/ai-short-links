"use server";

import { tool } from "ai";
import { generateText, stepCountIs } from "ai";
import { openai } from "@ai-sdk/openai";
import checkAliasExistsInRedis from "@/utils/checkAliasExistsInRedis";
import z from "zod";
import { validateTurnstile } from "./createShortLink";
import { isValidUrl } from "@/utils/isValidUrl";
import { systemPrompt } from "@/prompts/system";

const checkAliasExistsInRedisTool = tool({
  description:
    "Checks if the generated alias already exists in the redis database. The funciton will return true if it already exists and false if the alias does not exist.",
  inputSchema: z.object({
    alias: z.string().describe("The alias to check if exists in the database"),
  }),
  strict: true,
  execute: checkAliasExistsInRedis,
});

export async function generateAlias(
  prevState: { error: boolean; message: string | null },
  formData: FormData,
) {
  const theme = formData.get("theme") as string;
  const destinationUrl = formData.get("destinationUrl") as string;
  const token = formData.get("cf-turnstile-response-ai") as string;

  if (!theme) {
    return { error: true, message: "Please enter a theme" };
  }

  if (!isValidUrl(destinationUrl)) {
    return { error: true, message: "Please enter a valid destination URL" };
  }

  if (!token) {
    return { error: true, message: "Please verify you are not a robot" };
  }

  const validation = await validateTurnstile(
    token,
    process.env.TURNSTILE_SECRET_KEY_THEME!,
  );

  if (validation.success) {
    // Token is valid
    console.log("Valid submission from:", validation.hostname);
  } else {
    // Token is invalid
    console.log("Invalid token:", validation["error-codes"]);
    return { error: true, message: "Invalid verification" };
  }

  // return { error: false, message: "tes22t2", theme };

  let alias;
  try {
    const { text } = await generateText({
      model: openai("gpt-5-nano"),
      prompt: `User Prompt: ${theme}\nDestination URL: ${destinationUrl}`,
      system: systemPrompt,
      tools: {
        web_search: openai.tools.webSearch({
          externalWebAccess: true,
          searchContextSize: "medium",
        }),
        checkAliasExistsInRedisTool,
      },
      toolChoice: { type: "tool", toolName: "web_search" },
      stopWhen: stepCountIs(5),
    });
    alias = text;
  } catch (error) {
    console.error("Failed to generate alias from theme", { error, theme });
    return { error: true, message: "Failed to generate alias from theme" };
  }

  if (!alias) {
    console.error("Failed to generate alias from theme", { theme });
    return { error: true, message: "No alias generated from theme" };
  }

  return { error: false, message: alias, theme };
}
