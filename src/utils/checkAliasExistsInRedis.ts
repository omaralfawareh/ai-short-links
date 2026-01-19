import redis from "@/redis";

const checkAliasExistsInRedis = async ({ alias }: { alias: string }) => {
    console.log("Check redis tool called");
    const exists = await redis.exists(alias);
    return exists === 1;
};

export default checkAliasExistsInRedis;