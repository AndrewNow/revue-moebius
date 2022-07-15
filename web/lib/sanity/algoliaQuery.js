import groq from "groq";

// query everything
export const algoliaQuery = groq`
  *[_type in ["balado", "archive", "numero", "nouvelles", ]] {
    _type, 
    _rev,
    "objectID": _id,
    title, 
    description, 
    isbn,
    number,
    "imageUrl": mainImage.asset->url,
    "lqip": mainImage.asset->metadata.lqip,
    "slug": slug.current,
    directedBy,
    authors,
    codirectors,
    body,
  }
`;

export const ALGOLIA_QUERY_PROJECTION = `{
    _type, 
    _rev,
    "objectID": _id,
    title, 
    description, 
    isbn,
    number,
    "imageUrl": mainImage.asset->url,
    "lqip": mainImage.asset->metadata.lqip,
    "slug": slug.current,
    directedBy,
    authors,
    codirectors,
    body,
  }
`;
