import groq from "groq";

// Match the content to the slug that was clicked on
export const numeroQuery = groq`
  *[_type == "numero" && slug.current == $slug][0]{
    _id,  
    title, 
    number,
    "imageUrl": mainImage.asset->url,
    "lqip": mainImage.asset->metadata.lqip,
    "slug": slug.current,
    price,
    available,
    publishedAt,
    directedBy,
    isbn,
    pages,
    authors,
    codirectors,
    body,
    currency
  }
`;

// Query for the feature hero on the home page
export const numeroHomepageQuery = groq`
 *[_type == "numero"] | order(number desc) {
    _id,  
    title, 
    number,
    "slug": slug.current,
    "imageUrl": mainImage.asset->url,
    "lqip": mainImage.asset->metadata.lqip,
  }[0]
`;

// Query for all numeros
export const numeroListQuery = groq`
 *[_type == "numero"] | order(number desc) {
    _id,  
    title, 
    number,
    "imageUrl": mainImage.asset->url,
    "lqip": mainImage.asset->metadata.lqip,
    "slug": slug.current,
    price,
    available,
    publishedAt,
    directedBy,
    isbn,
    pages,
    authors,
    codirectors,
    body,
    currency
  }
`;

// Query for read more articles, showing results that are not equal to the current article
export const numeroReadMoreQuery = groq`
 *[_type == "numero" && !(slug.current == $slug)] | order(number desc) {
    _id,  
    title, 
    number,
    "imageUrl": mainImage.asset->url,
    "lqip": mainImage.asset->metadata.lqip,
    "slug": slug.current,
    price,
    available,
    publishedAt,
    directedBy,
    isbn,
    pages,
    authors,
    codirectors,
    body,
    currency
  }
`;
