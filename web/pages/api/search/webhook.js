import indexer from "sanity-algolia";
import { client } from "../../../lib/sanity/client";
import { ALGOLIA_QUERY_PROJECTION } from "../../../lib/sanity/algoliaQuery";
import { algoliaInstance } from "./index-all-sanity";

/**
 *  This function receives webhook POSTs from Sanity and updates, creates or
 *  deletes records in the corresponding Algolia indices.
 */
export default async function handler(req, res) {
  if (req.headers["content-type"] !== "application/json") {
    res.status(400);
    res.json({ message: "Bad request" });
    return;
  }

  // Configure this to match an existing Algolia index name
  const index = algoliaInstance.initIndex(process.env.ALGOLIA_INDEX);

  const sanityAlgolia = indexer(
    {
      // the name of the object parent here has to correspond to the Sanity _type's
      // we wish to index in search.
      balado: {
        index,
        projection: ALGOLIA_QUERY_PROJECTION,
      },
      archive: {
        index,
        projection: ALGOLIA_QUERY_PROJECTION,
      },
      numero: {
        index,
        projection: ALGOLIA_QUERY_PROJECTION,
      },
      nouvelles: {
        index,
        projection: ALGOLIA_QUERY_PROJECTION,
      },
    },
    (document) => document
  );

  // Finally connect the Sanity webhook payload to Algolia indices via the
  // configured serializers and optional visibility function. `webhookSync` will
  // inspect the webhook payload, make queries back to Sanity with the `sanity`
  // client and make sure the algolia indices are synced to match.
  return sanityAlgolia
    .webhookSync(client, req.body)
    .then(() => res.status(200).send("success!"));
}
