// import { client } from "../../../lib/sanity/client";
// import algoliasearch from "algoliasearch";
// import { algoliaQuery } from "../../../lib/sanity/algoliaQuery";

// // https://www.youtube.com/watch?v=ZtLtHiE4JEY
// export const algoliaInstance = algoliasearch(
//   process.env.ALGOLIA_APPLICATION_ID,
//   process.env.ALGOLIA_ADMIN_KEY
// );

// export default async function RequestHandler() {
//   let sanityData = await client.fetch(algoliaQuery);

//   const index = algoliaInstance.initIndex(process.env.ALGOLIA_INDEX);

//   try {
//     console.time(`Saving ${sanityData.length} documents to index`);
//     await index.saveObjects(sanityData);
//     console.timeEnd(`Saving ${sanityData.length} documents to index`);
//     return {
//       status: 200,
//       body: "Success!",
//     };
//   } catch (error) {
//     console.error(error);
//     return {
//       status: 500,
//       body: error,
//     };
//   }
// }
