import { client } from "../../../lib/sanity/client";
import algoliasearch from "algoliasearch";
import { algoliaQuery } from "../../../lib/sanity/algoliaQuery";

// https://www.youtube.com/watch?v=ZtLtHiE4JEY
export const algoliaInstance = algoliasearch(
  process.env.ALGOLIA_APPLICATION_ID,
  process.env.ALGOLIA_ADMIN_KEY
);

export default async function handler(req, res) {
  let sanityData = await client.fetch(algoliaQuery);
  const index = algoliaInstance.initIndex(process.env.ALGOLIA_INDEX);
  if (req.method === "GET") {
    try {
      console.time(`Saving ${sanityData.length} documents to index`);
      await index.saveObjects(sanityData);
      console.timeEnd(`Saving ${sanityData.length} documents to index`);

      return res.status(200).json({ body: "success!" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ body: error });
    }
  }
}
