'use server'

import checkAliasExistsInRedis from "@/utils/checkAliasExistsInRedis";
import redis from "@/redis";

export async function createShortLink(prevState: { error: boolean, message: string | null }, formData: FormData) {
    const alias = formData.get("alias") as string;
    const destinationUrl = formData.get("destinationUrl") as string;

    console.log("createShortLink called", alias, destinationUrl);

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

    return { error: false, message: `https://gotolnk.net/${alias}`, destinationUrl };
}