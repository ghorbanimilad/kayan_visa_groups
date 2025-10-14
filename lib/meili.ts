
import { MeiliSearch } from "meilisearch";

export const meiliClient = new MeiliSearch({
  host: process.env.MEILI_HOST || "http://127.0.0.1:7700",
  apiKey: process.env.MEILI_API_KEY || "", // env
});

export const SEARCH_INDEX = "global_search"; // نام ایندکس
