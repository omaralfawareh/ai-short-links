import { getCloudflareContext } from "@opennextjs/cloudflare";

const checkAliasExistsInRedis = async ({ alias }: { alias: string }) => {
    const kv = getCloudflareContext().env.SHORT_LINKS_KV;

    console.log("Check redis tool called");
    const exists = await kv.get(alias);
    return exists !== null;
};

export default checkAliasExistsInRedis;