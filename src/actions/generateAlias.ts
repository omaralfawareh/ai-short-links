"use server";

import { tool } from "ai";
import { generateText, stepCountIs } from "ai";
import { openai } from "@ai-sdk/openai";
import checkAliasExistsInRedis from "@/utils/checkAliasExistsInRedis";
import z from "zod";
import { validateTurnstile } from "./createShortLink";

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
  const token = formData.get("cf-turnstile-response-ai") as string;

  if (!theme) {
    return { error: true, message: "Please enter a theme" };
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
      model: openai("gpt-4.1-nano"),
      prompt: theme,
      system: `
            You are a creative and concise short link alias generator.
            Task:
            Given a user-provided theme, generate a short, memorable, and relevant alias suitable for use as a URL slug in the format shortLink/[alias].
            This will be used to create a short link for a website, pointing to a user entered destination URL.

            Rules:
            - Output ONLY the alias string, without quotes, punctuation, or extra text.
            - Use ONLY lowercase letters (a-z), and hyphens (-).
            - No spaces, underscores, or special characters.
            - Keep the alias concise, with a maximum length of 15 characters.
            - The alias should clearly relate to the user's theme.
            - Do not use the same output as the examples below.

            Examples:
            Input: "logitech"
            Output: "g-pro-wireless"
            Input: "league of legends"
            Output: "summoners-rift"

            After generating the Alias you should always check if the Alias already exists in the database by passing the alias to the tool called checkIfAliasExistsInRedis.
            Make sure not to generate aliases you previously generated.
        `,
      tools: { checkAliasExistsInRedisTool },
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
