import { redis } from "./redis";

const checkAliasExistsInRedis = async ({ alias }: { alias: string }) => {
  console.log("Check redis tool called");

  const exists = await redis.get(alias);
  return exists !== null;
};

export default checkAliasExistsInRedis;
