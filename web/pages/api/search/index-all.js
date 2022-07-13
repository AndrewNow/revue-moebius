import { client } from "../../../lib/sanity/client";
import algoliasearch from "algoliasearch";
import { algoliaQuery } from "../../../lib/sanity/algoliaQuery";

// https://www.youtube.com/watch?v=ZtLtHiE4JEY
export const algoliaInstance = algoliasearch(
  process.env.ALGOLIA_APPLICATION_ID,
  process.env.ALGOLIA_ADMIN_KEY
);

export default async function RequestHandler(req, res) {
  const index = algoliaInstance.initIndex(process.env.ALGOLIA_INDEX);
  let sanityData = await client.fetch(algoliaQuery);
  
  if (req.method === "POST") {
    try {
      console.time(`Saving ${sanityData.length} documents to index`);
      await index.saveObjects(sanityData);
      console.timeEnd(`Saving ${sanityData.length} documents to index`);

      res.status(200).json({ body: "success!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ body: error });
    }
  }
}
